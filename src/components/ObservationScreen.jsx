import React from 'react';
import { useGame } from '../context/GameContext';
import './ObservationScreen.css';

const ObservationScreen = ({ standalone = false }) => {
  const { gameState, nextDay } = useGame();

  if (gameState.moments.length === 0) {
    return (
      <div className="observation-screen">
        {standalone && (
          <div className="screen-header">
            <h2>📱 朋友圈</h2>
          </div>
        )}
        <div className="empty-moments">
          <div className="empty-icon">📱</div>
          <p>还没有朋友圈动态</p>
          <p>先去处理几个愿望吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="observation-screen">
      {standalone && (
        <div className="screen-header">
          <h2>📱 朋友圈</h2>
        </div>
      )}

      {!standalone && (
        <div className="observation-intro">
          <h3>🔭 人间观察台</h3>
          <p>来看看信徒们的近况吧！</p>
        </div>
      )}

      <div className="moments-list">
        {gameState.moments.map((moment, index) => {
          const character = gameState.characters[moment.characterId];
          return (
            <div 
              key={moment.id} 
              className="moment-card card animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="moment-header">
                <div className="moment-avatar">{character?.avatar || '👤'}</div>
                <div className="moment-user">
                  <div className="moment-name">{character?.name || '神秘人'}</div>
                  <div className="moment-time">
                    {moment.timestamp} · {moment.time}
                  </div>
                </div>
              </div>

              <div className="moment-content">
                <p>{moment.content}</p>
              </div>

              <div className="moment-footer">
                <button className="moment-action">
                  <span>👍</span>
                  <span>点赞</span>
                </button>
                <button className="moment-action">
                  <span>💬</span>
                  <span>评论</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!standalone && (
        <div className="observation-actions">
          <button className="btn btn-primary" onClick={nextDay}>
            进入第 {gameState.day + 1} 天 →
          </button>
        </div>
      )}
    </div>
  );
};

export default ObservationScreen;
