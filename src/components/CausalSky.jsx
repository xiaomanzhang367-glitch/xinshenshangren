import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import haptic from '../utils/haptic';
import './CausalSky.css';

// 7天剧情节点 - 不再用屏幕%坐标，用相对位置（力导向布局会重新分布）
const STORY_NODES = {
  liMing: [
    { day: 1, title: '四六级', desc: '李明的开端', importance: 1 },
    { day: 2, title: '论文答辩', desc: '勉强毕业还是优秀', importance: 1 },
    { day: 3, title: '求职岔路', desc: '互联网 / 体制 / 创业', importance: 2 },
    { day: 4, title: '入职冲击', desc: '加班 / 摄像头', importance: 1 },
    { day: 5, title: '暗恋开端', desc: '幸运数字看到了她', importance: 2 },
    { day: 6, title: '感情走向', desc: '告白 / 错过', importance: 2 },
    { day: 7, title: '终局', desc: '学霸 / 大厂 / 创业 / 体制 / 爱情', importance: 3 }
  ],
  wangWu: [
    { day: 1, title: '失业三月', desc: '王五的低谷', importance: 1 },
    { day: 2, title: '面馆萌芽', desc: '小狐狸出现', importance: 2 },
    { day: 3, title: '面馆开张', desc: '麻辣螺蛳粉面', importance: 1 },
    { day: 4, title: '资金周转', desc: '投资 / 贷款 / 摆地摊', importance: 2 },
    { day: 5, title: '老婆怀孕', desc: '生活突变', importance: 1 },
    { day: 6, title: '生意定调', desc: '抖音爆火 / 平淡', importance: 2 },
    { day: 7, title: '终局', desc: '老板 / 大厨 / 韭菜 / 团圆', importance: 3 }
  ],
  chenJuan: [
    { day: 1, title: '催婚地狱', desc: '陈娟的起点', importance: 1 },
    { day: 2, title: '相亲奇遇', desc: '可能遇见李明', importance: 2 },
    { day: 3, title: '外婆回信', desc: '玄学事件', importance: 2 },
    { day: 4, title: '工作压力', desc: 'PUA / 升职', importance: 1 },
    { day: 5, title: '妈病重了', desc: '关键抉择', importance: 3 },
    { day: 6, title: '自我抉择', desc: '辞职 / 升职 / 觉醒', importance: 2 },
    { day: 7, title: '终局', desc: '嫁人 / 觉醒 / 单身贵族', importance: 3 }
  ]
};

const CHAR_COLOR = {
  liMing: { r: 100, g: 200, b: 255 },
  wangWu: { r: 255, g: 130, b: 100 },
  chenJuan: { r: 255, g: 200, b: 100 }
};

const CHAR_NAME = { liMing: '李明', wangWu: '王五', chenJuan: '陈娟' };

const CausalSky = ({ onClose }) => {
  const { gameState } = useGame();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const triggeredMap = {};
  (gameState.processedWishes || []).forEach(w => {
    if (!triggeredMap[w.characterId]) triggeredMap[w.characterId] = 0;
    triggeredMap[w.characterId]++;
  });

  // 物理状态 - useRef 避免重渲染
  const physics = useRef(null);
  const transformRef = useRef({ scale: 1, panX: 0, panY: 0 });

  // 初始化节点物理状态（力导向起点）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const CX = W / 2, CY = H / 2;

    const nodes = [];
    const links = [];

    // 中心"神格"枢纽节点
    nodes.push({
      id: 'center',
      x: CX, y: CY, vx: 0, vy: 0,
      r: 8, color: { r: 255, g: 215, b: 100 },
      label: '神格中心', isLit: true, isHub: true,
      meta: { title: '神格中心', desc: '你即是因果之源' }
    });

    Object.entries(STORY_NODES).forEach(([charId, chapters], chIdx) => {
      const angle0 = chIdx * (Math.PI * 2 / 3);
      chapters.forEach((node, dayIdx) => {
        const ringR = 80 + dayIdx * 50;
        const angle = angle0 + (Math.random() - 0.5) * 0.4 + dayIdx * 0.15;
        const isLit = dayIdx < (triggeredMap[charId] || 0);
        const isCurrent = dayIdx === (triggeredMap[charId] || 0);
        nodes.push({
          id: `${charId}-${dayIdx}`,
          x: CX + Math.cos(angle) * ringR,
          y: CY + Math.sin(angle) * ringR,
          vx: 0, vy: 0,
          r: 4 + node.importance * 2,
          color: CHAR_COLOR[charId],
          label: `Day${node.day} ${CHAR_NAME[charId]}`,
          isLit, isCurrent, isHub: false,
          charId, dayIdx,
          meta: { ...node, charId, charName: CHAR_NAME[charId] }
        });
        // 连接：与前一天节点
        if (dayIdx === 0) {
          links.push({ a: 0, b: nodes.length - 1, isLit });
        } else {
          links.push({ a: nodes.length - 2, b: nodes.length - 1, isLit });
        }
      });
    });

    // 跨角色潜在连接（虚连）
    const charIds = Object.keys(STORY_NODES);
    for (let i = 0; i < charIds.length; i++) {
      for (let j = i + 1; j < charIds.length; j++) {
        const a = nodes.findIndex(n => n.charId === charIds[i] && n.dayIdx === 5);
        const b = nodes.findIndex(n => n.charId === charIds[j] && n.dayIdx === 5);
        if (a > 0 && b > 0) {
          links.push({ a, b, isLit: nodes[a].isLit && nodes[b].isLit, cross: true });
        }
      }
    }

    physics.current = { nodes, links, w: W, h: H, cx: CX, cy: CY };

    // 启动动画循环
    let raf;
    const tick = () => {
      const p = physics.current;
      if (!p) return;
      // 力导向更新
      for (let i = 0; i < p.nodes.length; i++) {
        const n = p.nodes[i];
        if (n.isHub) continue;
        // 弹簧到原始位置（避免漂走）
        const dx = p.cx - n.x;
        const dy = p.cy - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const targetDist = 80 + n.dayIdx * 50;
        const diff = dist - targetDist;
        n.vx += (dx / dist) * diff * 0.0008;
        n.vy += (dy / dist) * diff * 0.0008;
        // 节点之间斥力
        for (let j = 0; j < p.nodes.length; j++) {
          if (i === j) continue;
          const m = p.nodes[j];
          const ddx = n.x - m.x;
          const ddy = n.y - m.y;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
          if (dd < 50) {
            const force = (50 - dd) * 0.005;
            n.vx += (ddx / dd) * force;
            n.vy += (ddy / dd) * force;
          }
        }
        // 阻尼
        n.vx *= 0.92;
        n.vy *= 0.92;
        n.x += n.vx;
        n.y += n.vy;
      }
      drawScene();
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, [gameState.processedWishes]);

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const p = physics.current;
    if (!p) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 应用 pan/zoom
    const { scale: sc, panX, panY } = transformRef.current;
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(sc, sc);

    // 背景星尘
    const t = Date.now() / 1000;
    if (!p.stars) {
      p.stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2
      }));
    }
    p.stars.forEach(s => {
      const pulse = (Math.sin(t * 0.8 + s.phase) + 1) * 0.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.a * pulse})`;
      ctx.fill();
    });

    // 连线（呼吸）
    p.links.forEach((link) => {
      const a = p.nodes[link.a];
      const b = p.nodes[link.b];
      if (!a || !b) return;
      const breath = (Math.sin(t * 2) + 1) * 0.5;

      if (link.isLit) {
        // 高亮连线 + 流光
        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        const ca = a.color, cb = b.color;
        gradient.addColorStop(0, `rgba(${ca.r}, ${ca.g}, ${ca.b}, ${0.4 + breath * 0.3})`);
        gradient.addColorStop(1, `rgba(${cb.r}, ${cb.g}, ${cb.b}, ${0.4 + breath * 0.3})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        // 流动小粒子
        const flow = (t * 0.5) % 1;
        const px = a.x + (b.x - a.x) * flow;
        const py = a.y + (b.y - a.y) * flow;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 200, 0.9)`;
        ctx.fill();
      } else {
        // 未点亮 - 虚线 + 极淡
        ctx.strokeStyle = link.cross ? 'rgba(255, 215, 100, 0.08)' : 'rgba(180, 180, 220, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // 节点（呼吸+光晕）
    p.nodes.forEach((n) => {
      const breath = (Math.sin(t * 1.5 + n.x * 0.01) + 1) * 0.5;
      const c = n.color;
      if (n.isLit || n.isHub) {
        // 外光晕
        const gloR = n.r * 3 + breath * 4;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gloR);
        grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${0.7 + breath * 0.3})`);
        grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, gloR, 0, Math.PI * 2);
        ctx.fill();
        // 核心
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + breath * 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.fill();
      } else if (n.isCurrent) {
        // 当前 - 闪烁
        const pulse = (Math.sin(t * 4) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${0.5 + pulse * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.6)`;
        ctx.fill();
      } else {
        // 未点亮 - 暗淡
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 150, 180, ${0.3 + breath * 0.1})`;
        ctx.fill();
      }
    });

    ctx.restore();
  };

  // 适配 retina
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      if (physics.current) {
        physics.current.w = w;
        physics.current.h = h;
        physics.current.cx = w / 2;
        physics.current.cy = h / 2;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // 触摸 / 鼠标交互：拖动 + 双指缩放
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dragging = false;
    let startX = 0, startY = 0;
    let startPanX = 0, startPanY = 0;
    let pinchStartDist = 0;
    let pinchStartScale = 1;

    const getPos = (e) => {
      if (e.touches && e.touches[0]) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    };

    const distance = (t1, t2) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onDown = (e) => {
      if (e.touches && e.touches.length === 2) {
        pinchStartDist = distance(e.touches[0], e.touches[1]);
        pinchStartScale = transformRef.current.scale;
        dragging = false;
        return;
      }
      dragging = true;
      const p = getPos(e);
      startX = p.x;
      startY = p.y;
      startPanX = transformRef.current.panX;
      startPanY = transformRef.current.panY;
    };

    const onMove = (e) => {
      if (e.touches && e.touches.length === 2) {
        e.preventDefault();
        const d = distance(e.touches[0], e.touches[1]);
        const newScale = Math.max(0.5, Math.min(3, pinchStartScale * (d / pinchStartDist)));
        transformRef.current.scale = newScale;
        setScale(newScale);
        return;
      }
      if (!dragging) return;
      e.preventDefault();
      const p = getPos(e);
      transformRef.current.panX = startPanX + (p.x - startX);
      transformRef.current.panY = startPanY + (p.y - startY);
      setPan({ x: transformRef.current.panX, y: transformRef.current.panY });
    };

    const onUp = (e) => {
      dragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.5, Math.min(3, transformRef.current.scale * delta));
      transformRef.current.scale = newScale;
      setScale(newScale);
    };

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // 单击节点
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const { scale: sc, panX, panY } = transformRef.current;
      const wx = (cx - panX) / sc;
      const wy = (cy - panY) / sc;
      const p = physics.current;
      if (!p) return;
      for (const n of p.nodes) {
        const dx = wx - n.x;
        const dy = wy - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.r + 8) {
          haptic.light();
          setSelectedNode(n.meta);
          return;
        }
      }
    };
    canvas.addEventListener('click', onClick);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onUp);
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  const totalNodes = Object.values(STORY_NODES).flat().length;
  const litNodes = Object.values(triggeredMap).reduce((s, n) => s + n, 0);

  return (
    <div className="causal-sky-overlay" ref={containerRef}>
      <canvas ref={canvasRef} className="sky-canvas" />

      <div className="sky-header">
        <button className="sky-close" onClick={onClose}>← 返回</button>
        <div className="sky-title">⛩️ 因果星轨</div>
        <div className="sky-progress">{litNodes} / {totalNodes} 星辰</div>
      </div>

      <div className="sky-instructions">
        <span>👆 单指拖动 · 双指缩放 · 点击星辰</span>
      </div>

      <div className="sky-legend">
        <span style={{ color: '#88c4ff' }}>● 李明</span>
        <span style={{ color: '#ff9988' }}>● 王五</span>
        <span style={{ color: '#ffcc88' }}>● 陈娟</span>
        <span style={{ color: '#ffd700' }}>● 神格中心</span>
      </div>

      {selectedNode && (
        <div className="sky-modal" onClick={() => setSelectedNode(null)}>
          <div className="sky-modal-card" onClick={e => e.stopPropagation()}>
            <div className="sky-modal-badge">
              {selectedNode.charName ? `${selectedNode.charName} · Day ${selectedNode.day}` : selectedNode.title}
            </div>
            <h3>{selectedNode.title}</h3>
            <p>{selectedNode.desc}</p>
            <button onClick={() => setSelectedNode(null)} className="sky-modal-close">关闭</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CausalSky;
