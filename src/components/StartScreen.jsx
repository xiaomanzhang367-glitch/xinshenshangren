import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import PrologueScreen from './PrologueScreen';
import { hasSave, getSaveInfo, clearSave } from '../utils/saveLoad';
import './StartScreen.css';

const StartScreen = () => {
  const { startGame, setGameState, continueFromSave } = useGame();
  const [showPrologue, setShowPrologue] = useState(false);
  const savedInfo = hasSave() ? getSaveInfo() : null;

  const handlePrologueComplete = (godName) => {
    setGameState(prev => ({ ...prev, godName }));
    setShowPrologue(false);
    startGame();
  };

  const handleContinue = () => {
    if (continueFromSave) continueFromSave();
  };

  const handleNewGame = () => {
    if (savedInfo && !window.confirm('开始新游戏会清除当前存档，确定吗？')) return;
    clearSave();
    setShowPrologue(true);
  };

  if (showPrologue) {
    return <PrologueScreen onComplete={handlePrologueComplete} />;
  }

  return (
    <div className="start-screen">
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              background: ['#ff006e', '#00f5ff', '#ffee00', '#00ff88'][Math.floor(Math.random() * 4)],
              boxShadow: `0 0 10px ${['#ff006e', '#00f5ff', '#ffee00', '#00ff88'][Math.floor(Math.random() * 4)]}`
            }}
          />
        ))}
      </div>

      <div className="start-content">
        <div className="temple-icon animate-bounce">
          ⛩️
        </div>
        
        <h1 className="game-title neon-text">新神上任</h1>
        
        <p className="game-subtitle">
          欢迎来到你的神庙！<br/>
          从今天起，你就是这里的神明了
        </p>

        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon">🙏</span>
            <span className="feature-text">倾听信徒的愿望</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span className="feature-text">观察人间百态</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✨</span>
            <span className="feature-text">养成独特神格</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💬</span>
            <span className="feature-text">结交神仙同僚</span>
          </div>
        </div>

        {savedInfo && (
          <button className="btn btn-primary start-btn" onClick={handleContinue} style={{ background: 'linear-gradient(135deg, #4caf50, #2e7d32)', marginBottom: 8 }}>
            📁 继续上次冒险 · 「{savedInfo.godName}」 Day{savedInfo.day}
          </button>
        )}

        <button className={`btn ${savedInfo ? 'btn-outline' : 'btn-primary'} start-btn`} onClick={handleNewGame}>
          {savedInfo ? '🆕 重新开始' : '🎯 开始上任'}
        </button>

        <div className="game-hint">
          <p>体验7天的神明生活</p>
          <p>你的每个选择都会改变一切</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
