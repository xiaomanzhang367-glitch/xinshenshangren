import React from 'react';
import { useGame } from '../context/GameContext';
import './EndScreen.css';

const EndScreen = () => {
  const { gameState, setGameState } = useGame();

  const handleRestart = () => {
    window.location.reload();
  };

  const getFinalEvaluation = () => {
    const avgMercy = gameState.divineAttributes.mercyUtilitarian;
    if (avgMercy >= 80) return { emoji: '👼', title: '慈悲为怀', desc: '你是一个充满爱心的神明！' };
    if (avgMercy >= 60) return { emoji: '😇', title: '热心肠', desc: '信徒们都很喜欢你～' };
    if (avgMercy >= 40) return { emoji: '🤔', title: '随心随性', desc: '你有自己的行事风格' };
    if (avgMercy >= 20) return { emoji: '😎', title: '酷酷的神', desc: '不是所有愿望都需要实现' };
    return { emoji: '🤐', title: '神秘主义', desc: '你总是让人猜不透...' };
  };

  const evaluation = getFinalEvaluation();

  return (
    <div className="end-screen">
      <div className="fireworks">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="firework"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="end-content card animate-slide-in">
        <div className="end-badge">
          <span className="badge-emoji">🎊</span>
          <span className="badge-text">7天任期结束！</span>
        </div>

        <h1 className="end-title">恭喜！</h1>
        <p className="end-subtitle">你已经体验了7天的神明生活</p>

        <div className="final-evaluation">
          <div className="eval-emoji">{evaluation.emoji}</div>
          <div className="eval-title">{evaluation.title}</div>
          <div className="eval-desc">{evaluation.desc}</div>
        </div>

        <div className="final-stats">
          <div className="stat-row">
            <span className="stat-label">最终神格</span>
            <span className="stat-value-gold">{gameState.divineTitle}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">最终香火</span>
            <span className="stat-value">🔥 {gameState.incense}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">朋友圈动态</span>
            <span className="stat-value">📱 {gameState.moments.length}条</span>
          </div>
        </div>

        <div className="storyline-summary">
          <h3>📖 故事线完成度</h3>
          <div className="storyline-grid">
            {Object.entries(gameState.storylines).map(([key, line]) => (
              <div key={key} className={`storyline-badge ${line.triggered ? 'unlocked' : ''}`}>
                {line.triggered ? '✅' : '❓'}
                <span>{line.triggered ? line.name : '???'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="end-cta">
          <button className="btn btn-primary" onClick={handleRestart}>
            🔄 再来一局
          </button>
          <p className="end-hint">每一局都会有不同的故事哦～</p>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
