import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './ObservationScreen.css';

// 每次进入页面，最新动态实时上涨点赞数
const useLiveLikes = (moments) => {
  const [likeMap, setLikeMap] = useState({});

  useEffect(() => {
    if (moments.length === 0) return;
    const latestId = moments[0].id;
    // 初始随机赞数
    setLikeMap(prev => {
      const next = { ...prev };
      moments.forEach((m, i) => {
        if (next[m.id] === undefined) {
          next[m.id] = i === 0 ? 3 : Math.floor(Math.random() * 30) + 5;
        }
      });
      return next;
    });
    // 只让最新条实时涨
    const timer = setInterval(() => {
      setLikeMap(prev => ({
        ...prev,
        [latestId]: (prev[latestId] || 3) + Math.floor(Math.random() * 2) + 1
      }));
    }, 2500);
    return () => clearInterval(timer);
  }, [moments]);

  return likeMap;
};

const ObservationScreen = ({ standalone = false }) => {
  const { gameState, nextDay } = useGame();
  const likeMap = useLiveLikes(gameState.moments);

  if (gameState.moments.length === 0) {
    return (
      <div className="observation-screen">
        {standalone && (
          <div className="screen-header">
            <h2>📱 人友圈</h2>
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
          <h2>📱 人友圈</h2>
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
          const character = gameState.characters[moment.characterId] || { avatar: '🙏', name: '匿名信徒' };
          const likes = likeMap[moment.id] ?? 0;
          const isLatest = index === 0;
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
                    {moment.timestamp}
                  </div>
                </div>
              </div>

              <div className="moment-content">
                <p>{moment.content}</p>
              </div>

              <div className="moment-footer">
                <button className="moment-action">
                  <span style={{ color: isLatest ? '#e74c3c' : '#666' }}>👍</span>
                  <span className={isLatest ? 'live-likes' : ''}>{likes}</span>
                </button>
                <button className="moment-action">
                  <span>💬</span>
                  <span>{Math.floor(likes / 4)}</span>
                </button>
                {isLatest && (
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#e74c3c' }}>● LIVE</span>
                )}
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
