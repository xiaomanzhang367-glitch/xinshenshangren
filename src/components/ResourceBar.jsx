import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import './ResourceBar.css';

const ResourceBar = ({ onOpenMessages }) => {
  const { gameState, setGameState } = useGame();
  const [showExchange, setShowExchange] = useState(false);

  const exchangeOptions = [
    { incense: 10, power: 8, label: '基础兑换' },
    { incense: 30, power: 30, label: '优惠兑换', bonus: '+2' },
    { incense: 50, power: 60, label: '大额兑换', bonus: '+10' }
  ];

  const handleExchange = (option) => {
    if (gameState.incense >= option.incense) {
      setGameState(prev => ({
        ...prev,
        incense: prev.incense - option.incense,
        power: Math.min(prev.maxPower, prev.power + option.power)
      }));
      setShowExchange(false);
    } else {
      alert(`香火不足！需要${option.incense}香火`);
    }
  };

  return (
    <div className="resource-bar">
      <div className="resources">
        <div className="resource-item incense">
          <span className="resource-icon">🔥</span>
          <span className="resource-value">{gameState.incense}</span>
          <span className="resource-name">香火</span>
        </div>

        <div className="resource-item power">
          <span className="resource-icon">⚡</span>
          <span className="resource-value">{gameState.power}</span>
          <span className="resource-name">神力</span>
          <button
            className="exchange-plus-btn"
            onClick={() => setShowExchange(true)}
            title="用香火兑换神力"
          >
            ＋
          </button>
        </div>

        <button
          className="message-notify-btn"
          onClick={onOpenMessages}
        >
          💬
          {gameState.unreadCount > 0 && (
            <span className="message-badge">{gameState.unreadCount}</span>
          )}
        </button>
      </div>

      {showExchange && (
        <div className="exchange-modal-overlay" onClick={() => setShowExchange(false)}>
          <div className="exchange-modal animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="exchange-header">
              <span>🔥 香火兑换神力</span>
              <button className="close-exchange" onClick={() => setShowExchange(false)}>×</button>
            </div>

            <div className="exchange-current">
              <div>当前 🔥 <b>{gameState.incense}</b></div>
              <div>当前 ⚡ <b>{gameState.power}</b> / {gameState.maxPower}</div>
            </div>

            <div className="exchange-options">
              {exchangeOptions.map((opt, idx) => (
                <button
                  key={idx}
                  className={`exchange-option ${gameState.incense >= opt.incense ? '' : 'disabled'}`}
                  onClick={() => handleExchange(opt)}
                  disabled={gameState.incense < opt.incense}
                >
                  <div className="option-main">
                    <span className="option-cost">{opt.incense}🔥 → {opt.power}⚡</span>
                    {opt.bonus && <span className="option-bonus">{opt.bonus}</span>}
                  </div>
                  <div className="option-label">{opt.label}</div>
                </button>
              ))}
            </div>
            <div className="exchange-tip">
              💡 香火不够就处理愿望，神力不够就来这里兑换
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceBar;
