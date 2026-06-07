// 视觉特效组件
import React, { useEffect, useState } from 'react';
import './VFX.css';

// PERFECT 粒子爆炸 + 大字飘字
export const PerfectBurst = ({ text = '✨ PERFECT ✨', onDone, color = '#ffd700' }) => {
  const [phase, setPhase] = useState('show');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fade'), 800);
    const t2 = setTimeout(() => onDone && onDone(), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`perfect-burst ${phase}`}>
      <div className="perfect-flash" />
      <div className="perfect-text" style={{ color, textShadow: `0 0 30px ${color}, 0 0 60px ${color}` }}>
        {text}
      </div>
      {/* 粒子 */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="perfect-particle"
          style={{
            '--angle': `${i * 18}deg`,
            '--dist': `${100 + Math.random() * 100}px`,
            '--delay': `${Math.random() * 0.2}s`,
            background: i % 3 === 0 ? color : i % 3 === 1 ? '#fff' : '#ff7800'
          }}
        />
      ))}
    </div>
  );
};

// 飘字 +N 香火/神力
export const FloatingNumber = ({ value, color = '#4caf50', icon = '🔥', x = 50, y = 50, onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="floating-number"
      style={{ left: `${x}%`, top: `${y}%`, color }}
    >
      {value > 0 ? '+' : ''}{value} {icon}
    </div>
  );
};

// 烟花
export const Fireworks = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fireworks-overlay">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="firework"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${20 + Math.random() * 50}%`,
            animationDelay: `${i * 0.3}s`,
            background: ['#ffd700', '#ff7800', '#ff4099', '#88f0ff'][i % 4]
          }}
        />
      ))}
    </div>
  );
};

// 全屏神仙解锁过场
export const GodUnlockCutscene = ({ god, onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 4500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="god-unlock-overlay">
      <div className="unlock-flash" />
      <div className="unlock-rays" />
      <div className="unlock-content">
        <div className="unlock-prefix">— 新神驾到 —</div>
        <div className="unlock-avatar">{god.avatar}</div>
        <div className="unlock-name">{god.name}</div>
        <div className="unlock-personality">{god.personality}</div>
        <div className="unlock-hint">已加入神仙列表</div>
      </div>
    </div>
  );
};

// 背景祥云
export const FloatingClouds = () => {
  return (
    <div className="floating-clouds">
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`cloud cloud-${i}`}>☁</div>
      ))}
    </div>
  );
};
