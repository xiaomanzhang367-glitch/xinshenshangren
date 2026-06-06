import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import WishCard from './WishCard';
import MiniGameScreen from './MiniGameScreen';
import { wishTemplates } from '../data/gameData';
import './WishScreen.css';

const WishScreen = () => {
  const { gameState, selectWish, addMoment, setGameState } = useGame();
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedWish, setSelectedWish] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastResult, setLastResult] = useState(null); // 结算面板数据

  useEffect(() => {
    if (gameState.wishes.length < 3 && gameState.phase === 'wish') {
      const timer = setTimeout(() => {
        generateNewWishes();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.wishes.length, gameState.phase]);

  const generateNewWishes = () => {
    const sources = ['liMing', 'wangWu', 'chenJuan', 'random'];
    const count = Math.min(3, 5 - gameState.wishes.length);
    
    const newWishes = [];
    const shuffledSources = [...sources].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < count; i++) {
      const source = shuffledSources[i % shuffledSources.length];
      const templates = wishTemplates[source];
      
      const usedIndices = gameState.processedWishes
        .filter(w => w.characterId === source)
        .map(w => w.templateIndex);
      
      let availableTemplates = templates
        .map((template, idx) => ({ idx, template }))
        .filter(({ idx }) => !usedIndices.includes(idx));

      if (availableTemplates.length === 0) {
        availableTemplates = templates.map((template, idx) => ({ idx, template }));
      }

      const randomTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];

      newWishes.push({
        id: `wish_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
        characterId: source,
        templateIndex: randomTemplate.idx,
        ...randomTemplate.template
      });
    }

    if (newWishes.length > 0) {
      setGameState(prev => ({
        ...prev,
        wishes: [...prev.wishes, ...newWishes]
      }));
    }
  };

  const handleSelectWish = (wish) => {
    selectWish(wish);
  };

  const handleStartMiniGame = (wish, option) => {
    if (gameState.power < option.powerCost) {
      alert('神力不足！点击顶部的香火图标兑换神力');
      return;
    }
    setSelectedWish(wish);
    setSelectedOption(option);
    setShowMiniGame(true);
  };

  const handleMiniGameComplete = (wish, result) => {
    // 关键修复：random类愿望没有对应character，需要兜底
    const isRandomWish = !gameState.characters[wish.characterId];
    const character = gameState.characters[wish.characterId] || {
      id: 'random',
      name: '匿名信徒',
      avatar: '🙏',
      identity: '路过的香客',
      happiness: 50,
      recentEvents: []
    };

    const momentContents = {
      liMing: {
        success: ['425！！！终于过了！', '查分的时候手都在抖！', '感谢神明大人！'],
        fail: ['唉，看来这次又没希望了...', '为什么啊...']
      },
      wangWu: {
        success: ['面试太顺利了！HR说下周就可以入职！', '终于不用啃老了！', '生意越来越好！'],
        fail: ['面试搞砸了...', '难道我真的这么没用吗...']
      },
      chenJuan: {
        success: ['我妈今天居然没催婚！', '世界清静了！', '终于脱单了！'],
        fail: ['今天又相了三个...累了', '什么时候是个头啊...']
      },
      random: {
        success: ['感谢神明，愿望实现啦！', '今天运气真好！', '神明保佑我了！太开心！'],
        fail: ['唉，没成功...', '可能是诚意不够吧...']
      }
    };

    const moments = momentContents[character.id]?.[result.success ? 'success' : 'fail'] || ['今天平平无奇...'];
    const momentText = moments[Math.floor(Math.random() * moments.length)];
    addMoment(character.id, momentText);

    setGameState(prev => {
      // 只更新真实角色，random不更新characters
      let newCharacters = prev.characters;
      if (!isRandomWish) {
        const char = { ...prev.characters[wish.characterId] };
        if (result.success) {
          char.happiness = Math.min(100, char.happiness + 20);
          char.recentEvents = [...(char.recentEvents || []), '愿望实现了！'];
        } else {
          char.happiness = Math.max(0, char.happiness - 10);
          char.recentEvents = [...(char.recentEvents || []), '愿望失败了...'];
        }
        newCharacters = { ...prev.characters, [wish.characterId]: char };
      }

      const remainingWishes = prev.wishes.filter(w => w.id !== wish.id);
      const needMoreWishes = remainingWishes.length < 3;
      let newWishesToAdd = [];
      
      if (needMoreWishes) {
        const sources = ['liMing', 'wangWu', 'chenJuan', 'random'];
        const count = Math.min(3, 5 - remainingWishes.length);
        
        const shuffledSources = [...sources].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < count; i++) {
          const source = shuffledSources[i % shuffledSources.length];
          const templates = wishTemplates[source];
          
          const usedIndices = prev.processedWishes
            .filter(w => w.characterId === source)
            .map(w => w.templateIndex);
          
          let availableTemplates = templates
            .map((template, idx) => ({ idx, template }))
            .filter(({ idx }) => !usedIndices.includes(idx));

          if (availableTemplates.length === 0) {
            availableTemplates = templates.map((template, idx) => ({ idx, template }));
          }
          
          const randomTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
          
          newWishesToAdd.push({
            id: `wish_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
            characterId: source,
            templateIndex: randomTemplate.idx,
            ...randomTemplate.template
          });
        }
      }

      return {
        ...prev,
        characters: newCharacters,
        incense: Math.max(0, prev.incense + result.incenseGain),
        power: Math.max(0, prev.power - (selectedOption?.powerCost || 0)),
        wishes: [...remainingWishes, ...newWishesToAdd],
        processedWishes: [...prev.processedWishes, { ...wish, result }],
        currentWish: null,
        wishesProcessed: (prev.wishesProcessed || 0) + 1,
        totalScore: Math.max(0, (prev.totalScore || 0) + (result.success ? 15 : -3)),
        divineAttributes: {
          ...prev.divineAttributes,
          mercy: result.success ? Math.min(100, prev.divineAttributes.mercy + 10) : prev.divineAttributes.mercy,
          involvement: Math.min(100, prev.divineAttributes.involvement + 5)
        }
      };
    });

    // 显示结算面板
    setLastResult({
      wish,
      character,
      result,
      momentText,
      incenseGain: result.incenseGain,
      powerCost: selectedOption?.powerCost || 0,
      happinessChange: result.success ? 20 : -10
    });

    setShowMiniGame(false);
    setSelectedWish(null);
    setSelectedOption(null);
  };

  const availableWishes = gameState.wishes;

  if (showMiniGame && selectedWish) {
    return (
      <MiniGameScreen 
        wish={selectedWish} 
        onComplete={handleMiniGameComplete} 
      />
    );
  }

  return (
    <div className="wish-screen">
      <div className="screen-content">
        <div className="temple-header">
          <h2 className="temple-title">⛩️ 神庙前厅</h2>
          <p className="temple-desc">
            {availableWishes.length > 0 
              ? `有 ${availableWishes.length} 个愿望等待处理` 
              : '愿望正在赶来的路上...'}
          </p>
        </div>

        <div className="wishes-container">
          {availableWishes.map((wish, index) => (
            <WishCard
              key={wish.id}
              wish={wish}
              character={gameState.characters[wish.characterId]}
              index={index}
              onSelect={() => handleSelectWish(wish)}
            />
          ))}
        </div>

        {availableWishes.length === 0 && (
          <div className="no-wishes-card card">
            <div className="no-wishes-icon">✨</div>
            <h3>等待新的愿望</h3>
            <p>凡人的心愿正在汇聚...</p>
            <div className="loading-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}

        {gameState.currentWish && (
          <WishDetail
            wish={gameState.currentWish}
            character={gameState.characters[gameState.currentWish.characterId] || { avatar: '🙏', name: '匿名信徒', identity: '路过的香客' }}
            onStartMiniGame={handleStartMiniGame}
          />
        )}

        {lastResult && (
          <ResultOverlay
            data={lastResult}
            onClose={() => setLastResult(null)}
          />
        )}
      </div>
    </div>
  );
};

const ResultOverlay = ({ data, onClose }) => {
  const { wish, character, result, momentText, incenseGain, powerCost, happinessChange } = data;
  const isPerfect = result.gameScore >= 50 && result.success;

  return (
    <div className="wish-detail-overlay" onClick={onClose}>
      <div className="wish-detail card animate-slide-in" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        {/* 结果头部 */}
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '64px', marginBottom: '8px' }}>
            {isPerfect ? '🎉' : result.success ? '😊' : '😢'}
          </div>
          <h3 style={{ color: '#8b4513', margin: 0 }}>
            {isPerfect ? '完美实现！' : result.success ? '还算顺利～' : '有点遗憾...'}
          </h3>
          <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
            小游戏得分: <span style={{ color: '#c0905a', fontWeight: 700 }}>{result.gameScore}分</span>
          </div>
        </div>

        {/* 资源变化 */}
        <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(212,165,116,0.1)', padding: '12px', borderRadius: '12px', margin: '12px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#888' }}>香火</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: incenseGain > 0 ? '#4caf50' : '#f44336' }}>
              {incenseGain > 0 ? '+' : ''}{incenseGain} 🔥
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#888' }}>神力</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#ff9800' }}>
              -{powerCost} ⚡
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#888' }}>{character.name}幸福度</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: happinessChange > 0 ? '#4caf50' : '#f44336' }}>
              {happinessChange > 0 ? '+' : ''}{happinessChange} 💗
            </div>
          </div>
        </div>

        {/* 朋友圈动态 */}
        <div style={{ background: 'white', border: '1px solid #eee', borderRadius: '12px', padding: '12px', margin: '12px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '24px' }}>{character.avatar}</span>
            <span style={{ fontWeight: 700, fontSize: '14px' }}>{character.name}</span>
            <span style={{ fontSize: '11px', color: '#aaa', marginLeft: 'auto' }}>📱 刚刚发布</span>
          </div>
          <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.6, paddingLeft: '4px' }}>
            "{momentText}"
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '12px', color: '#888' }}>
            <span>👍 {Math.floor(Math.random() * 30) + 5}</span>
            <span>💬 {Math.floor(Math.random() * 8)}</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>
            继续处理愿望
          </button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '8px' }}>
          💡 朋友圈和关系图谱已更新，去左下角"朋友圈"标签查看
        </div>
      </div>
    </div>
  );
};

const WishDetail = ({ wish, character, onStartMiniGame }) => {
  const { gameState, setGameState } = useGame();

  const handleSelectOption = (option) => {
    if (option.effect === 'ignore') {
      setGameState(prev => ({
        ...prev,
        incense: Math.max(0, prev.incense - 5),
        wishes: prev.wishes.filter(w => w.id !== wish.id),
        currentWish: null,
        divineAttributes: {
          ...prev.divineAttributes,
          involvement: Math.max(0, prev.divineAttributes.involvement - 10)
        }
      }));
    } else {
      onStartMiniGame(wish, option);
    }
  };

  return (
    <div className="wish-detail-overlay" onClick={() => setGameState(prev => ({...prev, currentWish: null}))}>
      <div className="wish-detail card animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="wish-char-header">
          <div className="char-avatar-large">{character.avatar}</div>
          <div className="char-info">
            <div className="char-name">{character.name}</div>
            <div className="char-identity">{character.identity}</div>
          </div>
        </div>

        <h3 className="wish-title">{wish.title}</h3>
        <p className="wish-desc">{wish.description}</p>

        <div className="category-badge">
          {wish.category === '学业' && '📚 学业'}
          {wish.category === '姻缘' && '💕 姻缘'}
          {wish.category === '职场' && '💼 职场'}
        </div>

        <div className="options-container">
          {wish.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn card ${gameState.power < option.powerCost && option.effect !== 'ignore' ? 'disabled' : ''}`}
              disabled={gameState.power < option.powerCost && option.effect !== 'ignore'}
              onClick={() => handleSelectOption(option)}
            >
              <div className="option-header">
                <span className="option-text">{option.text}</span>
                {option.powerCost > 0 && (
                  <span className={`option-cost ${gameState.power < option.powerCost ? 'insufficient' : ''}`}>
                    ⚡{option.powerCost}
                  </span>
                )}
                {option.effect === 'ignore' && (
                  <span className="option-cost incense-cost">🔥-5</span>
                )}
              </div>
              <p className="option-desc">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishScreen;
