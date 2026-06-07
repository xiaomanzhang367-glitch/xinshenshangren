import React, { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { calcDivineRank, getDivineEnvoy } from '../utils/divineRanks';
import haptic from '../utils/haptic';
import './FinaleScreen.css';

// 判定凡人结局
const judgeCharacterFinale = (char, helpCount) => {
  if (helpCount === 0) return { emoji: '🥲', text: '从未被你眷顾，朋友圈再无更新' };
  if (char.happiness >= 80) return { emoji: '🎉', text: '人生迎来高光时刻，已成为你的铁杆信徒' };
  if (char.happiness >= 50) return { emoji: '😊', text: '日子有了起色，每月都来上香' };
  if (char.happiness >= 30) return { emoji: '😐', text: '平淡度日，偶尔抱怨几句' };
  return { emoji: '😞', text: '生活更糟了，发誓再也不信神' };
};

const CHAR_FATE_LIMING = {
  high: ['🎓 保研留校，朋友圈晒论文集', '💑 和陈娟领证（如有姻缘）', '💼 进了大厂当上 Tech Lead'],
  mid: ['💼 进了普通公司，每天发"今日打工"日记', '🏠 考公上岸，朋友圈最后一条："感谢神明"'],
  low: ['😭 二战考研失败，回老家当辅导班老师', '🤡 创业失败，做了 KOL 卖课']
};
const CHAR_FATE_WANGWU = {
  high: ['🍜 开了第二家分店，发圈感谢神明', '💼 被资本看中，成了餐饮品牌'],
  mid: ['🏪 稳定小老板，照顾家庭', '🥢 转行开小餐车，自由自在'],
  low: ['💔 净身出户，跑回老家', '💸 给资本打工，朋友圈骂街']
};
const CHAR_FATE_CHENJUAN = {
  high: ['💑 嫁给了真心人，妈妈终于安心', '🌟 升职做了总监，财务自由'],
  mid: ['🌸 单身贵族，和闺蜜开公司', '🏡 平凡而幸福的小日子'],
  low: ['😭 和妈大吵一架，搬出独居', '🥲 三十岁还在相亲，心累']
};

const pickFate = (pool, score) => {
  const tier = score >= 60 ? 'high' : score >= 30 ? 'mid' : 'low';
  const arr = pool[tier];
  return arr[Math.floor(Math.random() * arr.length)];
};

const FinaleScreen = () => {
  const { gameState, setGameState } = useGame();
  const [showShare, setShowShare] = useState(false);
  const posterRef = useRef(null);

  const rank = calcDivineRank(gameState.divineAttributes);
  const envoy = getDivineEnvoy(gameState.totalScore || 0);

  const helpCounts = {};
  (gameState.processedWishes || []).forEach(w => {
    helpCounts[w.characterId] = (helpCounts[w.characterId] || 0) + 1;
  });

  const liMingHappiness = gameState.characters.liMing.happiness;
  const wangWuHappiness = gameState.characters.wangWu.happiness;
  const chenJuanHappiness = gameState.characters.chenJuan.happiness;

  const liMingFate = pickFate(CHAR_FATE_LIMING, liMingHappiness);
  const wangWuFate = pickFate(CHAR_FATE_WANGWU, wangWuHappiness);
  const chenJuanFate = pickFate(CHAR_FATE_CHENJUAN, chenJuanHappiness);

  const unlockedGods = Object.values(gameState.gods).filter(g => g.unlocked);
  const hiddenGodsUnlocked = unlockedGods.filter(g => ['tianhou', 'guanqing'].includes(g.id));

  const trickyCount = (gameState.processedWishes || []).filter(w => w.tricky).length;
  const totalIncenseEarned = (gameState.processedWishes || []).length * 18;

  const godName = gameState.godName || '小神';

  const handleShare = async () => {
    haptic.medium();
    setShowShare(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(posterRef.current, { backgroundColor: null, scale: 2, useCORS: true });
      const dataUrl = canvas.toDataURL('image/png');
      // 尝试 share API，否则下载
      if (navigator.share && navigator.canShare) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `神仙简历-${godName}.png`, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: `${godName}的神仙简历`, text: `我是 ${rank.name}，你也来当神仙吧` });
          return;
        }
      }
      // 下载
      const link = document.createElement('a');
      link.download = `神仙简历-${godName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      alert('生成海报失败，请截屏分享：' + e.message);
    }
  };

  const handleRestart = () => {
    haptic.medium();
    if (window.confirm('确定要重新开始吗？这次的进度将清空。')) {
      window.location.reload();
    }
  };

  return (
    <div className="finale-screen">
      <div className="finale-header">
        <div className="finale-title">⛩️ 试用期 7 天完成 ⛩️</div>
        <div className="finale-subtitle">这是你的「神仙简历」</div>
      </div>

      <div className="poster-wrapper">
        <div className="poster" ref={posterRef} style={{ background: rank.bgGradient }}>
          {/* 顶部 */}
          <div className="poster-top">
            <div className="poster-deco">⛩️</div>
            <div className="poster-brand">— 神 仙 简 历 —</div>
            <div className="poster-godname">「{godName}」</div>
            <div className="poster-rank">
              <div className="rank-emoji">{rank.emoji}</div>
              <div className="rank-name">{rank.name}</div>
              <div className="rank-tagline">"{rank.tagline}"</div>
              <div className="rank-rarity">{rank.rarity}神位</div>
            </div>
          </div>

          {/* 神格四维 */}
          <div className="poster-section">
            <div className="poster-section-title">─── 神 格 四 维 ───</div>
            {[
              { key: 'order', name: '秩序', opposite: '混沌' },
              { key: 'mercy', name: '慈悲', opposite: '功利' },
              { key: 'involvement', name: '介入', opposite: '佛系' },
              { key: 'rational', name: '理性', opposite: '感性' }
            ].map(a => {
              const v = gameState.divineAttributes[a.key];
              return (
                <div key={a.key} className="attr-row">
                  <span className="attr-name">{a.opposite}</span>
                  <div className="attr-bar"><div className="attr-fill" style={{ width: `${v}%` }} /></div>
                  <span className="attr-name">{a.name}</span>
                  <span className="attr-val">{v}</span>
                </div>
              );
            })}
          </div>

          {/* 凡人结局 */}
          <div className="poster-section">
            <div className="poster-section-title">─── 凡 人 结 局 ───</div>
            <div className="fate-row">👨‍🎓 李明 → {liMingFate}</div>
            <div className="fate-row">👨‍🍳 王五 → {wangWuFate}</div>
            <div className="fate-row">👩‍💼 陈娟 → {chenJuanFate}</div>
          </div>

          {/* 数据 */}
          <div className="poster-section">
            <div className="poster-section-title">─── 神 迹 一 览 ───</div>
            <div className="data-grid">
              <div>📊 处理愿望 <b>{(gameState.processedWishes || []).length}</b></div>
              <div>🔥 累计香火 <b>{gameState.incense + totalIncenseEarned}</b></div>
              <div>✨ 累计功德 <b>{gameState.totalScore || 0}</b></div>
              <div>🦋 触发涟漪 <b>{(gameState.moments || []).filter(m => m.isChain).length}</b></div>
              <div>🎲 神鬼一阵 <b>{trickyCount} 次</b></div>
              <div>🧧 收到红包 <b>{(gameState.godMessages || []).filter(m => m.isRedPacket).length}</b></div>
            </div>
            {hiddenGodsUnlocked.length > 0 && (
              <div className="hidden-unlock">
                ✨ 解锁神仙：{hiddenGodsUnlocked.map(g => `${g.avatar}${g.name}`).join('、')}
              </div>
            )}
          </div>

          {/* 神仙寄语 */}
          <div className="poster-envoy">
            <div className="poster-section-title">─── 神 仙 寄 语 ───</div>
            <div className="envoy-quote">"{rank.advice}"</div>
            <div className="envoy-author">—— 万神殿人事处</div>
          </div>

          {/* 底部 */}
          <div className="poster-bottom">
            <div className="poster-stamp">
              <div className="stamp-text">神号<br/>{godName}</div>
            </div>
            <div className="poster-qr">
              <img src="/海报素材/二维码-黑白.png" alt="qr" style={{ width: 80, height: 80 }} />
              <div className="qr-text">扫码也当神仙</div>
            </div>
          </div>
          <div className="poster-footer">⛩️ 新神上任 · xinshenshangren</div>
        </div>
      </div>

      <div className="finale-actions">
        <button className="finale-btn primary" onClick={handleShare}>
          📤 分享海报
        </button>
        <button className="finale-btn" onClick={handleRestart}>
          🔄 再玩一次（解锁新结局）
        </button>
      </div>

      <div className="finale-hint">
        💡 总共有 16 种神位，你已解锁: <b>{rank.name}</b><br/>
        换个玩法（多管/佛系/理性/感性）可以刷出新结局！
      </div>
    </div>
  );
};

export default FinaleScreen;
