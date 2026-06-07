import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import haptic from '../utils/haptic';
import './ObservationScreen.css';

const NPC_COMMENT_POOL = [
  { name: '李明妈', text: '儿子加油！' },
  { name: '王五老婆', text: '老公辛苦了。' },
  { name: '陈娟闺蜜', text: '姐妹挺住！' },
  { name: '楼下大爷', text: '年轻人，挺好。' },
  { name: '快递小哥', text: '+1' },
  { name: '路过的神仙粉', text: '神明保佑你！' },
  { name: '同事小张', text: '说出了我的心声' },
  { name: '隔壁王老板', text: '加油加油' },
  { name: '老同学', text: '哈哈哈我笑出声' },
  { name: '匿名网友', text: '同款经历' }
];

const GOD_NPC_NAMES = {
  caishen: '财神 💰',
  tudigong: '土地公 🏠',
  chenghuang: '城隍 🏛️',
  yuelao: '月老 💕',
  zaowang: '灶王 🔥'
};

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
  const { gameState, nextDay, setGameState } = useGame();
  const likeMap = useLiveLikes(gameState.moments);
  const [activeComment, setActiveComment] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = (momentId) => {
    const text = commentInput.trim();
    if (!text) return;
    haptic.light();
    const playerName = gameState.godName || '小神';
    const newComment = { name: playerName + ' (你)', text, isPlayer: true };
    setGameState(prev => ({
      ...prev,
      moments: prev.moments.map(m => m.id === momentId ? { ...m, comments: [...(m.comments || []), newComment] } : m)
    }));
    setCommentInput('');

    // 1-2秒后随机神仙/凡人回应
    setTimeout(() => {
      const allRespondants = [...NPC_COMMENT_POOL];
      Object.entries(GOD_NPC_NAMES).forEach(([id, name]) => {
        if (gameState.gods[id]?.unlocked) allRespondants.push({ name, text: ['说得对！', '我也这么觉得', '哈哈哈太懂了', '小神视角真奇特'][Math.floor(Math.random() * 4)] });
      });
      const respond = allRespondants[Math.floor(Math.random() * allRespondants.length)];
      setGameState(prev => ({
        ...prev,
        moments: prev.moments.map(m => m.id === momentId ? { ...m, comments: [...(m.comments || []), respond] } : m)
      }));
    }, 1500 + Math.random() * 1500);
  };

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
                <button className="moment-action" onClick={() => setActiveComment(activeComment === moment.id ? null : moment.id)}>
                  <span>💬</span>
                  <span>{(moment.comments || []).length || Math.floor(likes / 4)}</span>
                </button>
                {isLatest && (
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#e74c3c' }}>● LIVE</span>
                )}
              </div>

              {(moment.comments || []).length > 0 && (
                <div className="moment-comments">
                  {(moment.comments || []).map((c, ci) => (
                    <div key={ci} className={`moment-comment ${c.isPlayer ? 'is-player' : ''}`}>
                      <span className="comment-name">{c.name}：</span>
                      <span className="comment-text">{c.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeComment === moment.id && (
                <div className="moment-comment-input">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    placeholder={`回复 ${character?.name || '凡人'}…`}
                    maxLength={60}
                    onKeyDown={e => { if (e.key === 'Enter') handleAddComment(moment.id); }}
                    onClick={e => e.stopPropagation()}
                  />
                  <button onClick={() => handleAddComment(moment.id)} disabled={!commentInput.trim()}>发送</button>
                </div>
              )}
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
