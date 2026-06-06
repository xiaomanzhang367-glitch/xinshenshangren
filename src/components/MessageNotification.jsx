import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import './MessageNotification.css';

const MessageNotification = () => {
  const { gameState, selectMessage } = useGame();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (gameState.godMessagesQueue.length > 0 && !gameState.currentMessage) {
      const nextMsg = gameState.godMessagesQueue[0];
      const god = gameState.gods[nextMsg.godId];
      
      setToastMessage({
        godName: god?.name || '神秘神明',
        godAvatar: god?.avatar || '👤',
        message: nextMsg.message.substring(0, 30) + '...'
      });
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [gameState.godMessagesQueue, gameState.currentMessage, gameState.gods]);

  if (!showToast || !toastMessage) return null;

  const handleClick = () => {
    const msg = gameState.godMessagesQueue[0];
    if (msg) {
      selectMessage(msg);
    }
    setShowToast(false);
  };

  return (
    <div className="message-toast" onClick={handleClick}>
      <div className="toast-content">
        <span className="toast-avatar">{toastMessage.godAvatar}</span>
        <div className="toast-info">
          <div className="toast-name">{toastMessage.godName}</div>
          <div className="toast-message">{toastMessage.message}</div>
        </div>
        <div className="toast-badge">!</div>
      </div>
    </div>
  );
};

export default MessageNotification;
