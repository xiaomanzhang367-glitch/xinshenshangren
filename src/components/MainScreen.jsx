import React, { useState } from 'react';
import { godChatStarters } from '../data/gameData';
import { useGame } from '../context/GameContext';
import StartScreen from './StartScreen';
import WishScreen from './WishScreen';
import ResultScreen from './ResultScreen';
import ObservationScreen from './ObservationScreen';
import EndScreen from './EndScreen';
import Navigation from './Navigation';
import ResourceBar from './ResourceBar';
import MessagePopup from './MessagePopup';
import MessageNotification from './MessageNotification';
import './MainScreen.css';

const MainScreen = () => {
  const { gameState, setGameState } = useGame();
  const [currentTab, setCurrentTabRaw] = useState('temple');

  const setCurrentTab = (tab) => {
    setCurrentTabRaw(tab);
    if (tab === 'gods' && (gameState.groupUnreadCount || 0) > 0) {
      setGameState(prev => ({ ...prev, groupUnreadCount: 0 }));
    }
  };
  const [showMessageList, setShowMessageList] = useState(false);
  const [selectedGod, setSelectedGod] = useState(null);
  const [chatCameFromList, setChatCameFromList] = useState(false);

  const renderPhase = () => {
    switch (gameState.phase) {
      case 'start':
        return <StartScreen />;
      case 'wish':
        return <WishScreen />;
      case 'result':
        return <ResultScreen />;
      case 'observation':
        return <ObservationScreen />;
      case 'end':
        return <EndScreen />;
      default:
        return <StartScreen />;
    }
  };

  const handleOpenMessages = () => {
    setShowMessageList(true);
  };

  const handleOpenPrivateChat = (godId) => {
    setSelectedGod(godId);
    setShowMessageList(false);
    setChatCameFromList(true);
  };

  // 从弹窗直接进入私聊：关闭后不回列表
  const handleEnterPrivateChatFromPopup = (godId) => {
    setSelectedGod(godId);
    setShowMessageList(false);
    setChatCameFromList(false);
  };

  const handleClosePrivateChat = () => {
    setSelectedGod(null);
    if (chatCameFromList) {
      setShowMessageList(true);
    }
    setChatCameFromList(false);
  };

  if (gameState.phase === 'start' || gameState.phase === 'end') {
    return (
      <div className="main-screen">
        {renderPhase()}
        <MessagePopup onEnterPrivateChat={handleEnterPrivateChatFromPopup} />
      </div>
    );
  }

  return (
    <div className="main-screen">
      <ResourceBar onOpenMessages={handleOpenMessages} />
      <MessageNotification />
      
      {currentTab === 'temple' && renderPhase()}
      {currentTab === 'moments' && <ObservationScreen standalone />}
      {currentTab === 'gods' && <GodChatScreen onClose={() => setCurrentTab('temple')} />}
      {currentTab === 'divine' && <DivineStatusScreen />}
      {currentTab === 'relations' && <RelationsScreen onJumpToMoments={() => setCurrentTab('moments')} />}
      
      <Navigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        badges={{ gods: gameState.groupUnreadCount || 0 }}
      />
      <MessagePopup onEnterPrivateChat={handleEnterPrivateChatFromPopup} />

      {showMessageList && (
        <MessageListOverlay 
          onClose={() => setShowMessageList(false)} 
          onOpenPrivateChat={handleOpenPrivateChat}
        />
      )}
      
      {selectedGod && (
        <PrivateChatScreen
          godId={selectedGod}
          onClose={handleClosePrivateChat}
          cameFromList={chatCameFromList}
        />
      )}
    </div>
  );
};

const MessageListOverlay = ({ onClose, onOpenPrivateChat }) => {
  const { gameState, selectMessage, claimRedPacket } = useGame();

  const godsList = Object.values(gameState.gods).filter(god => god.unlocked);

  return (
    <div className="message-list-overlay" onClick={onClose}>
      <div className="message-list-panel card animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="message-list-header">
          <h3>💬 神仙消息</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="gods-quick-access">
          <h4>快速私聊</h4>
          <div className="gods-grid">
            {godsList.map(god => (
              <button 
                key={god.id}
                className="god-quick-btn"
                onClick={() => onOpenPrivateChat(god.id)}
              >
                <span className="god-avatar">{god.avatar}</span>
                <span className="god-name">{god.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="message-list">
          {gameState.godMessagesQueue.length === 0 ? (
            <div className="empty-messages">
              <p>暂时没有新消息</p>
              <p>去处理愿望吧！</p>
            </div>
          ) : (
            gameState.godMessagesQueue.map((msg) => {
              const god = gameState.gods[msg.godId];
              if (msg.isRedPacket) {
                return (
                  <div
                    key={msg.id}
                    className="message-list-item red-packet-item"
                    onClick={() => {
                      claimRedPacket(msg.id);
                    }}
                  >
                    <div className="item-avatar">🧧</div>
                    <div className="item-info">
                      <div className="item-name">{god?.name || '神仙'} 发来红包</div>
                      <div className="item-preview">
                        点击领取 +{msg.amount.incense}🔥 +{msg.amount.power}⚡
                      </div>
                    </div>
                    <div className="item-badge" style={{ background: '#e74c3c' }}>领</div>
                  </div>
                );
              }
              return (
                <div
                  key={msg.id}
                  className="message-list-item"
                  onClick={() => {
                    selectMessage(msg);
                    onClose();
                  }}
                >
                  <div className="item-avatar">{god?.avatar || '👤'}</div>
                  <div className="item-info">
                    <div className="item-name">{god?.name || '神秘神明'}</div>
                    <div className="item-preview">
                      {msg.message.substring(0, 25)}...
                    </div>
                  </div>
                  <div className="item-badge">!</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const PrivateChatScreen = ({ godId, onClose, cameFromList }) => {
  const { gameState, replyToMessage, startGodConversation } = useGame();
  const [showReplyOptions, setShowReplyOptions] = useState(false);
  const [showStarters, setShowStarters] = useState(false);
  const chatEndRef = React.useRef(null);
  const god = gameState.gods[godId];

  const chatHistory = [
    ...gameState.godMessages.filter(msg => msg.godId === godId),
    ...gameState.godMessagesQueue.filter(msg => msg.godId === godId)
  ].sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  const starters = godChatStarters[godId] || [];

  const isGodTyping = gameState.typingGodId === godId;

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory.length, isGodTyping]);

  // 修复：传index而不是option对象
  const handleReply = (optionIndex) => {
    const lastPendingMsg = chatHistory.slice().reverse().find(m => m.options && !m.isReply && !m.isPlayer);
    if (lastPendingMsg) {
      replyToMessage(lastPendingMsg.id, optionIndex);
    }
    setShowReplyOptions(false);
  };

  const handleStarterClick = (starter) => {
    startGodConversation(godId, starter);
    setShowStarters(false);
  };

  const lastPendingMsg = chatHistory.slice().reverse().find(m => m.options && !m.isReply && !m.isPlayer);
  const currentReplyOptions = lastPendingMsg?.options || [];

  return (
    <div className="private-chat-overlay">
      <div className="private-chat-panel card animate-slide-in">
        <div className="chat-header">
          <button className="back-btn" onClick={onClose} title={cameFromList ? '返回好友列表' : '关闭'}>
            {cameFromList ? '← 列表' : '←'}
          </button>
          <div className="chat-god-info">
            <span className="chat-god-avatar">{god?.avatar}</span>
            <span className="chat-god-name">{god?.name}</span>
          </div>
          <div className="chat-god-status" style={{ fontSize: '11px', color: '#6b8e6b' }}>{god?.personality}</div>
        </div>

        <div className="chat-messages">
          {chatHistory.length === 0 ? (
            <div className="empty-chat">
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>{god?.avatar}</div>
              <p>还没有和{god?.name}聊过天</p>
              <p style={{ fontSize: '12px', color: '#aaa' }}>处理愿望后会收到消息，或者主动发起话题👇</p>
            </div>
          ) : (
            chatHistory.map(msg => (
              <div key={msg.id} className={`chat-message-item ${msg.isPlayer ? 'player-msg' : ''}`}>
                {!msg.isPlayer && (
                  <div className="msg-avatar-small">{god?.avatar}</div>
                )}
                <div className="msg-bubble-wrap">
                  <div className={`message-bubble ${msg.isPlayer ? 'player-bubble' : 'god-bubble'}`}>
                    {msg.message}
                  </div>
                  <div className="message-time">{msg.timestamp}</div>
                </div>
              </div>
            ))
          )}
          {isGodTyping && (
            <div className="chat-message-item">
              <div className="msg-avatar-small">{god?.avatar}</div>
              <div className="message-bubble god-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-area">
          {currentReplyOptions.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px', paddingLeft: '4px' }}>回复{god?.name}：</div>
              {currentReplyOptions.map((opt, idx) => (
                <button key={idx} className="reply-option-btn" onClick={() => handleReply(idx)}>
                  {opt.text}
                </button>
              ))}
            </div>
          )}

          {starters.length > 0 && (
            <div>
              <button
                className="chat-input"
                style={{ width: '100%', textAlign: 'left', cursor: 'pointer' }}
                onClick={() => setShowStarters(!showStarters)}
              >
                💬 发起话题
              </button>
              {showStarters && (
                <div className="reply-options">
                  {starters.map((s, idx) => (
                    <button key={idx} className="reply-option-btn" onClick={() => handleStarterClick(s)}>
                      {s.topic}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GodChatScreen = ({ onClose }) => {
  const { gameState } = useGame();
  
  const groupMessages = gameState.groupMessages || [];

  return (
    <div className="god-chat-screen">
      <div className="screen-header">
        <h2>💬 神仙工作群</h2>
      </div>
      
      <div className="messages-container">
        {groupMessages.length === 0 ? (
          <div className="empty-state">
            <p>群聊还没有消息...</p>
            <p>处理愿望后神仙们会在这里讨论！</p>
          </div>
        ) : (
          groupMessages.map(msg => (
            <div key={msg.id} className="god-message animate-slide-in">
              <div className="god-avatar">
                {gameState.gods[msg.godId]?.avatar || '👤'}
              </div>
              <div className="message-content">
                <div className="god-name">
                  {gameState.gods[msg.godId]?.name || '神秘神明'}
                </div>
                <div className="message-text">{msg.message}</div>
                <div className="message-time">{msg.timestamp}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DivineStatusScreen = () => {
  const { gameState } = useGame();

  const attributes = [
    { key: 'order', name: '秩序', opposite: '混沌', color: 'linear-gradient(90deg, #4a6fa5, #8b9dc3)' },
    { key: 'mercy', name: '慈悲', opposite: '功利', color: 'linear-gradient(90deg, #c75a5a, #d4a574)' },
    { key: 'involvement', name: '介入', opposite: '佛系', color: 'linear-gradient(90deg, #6b8e6b, #a8d8a0)' },
    { key: 'rational', name: '理性', opposite: '感性', color: 'linear-gradient(90deg, #9b7ecc, #c9a0dc)' }
  ];

  return (
    <div className="divine-status-screen">
      <div className="screen-header">
        <h2>✨ 神格状态</h2>
      </div>

      <div className="divine-title-card card animate-slide-in">
        <div className="title-avatar">👑</div>
        <h3 className="current-title">{gameState.divineTitle}</h3>
        <div className="title-score">累计功德: {gameState.totalScore}</div>
      </div>

      <div className="attributes-container">
        {attributes.map(attr => (
          <div key={attr.key} className="attribute-card card">
            <div className="attribute-header">
              <span className="attribute-name">{attr.name}</span>
              <span className="attribute-value">{gameState.divineAttributes[attr.key]}%</span>
            </div>
            <div className="attribute-bar">
              <div className="bar-track">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${gameState.divineAttributes[attr.key]}%`,
                    background: attr.color
                  }}
                />
              </div>
              <div className="bar-labels">
                <span className="label-left">{attr.opposite}</span>
                <span className="label-value">{gameState.divineAttributes[attr.key]}%</span>
                <span className="label-right">{attr.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RelationsScreen = ({ onJumpToMoments }) => {
  const { gameState } = useGame();
  const [expandedChar, setExpandedChar] = useState(null);
  const characters = Object.values(gameState.characters);
  const gods = Object.values(gameState.gods).filter(g => g.unlocked);
  const processedByChar = {};
  gameState.processedWishes.forEach(w => {
    processedByChar[w.characterId] = (processedByChar[w.characterId] || 0) + 1;
  });

  return (
    <div className="relations-screen">
      <div className="screen-header">
        <h2>🔗 关系图谱</h2>
      </div>

      <div className="relation-section">
        <h3>👥 凡人信徒</h3>

        {onJumpToMoments && (
          <button
            onClick={onJumpToMoments}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px 16px',
              margin: '8px 0 14px',
              background: 'linear-gradient(135deg, #d4a574, #c0905a)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(192, 144, 90, 0.3)'
            }}
          >
            📱 看看我养的人类怎样了 →
          </button>
        )}

        <div className="character-grid">
          {characters.map(char => {
            const helpCount = processedByChar[char.id] || 0;
            const isExpanded = expandedChar === char.id;
            return (
              <div
                key={char.id}
                className="character-card card"
                onClick={() => setExpandedChar(isExpanded ? null : char.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="char-avatar" style={{ fontSize: '36px' }}>{char.avatar}</div>
                <div className="char-info">
                  <div className="char-name" style={{ fontWeight: 700 }}>{char.name}</div>
                  <div className="char-identity" style={{ fontSize: '12px', color: '#888' }}>{char.identity}</div>
                  <div style={{ fontSize: '12px', color: '#999', margin: '2px 0' }}>📍 {char.currentStatus}</div>
                  <div className="happiness-bar" style={{ marginTop: '6px' }}>
                    <div className="happiness-track">
                      <div className="happiness-fill" style={{ width: `${char.happiness}%` }} />
                    </div>
                    <span className="happiness-text">幸福度 {char.happiness}%</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#c0905a', marginTop: '4px' }}>
                    🙏 已帮助 {helpCount} 次
                  </div>
                </div>
                {isExpanded && char.recentEvents.length > 0 && (
                  <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '8px', width: '100%' }}>
                    <div style={{ fontSize: '12px', color: '#666', fontWeight: 600, marginBottom: '4px' }}>近期动态</div>
                    {char.recentEvents.slice(-4).map((ev, i) => (
                      <div key={i} style={{ fontSize: '12px', color: '#888', padding: '2px 0' }}>• {ev}</div>
                    ))}
                  </div>
                )}
                {isExpanded && char.recentEvents.length === 0 && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#bbb', width: '100%', textAlign: 'center' }}>
                    还没有近期动态，去处理TA的愿望吧！
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="relation-section" style={{ marginTop: '16px' }}>
        <h3>✨ 神仙同僚</h3>
        <div className="gods-list">
          {gods.map(god => (
            <div key={god.id} className="god-item card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
              <span style={{ fontSize: '32px' }}>{god.avatar}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{god.name}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>性格：{god.personality}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#6b8e6b', background: 'rgba(107,142,107,0.1)', padding: '3px 8px', borderRadius: '10px' }}>
                已解锁
              </div>
            </div>
          ))}
          {Object.values(gameState.gods).filter(g => !g.unlocked).map(god => (
            <div key={god.id} className="god-item card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', opacity: 0.45 }}>
              <span style={{ fontSize: '32px', filter: 'grayscale(1)' }}>🔒</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>???</div>
                <div style={{ fontSize: '12px', color: '#bbb' }}>继续处理愿望来解锁</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relation-section" style={{ marginTop: '16px' }}>
        <h3>📊 全局统计</h3>
        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#c0905a' }}>{gameState.wishesProcessed}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>处理愿望</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#c75a5a' }}>{gameState.totalScore}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>累计功德</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#6b8e6b' }}>{gameState.incense}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>当前香火</div>
            </div>
          </div>
          <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '14px', color: '#8b4513', fontWeight: 600 }}>
            🏅 {gameState.divineTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
