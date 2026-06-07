import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import haptic from '../utils/haptic';
import './CausalSky.css';

// 剧情节点定义 - 7 天 × 3 角色
const STORY_NODES = {
  liMing: [
    { day: 1, x: 15, y: 50, title: '四六级考试', desc: '李明第三次考四六级' },
    { day: 2, x: 28, y: 35, title: '论文答辩', desc: '差点延毕的瞬间' },
    { day: 3, x: 42, y: 55, title: '互联网面试', desc: '人生第一份工作' },
    { day: 4, x: 55, y: 40, title: '入职第一天', desc: '老板要求开摄像头' },
    { day: 5, x: 68, y: 30, title: '相亲风波', desc: '妈安排相亲的对象' },
    { day: 6, x: 80, y: 50, title: '感情走向', desc: '开始了一段感情' },
    { day: 7, x: 92, y: 40, title: '人生定调', desc: '李明的终局' }
  ],
  wangWu: [
    { day: 1, x: 15, y: 70, title: '失业三月', desc: '王五第一次面试机会' },
    { day: 2, x: 30, y: 80, title: '不被裁员', desc: '公司裁员潮' },
    { day: 3, x: 45, y: 70, title: '面馆开张', desc: '凑钱开了家小面馆' },
    { day: 4, x: 58, y: 85, title: '资金周转', desc: '面馆进货资金不够' },
    { day: 5, x: 72, y: 75, title: '老婆怀孕', desc: '突如其来的喜事' },
    { day: 6, x: 82, y: 70, title: '生意爆火', desc: '抖音网红打卡' },
    { day: 7, x: 92, y: 75, title: '老板归宿', desc: '王五的终局' }
  ],
  chenJuan: [
    { day: 1, x: 15, y: 25, title: '别催婚啊', desc: '妈又安排了三个相亲' },
    { day: 2, x: 28, y: 15, title: '相亲尴尬', desc: '希望今天的相亲不奇葩' },
    { day: 3, x: 42, y: 25, title: '处对象', desc: '和男友处得怎么样' },
    { day: 4, x: 55, y: 10, title: '工作压力', desc: '老板天天 PUA' },
    { day: 5, x: 68, y: 20, title: '妈病重了', desc: '突发紧急情况' },
    { day: 6, x: 82, y: 15, title: '人生抉择', desc: '辞职 or 升职' },
    { day: 7, x: 92, y: 25, title: '自我觉醒', desc: '陈娟的终局' }
  ]
};

const CausalSky = ({ onClose }) => {
  const { gameState } = useGame();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // 把已处理愿望按角色+天数索引
  const triggeredMap = {};
  (gameState.processedWishes || []).forEach((w, i) => {
    if (!triggeredMap[w.characterId]) triggeredMap[w.characterId] = [];
    triggeredMap[w.characterId].push(i);
  });

  // 粒子背景动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.5 + 0.3
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      // 粒子
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.a})`;
        ctx.fill();
      });
      // 互相连线（近距离）
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - dist / 80) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderConstellation = (charId, color, name, avatar) => {
    const nodes = STORY_NODES[charId];
    const triggered = triggeredMap[charId] || [];

    return (
      <g key={charId}>
        {/* 连接线 */}
        {nodes.slice(0, -1).map((n, i) => {
          const nextN = nodes[i + 1];
          const isLit = i < triggered.length;
          return (
            <line
              key={`line-${i}`}
              x1={`${n.x}%`} y1={`${n.y}%`}
              x2={`${nextN.x}%`} y2={`${nextN.y}%`}
              stroke={isLit ? color : 'rgba(255,255,255,0.15)'}
              strokeWidth={isLit ? 2 : 1}
              strokeDasharray={isLit ? '0' : '4 4'}
              style={{ filter: isLit ? `drop-shadow(0 0 4px ${color})` : 'none' }}
            />
          );
        })}
        {/* 标签 */}
        <text x="1%" y={`${nodes[0].y}%`} fill={color} fontSize="12" fontWeight="700">
          {avatar} {name}
        </text>
      </g>
    );
  };

  const renderNode = (charId, color) => {
    const nodes = STORY_NODES[charId];
    const triggered = triggeredMap[charId] || [];

    return nodes.map((n, i) => {
      const isLit = i < triggered.length;
      const isCurrent = i === triggered.length;
      return (
        <button
          key={`${charId}-${i}`}
          className={`sky-node ${isLit ? 'lit' : isCurrent ? 'current' : 'locked'}`}
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            color: isLit ? color : '#ccc',
            borderColor: isLit ? color : 'rgba(255,255,255,0.3)',
            boxShadow: isLit ? `0 0 12px ${color}, 0 0 24px ${color}80` : 'none'
          }}
          onClick={() => {
            haptic.light();
            setSelectedNode({ ...n, charId, name: charId === 'liMing' ? '李明' : charId === 'wangWu' ? '王五' : '陈娟', isLit, color });
          }}
        >
          {isLit ? '★' : isCurrent ? '●' : '○'}
        </button>
      );
    });
  };

  const totalNodes = Object.values(STORY_NODES).flat().length;
  const litNodes = Object.values(triggeredMap).reduce((s, a) => s + a.length, 0);

  return (
    <div className="causal-sky-overlay" ref={containerRef}>
      <canvas ref={canvasRef} className="sky-canvas" />

      <div className="sky-header">
        <button className="sky-close" onClick={onClose}>← 返回</button>
        <div className="sky-title">⛩️ 因果天网</div>
        <div className="sky-progress">已点亮 {litNodes} / {totalNodes}</div>
      </div>

      <svg className="sky-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {renderConstellation('liMing', '#88c4ff', '李明', '👨‍🎓')}
        {renderConstellation('wangWu', '#ff9988', '王五', '👨‍🍳')}
        {renderConstellation('chenJuan', '#ffcc88', '陈娟', '👩‍💼')}
      </svg>

      <div className="sky-nodes-layer">
        {renderNode('liMing', '#88c4ff')}
        {renderNode('wangWu', '#ff9988')}
        {renderNode('chenJuan', '#ffcc88')}
      </div>

      {selectedNode && (
        <div className="sky-modal" onClick={() => setSelectedNode(null)}>
          <div className="sky-modal-card" onClick={e => e.stopPropagation()} style={{ borderColor: selectedNode.color }}>
            <div className="sky-modal-badge" style={{ background: selectedNode.color }}>
              Day {selectedNode.day} · {selectedNode.name}
            </div>
            <h3>{selectedNode.title}</h3>
            <p>{selectedNode.desc}</p>
            {selectedNode.isLit ? (
              <div className="sky-modal-status lit">✨ 你点亮了这颗星</div>
            ) : (
              <div className="sky-modal-status locked">🔒 未触发 · 继续帮助 {selectedNode.name} 来解锁</div>
            )}
            <button onClick={() => setSelectedNode(null)} className="sky-modal-close">关闭</button>
          </div>
        </div>
      )}

      <div className="sky-legend">
        ★ 已点亮 · ● 当前 · ○ 未触发 — 继续游戏可点亮更多星辰
      </div>
    </div>
  );
};

export default CausalSky;
