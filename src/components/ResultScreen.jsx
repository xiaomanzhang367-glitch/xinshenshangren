import React from 'react';
import { useGame } from '../context/GameContext';
import './ResultScreen.css';

const ResultScreen = () => {
  const { gameState, nextDay, setGameState } = useGame();
  const result = gameState.wishResult;

  const getResultEmoji = () => {
    if (!result) return '✨';
    if (result.success && result.gameScore >= 50) return '🎉';
    if (result.success) return '😊';
    return '';
  };

  const getResultTitle = () => {
    if (!result) return '处理完成';
    if (result.success && result.gameScore >= 50) return '完美实现！';
    if (result.success) return '还算顺利～';
    return '有点遗憾...';
  };

  const getResultDesc = () => {
    if (!result) return '';
    if (result.success && result.gameScore >= 50) {
      return '小游戏表现很棒！信徒非常高兴！';
    }
    if (result.success) {
      return '小游戏还不错，信徒挺满意的～';
    }
    return '小游戏表现不太好，信徒有点失望...';
  };

  const handleContinue = () => {
    setGameState(prev => ({
      ...prev,
      phase: 'wish',
      wishResult: null
    }));
  };

  const handleNextDay = () => {
    nextDay();
  };

  const hasMoreWishes = gameState.wishes.length > 0;

  return (
    <div className="result-screen">
      <div className="result-card card animate-slide-in">
        <div className="result-emoji">{getResultEmoji()}</div>
        <h2 className="result-title">{getResultTitle()}</h2>
        <p className="result-desc">{getResultDesc()}</p>

        {result && (
          <div className="game-score-display">
            <span className="score-label">小游戏得分</span>
            <span className="score-value">{result.gameScore || 0}分</span>
          </div>
        )}

        <div className="current-resources">
          <div className="resource-display">
            <span className="res-label">当前香火</span>
            <span className="res-value">🔥 {gameState.incense}</span>
          </div>
          <div className="resource-display">
            <span className="res-label">当前神力</span>
            <span className="res-value">⚡ {gameState.power}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        {hasMoreWishes ? (
          <button className="btn btn-secondary" onClick={handleContinue}>
            继续处理愿望
          </button>
        ) : null}
        <button className="btn btn-primary" onClick={handleNextDay}>
          {hasMoreWishes ? '明天继续' : `进入第${gameState.day + 1}天`} →
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
