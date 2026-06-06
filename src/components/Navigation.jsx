import React from 'react';
import './Navigation.css';

const Navigation = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: 'temple', icon: '⛩️', label: '神庙' },
    { id: 'moments', icon: '📱', label: '朋友圈' },
    { id: 'gods', icon: '💬', label: '群聊' },
    { id: 'divine', icon: '✨', label: '神格' },
    { id: 'relations', icon: '🔗', label: '关系' }
  ];

  return (
    <div className="navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
          onClick={() => setCurrentTab(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;
