import React from 'react';
import { useGame } from '../context/GameContext';
import './RelationsScreen.css';

const RelationsScreen = () => {
  const { gameState } = useGame();
  
  const characters = Object.values(gameState.characters);
  const gods = Object.values(gameState.gods).filter(g => g.unlocked);

  return (
    <div className="relations-screen">
      <div className="screen-header">
        <h2>🔗 关系图谱</h2>
      </div>

      <div className="relation-section">
        <h3>👥 凡人信徒</h3>
        <div className="character-grid">
          {characters.map(char => (
            <div key={char.id} className="character-card card">
              <div className="char-avatar">{char.avatar}</div>
              <div className="char-info">
                <div className="char-name">{char.name}</div>
                <div className="char-identity">{char.identity}</div>
                <div className="happiness-bar">
                  <div className="happiness-track">
                    <div 
                      className="happiness-fill" 
                      style={{ width: `${char.happiness}%` }}
                    />
                  </div>
                  <span className="happiness-text">幸福度: {char.happiness}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relation-section">
        <h3>✨ 神仙好友</h3>
        <div className="gods-list">
          {gods.map(god => (
            <div key={god.id} className="god-item card">
              <span className="god-avatar">{god.avatar}</span>
              <div className="god-info">
                <div className="god-name">{god.name}</div>
                <div className="god-personality">{god.personality}</div>
              </div>
              <div className="god-status">已解锁</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relation-section">
        <h3>📖 人间故事线</h3>
        <div className="storyline-progress card">
          {characters.map(char => (
            <div key={char.id} className="story-item">
              <div className="story-header">
                <span className="story-avatar">{char.avatar}</span>
                <span className="story-name">{char.name}</span>
                <span className="story-status">{char.currentStatus}</span>
              </div>
              {char.recentEvents.length > 0 && (
                <div className="story-events">
                  {char.recentEvents.slice(-3).map((event, idx) => (
                    <div key={idx} className="story-event">
                      • {event}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationsScreen;