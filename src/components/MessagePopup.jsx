import React from 'react';
import { useGame } from '../context/GameContext';
import './MessagePopup.css';

const MessagePopup = ({ onEnterPrivateChat }) => {
  const { gameState, closeMessage, setGameState } = useGame();

  if (!gameState.currentMessage) return null;

  const message = gameState.currentMessage;
  const god = gameState.gods[message.godId];

  // 方案A：弹窗里不再放选项，统一进入小窗对话
  const handleEnterChat = () => {
    setGameState(prev => ({
      ...prev,
      godMessages: [...prev.godMessages, { ...message, answered: false }],
      godMessagesQueue: prev.godMessagesQueue.filter(m => m.id !== message.id),
      currentMessage: null
    }));
    if (onEnterPrivateChat) onEnterPrivateChat(message.godId);
  };

  // 短预览（前 22 字）
  const preview = message.message.length > 22
    ? message.message.substring(0, 22) + '…'
    : message.message;

  return (
    <div className="message-popup-overlay" onClick={closeMessage}>
      <div className="message-popup card animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-god-avatar">{god?.avatar || '👤'}</div>
          <div className="popup-god-info">
            <div className="popup-god-name">{god?.name || '神秘神明'}</div>
            <div className="popup-god-time">📩 收到新消息 · {message.timestamp}</div>
          </div>
          <button className="popup-close" onClick={closeMessage}>×</button>
        </div>

        <div className="popup-content">
          <p className="popup-message">{preview}</p>
        </div>

        <button className="popup-enter-chat-btn" onClick={handleEnterChat}>
          💬 打开聊天
        </button>

        <button className="popup-later-btn" onClick={closeMessage}>
          稍后查看
        </button>
      </div>
    </div>
  );
};

export default MessagePopup;
