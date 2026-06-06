import React from 'react';
import { useGame } from '../context/GameContext';
import './MessagePopup.css';

const MessagePopup = ({ onEnterPrivateChat }) => {
  const { gameState, closeMessage, setGameState } = useGame();

  if (!gameState.currentMessage) return null;

  const message = gameState.currentMessage;
  const god = gameState.gods[message.godId];

  const handleOptionClick = (optionIndex) => {
    const option = message.options[optionIndex];

    // 玩家自己说的话也加进历史
    const playerMsg = {
      id: `player_${Date.now()}`,
      godId: message.godId,
      message: option.text,
      timestamp: new Date().toLocaleTimeString(),
      isPlayer: true
    };

    const archivedOriginal = {
      ...message,
      options: undefined,
      answered: true
    };

    setGameState(prev => ({
      ...prev,
      incense: prev.incense + option.result.incense,
      godMessages: [...prev.godMessages, archivedOriginal, playerMsg],
      godMessagesQueue: prev.godMessagesQueue.filter(m => m.id !== message.id),
      currentMessage: null,
      typingGodId: message.godId
    }));

    setTimeout(() => {
      const replyMessage = {
        id: `msg_reply_${Date.now()}`,
        godId: message.godId,
        message: option.result.reply,
        timestamp: new Date().toLocaleTimeString(),
        read: false,
        isReply: true
      };
      setGameState(prev => ({
        ...prev,
        godMessages: [...prev.godMessages, replyMessage],
        typingGodId: null
      }));
    }, 1000);
  };

  const handleEnterChat = () => {
    // 先把这条消息沉淀到 godMessages，再打开私聊
    setGameState(prev => ({
      ...prev,
      godMessages: [...prev.godMessages, { ...message, answered: false }],
      godMessagesQueue: prev.godMessagesQueue.filter(m => m.id !== message.id),
      currentMessage: null
    }));
    if (onEnterPrivateChat) onEnterPrivateChat(message.godId);
  };

  return (
    <div className="message-popup-overlay" onClick={closeMessage}>
      <div className="message-popup card animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-god-avatar">{god?.avatar || '👤'}</div>
          <div className="popup-god-info">
            <div className="popup-god-name">{god?.name || '神秘神明'}</div>
            <div className="popup-god-time">{message.timestamp}</div>
          </div>
          <button className="popup-close" onClick={closeMessage}>×</button>
        </div>

        <div className="popup-content">
          <p className="popup-message">{message.message}</p>
        </div>

        <div className="popup-options">
          {message.options.map((option, index) => (
            <button
              key={index}
              className="popup-option-btn"
              onClick={() => handleOptionClick(index)}
            >
              <span className="option-text">{option.text}</span>
            </button>
          ))}
        </div>

        {/* 进入私聊小窗 */}
        {onEnterPrivateChat && (
          <button className="popup-enter-chat-btn" onClick={handleEnterChat}>
            💬 进入 {god?.name} 的小窗聊天
          </button>
        )}
      </div>
    </div>
  );
};

export default MessagePopup;
