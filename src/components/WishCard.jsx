import React from 'react';
import './WishCard.css';

const WishCard = ({ wish, character, index, onSelect }) => {
  // random 类愿望没有固定角色，用兜底
  const safeChar = character || { avatar: '🙏', name: '匿名信徒', identity: '路过的香客' };
  return (
    <div
      className="wish-card card animate-slide-in"
      style={{ animationDelay: `${index * 0.2}s` }}
      onClick={onSelect}
    >
      <div className="wish-card-header">
        <div className="char-avatar-small">{safeChar.avatar}</div>
        <div className="char-basic">
          <div className="char-name-small">{safeChar.name}</div>
          <div className="char-identity-small">{safeChar.identity}</div>
        </div>
      </div>

      <h4 className="wish-card-title">{wish.title}</h4>
      <p className="wish-card-preview">
        {wish.description.length > 80 
          ? wish.description.substring(0, 80) + '...' 
          : wish.description}
      </p>

      <div className="wish-card-footer">
        <span className="view-hint">点击查看详情 →</span>
      </div>
    </div>
  );
};

export default WishCard;
