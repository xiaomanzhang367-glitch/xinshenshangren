import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import WishCard from './WishCard';
import MiniGameScreen from './MiniGameScreen';
import { wishTemplates, trickyWishOutcomes, genericTrickyOutcomes, godMessages, chainEvents } from '../data/gameData';
import haptic from '../utils/haptic';
import './WishScreen.css';

const WishScreen = () => {
  const { gameState, selectWish, addMoment, setGameState } = useGame();
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [selectedWish, setSelectedWish] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [lastResult, setLastResult] = useState(null); // 结算面板数据
  const [trickyEvent, setTrickyEvent] = useState(null); // 神一阵鬼一阵彩蛋

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
      
      // 只看最近 6 次的已处理愿望，避免永久排除
      const recentUsed = gameState.processedWishes
        .filter(w => w.characterId === source)
        .slice(-6)
        .map(w => w.templateIndex);

      let availableTemplates = templates
        .map((template, idx) => ({ idx, template }))
        .filter(({ idx }) => !recentUsed.includes(idx));

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
      alert('神力不足！点击神力旁边的+号兑换');
      return;
    }
    // 15% 概率触发"神一阵鬼一阵"
    if (Math.random() < 0.15) {
      haptic.spooky();
      const text = `${wish.title} ${wish.description}`;
      const matched = trickyWishOutcomes.find(o => o.trigger.some(t => text.includes(t)));
      // 没匹配上就随机选一篇
      const outcome = matched || trickyWishOutcomes[Math.floor(Math.random() * trickyWishOutcomes.length)];
      setTrickyEvent({ wish, option, outcome });
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

      // 100% 触发群聊（成功1条/失败1条）
      const groupCount = result.success ? 2 : 1;
      const allGroup = godMessages.groupChat;
      const newGroupMsgs = [];
      for (let i = 0; i < groupCount; i++) {
        const pick = allGroup[Math.floor(Math.random() * allGroup.length)];
        newGroupMsgs.push({
          ...pick,
          id: `gc_${Date.now()}_${i}`,
          timestamp: new Date().toLocaleTimeString(),
          isNew: true
        });
      }

      // 100% 触发神仙私聊（成功 = 鼓励/夸赞，失败 = 安慰）
      // 类别匹配：学业→城隍，姻缘→月老，职场→财神，其他→土地公
      const categoryGod = {
        '学业': 'chenghuang',
        '姻缘': 'yuelao',
        '职场': 'caishen',
        '财运': 'caishen',
        '健康': 'zaowang',
      }[wish.category] || 'tudigong';

      const privateMsgPool = result.success ? godMessages.success : godMessages.fail;
      // 找匹配该神仙的，没有就随便挑
      const matched = privateMsgPool.filter(m => m.godId === categoryGod);
      const pickedPrivate = (matched.length > 0 ? matched : privateMsgPool)[Math.floor(Math.random() * (matched.length > 0 ? matched.length : privateMsgPool.length))];
      const privateMsg = pickedPrivate ? {
        ...pickedPrivate,
        id: `private_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        read: false
      } : null;

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
        groupMessages: [...(prev.groupMessages || []), ...newGroupMsgs],
        groupUnreadCount: (prev.groupUnreadCount || 0) + groupCount,
        // 每处理 3 个愿望算 1 天，到 7 天触发结局
        day: Math.min((prev.maxDays || 7), Math.floor(((prev.wishesProcessed || 0) + 1) / 3) + 1),
        phase: (((prev.wishesProcessed || 0) + 1) >= 21) ? 'finale' : prev.phase,
        godMessagesQueue: privateMsg ? [...prev.godMessagesQueue, privateMsg] : prev.godMessagesQueue,
        unreadCount: privateMsg ? (prev.unreadCount || 0) + 1 : prev.unreadCount,
        divineAttributes: {
          ...prev.divineAttributes,
          mercy: result.success ? Math.min(100, prev.divineAttributes.mercy + 10) : prev.divineAttributes.mercy,
          involvement: Math.min(100, prev.divineAttributes.involvement + 5)
        }
      };
    });

    // 蝴蝶效应：30% 概率触发连锁事件
    if (Math.random() < 0.3) {
      const pool = chainEvents[wish.characterId]?.[result.success ? 'success' : 'fail'];
      if (pool && pool.length > 0) {
        const ev = pool[Math.floor(Math.random() * pool.length)];
        setTimeout(() => {
          haptic.success();
          setGameState(prev => {
            const updates = {
              ...prev,
              incense: Math.max(0, prev.incense + (ev.incense || 0)),
              moments: [{
                id: `chain_${Date.now()}`,
                characterId: ev.scope === 'cross' ? ev.target : wish.characterId,
                content: `🦋 ${ev.text}`,
                timestamp: new Date().toLocaleTimeString(),
                isChain: true
              }, ...prev.moments]
            };
            // 跨角色：也调整对应角色幸福度
            if (ev.scope === 'cross' && ev.target && prev.characters[ev.target]) {
              updates.characters = {
                ...prev.characters,
                [ev.target]: {
                  ...prev.characters[ev.target],
                  happiness: Math.max(0, Math.min(100, prev.characters[ev.target].happiness + (ev.happinessChange || 0)))
                }
              };
            }
            return updates;
          });
        }, 1500);
      }
    }

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

        {trickyEvent && (
          <TrickyEventOverlay
            event={trickyEvent}
            onConfirm={() => {
              const { wish, option, outcome } = trickyEvent;
              // 香火 +30 奖励，神力消耗减半
              setGameState(prev => ({
                ...prev,
                incense: prev.incense + 30,
                power: Math.max(0, prev.power - Math.floor(option.powerCost / 2)),
                wishes: prev.wishes.filter(w => w.id !== wish.id),
                processedWishes: [...prev.processedWishes, { characterId: wish.characterId, templateIndex: wish.templateIndex }],
                currentWish: null,
                moments: [{
                  id: `moment_${Date.now()}`,
                  characterId: wish.characterId,
                  content: outcome,
                  timestamp: new Date().toLocaleTimeString()
                }, ...prev.moments]
              }));
              setTrickyEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// 小红书爆贴风的彩蛋
const RANDOM_TITLES = [
  '兄弟们我真的服了…',
  '求神仙小心愿望，神仙：好嘞您嘞！',
  '玄学还得是这一届的神，我服',
  '哈哈哈我笑死求神居然成真了',
  '求神居然真的有用？但是…',
  '神仙说话算话但是太字面意思了'
];
const RANDOM_TAGS = ['#神仙也会皮', '#求神记', '#玄学翻车', '#神明在听', '#凡人破防', '#字面意思'];
const RANDOM_COMMENTS = [
  { name: '匿名神友', text: '这不就是字面意思吗哈哈哈' },
  { name: 'i人退散', text: '求神仙翻牌我！我也想要这种待遇' },
  { name: '社畜本社', text: '同样被神字面解读过的报到 🤝' },
  { name: '吃瓜群众', text: '楼主笑死我了 求更新' },
  { name: '小神信徒', text: '所以神仙真的存在！只是有点皮…' },
  { name: '玄学博主', text: '记下了，下次许愿一定写清楚' },
  { name: '路人甲', text: '我的天，跟我表妹经历一模一样' },
  { name: 'KPI 杀手', text: '哈哈哈神仙也卷' },
  { name: '佛系青年', text: '不愧是新一届的神，作风清奇' },
  { name: '万事亨通', text: '楼主请问怎么联系到这位神仙？' }
];
const RANDOM_IMAGES = ['🤡', '😭', '🙃', '🥲', '😶‍🌫️', '👻', '🫠', '🤯', '😵‍💫', '🥹'];

const TrickyEventOverlay = ({ event, onConfirm }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments] = useState(() => {
    const shuffled = [...RANDOM_COMMENTS].sort(() => Math.random() - 0.5).slice(0, 5);
    return shuffled;
  });
  // 使用完整爆贴内容
  const outcome = event.outcome;
  const title = outcome.title || RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];
  const tags = outcome.tags || RANDOM_TAGS.slice(0, 3);
  const img = outcome.emoji || RANDOM_IMAGES[Math.floor(Math.random() * RANDOM_IMAGES.length)];
  const bodyText = outcome.body || outcome.result || '';
  const likes = Math.floor(Math.random() * 4000) + 800;
  const savesCount = Math.floor(likes / 4);

  React.useEffect(() => {
    haptic.spooky();
    haptic.shake('heavy');
  }, []);

  return (
    <div className="xhs-overlay">
      <div className="xhs-card" onClick={e => e.stopPropagation()}>
        {/* 顶部小红书 fake 导航 */}
        <div className="xhs-topbar">
          <span>📱 求神记 · 玄学小红书</span>
          <span style={{ fontSize: 11, color: '#999' }}>🔥 神仙发威了</span>
        </div>

        {/* 大表情图 */}
        <div className="xhs-image">
          <div className="xhs-image-emoji">{img}</div>
          <div className="xhs-image-text">{tags.join(' ')}</div>
        </div>

        {/* 标题+正文 */}
        <div className="xhs-content">
          <h3 className="xhs-title">🔥 {title}</h3>
          <div className="xhs-body">
            {bodyText.split('\n').map((line, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </div>

          <div className="xhs-author">
            <span>👤 匿名凡人 · 2 分钟前</span>
          </div>

          {/* 互动栏 */}
          <div className="xhs-actions">
            <button className={`xhs-action ${liked ? 'on' : ''}`} onClick={() => { haptic.light(); setLiked(!liked); }}>
              ❤️ {liked ? likes + 1 : likes}
            </button>
            <button className={`xhs-action ${saved ? 'on' : ''}`} onClick={() => { haptic.light(); setSaved(!saved); }}>
              🔖 {saved ? savesCount + 1 : savesCount}
            </button>
            <button className="xhs-action">💬 {comments.length}</button>
            <button className="xhs-action">📤 转发</button>
          </div>

          {/* 评论区 */}
          <div className="xhs-comments">
            <div className="xhs-comments-title">💬 神友热议</div>
            {comments.map((c, i) => (
              <div key={i} className="xhs-comment">
                <span className="xhs-comment-name">{c.name}：</span>
                <span className="xhs-comment-text">{c.text}</span>
              </div>
            ))}
          </div>

          <div className="xhs-reward">
            🧧 神仙补偿：香火 +30 · 神力消耗减半 · 你的「调剂型神明」成就 +1
          </div>

          <button className="xhs-close-btn" onClick={onConfirm}>
            哭笑不得，下一个 →
          </button>
        </div>
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
    } else if (option.effect === 'pray') {
      // 简单祈福：跳过小游戏，30%成功
      const success = Math.random() < 0.3;
      setGameState(prev => ({
        ...prev,
        incense: prev.incense + (success ? option.incenseGain : 1),
        wishes: prev.wishes.filter(w => w.id !== wish.id),
        processedWishes: [...prev.processedWishes, { characterId: wish.characterId, templateIndex: wish.templateIndex }],
        currentWish: null
      }));
    } else {
      onStartMiniGame(wish, option);
    }
  };

  return (
    <div className="wish-detail-overlay" onClick={() => setGameState(prev => ({...prev, currentWish: null}))}>
      <div className="wish-detail card animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <button
          className="wish-close-btn"
          onClick={() => setGameState(prev => ({...prev, currentWish: null}))}
          title="关闭"
        >×</button>
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
          {[...wish.options, { text: '🙏 简单祈福', description: '不消耗神力，30%成功率，香火+3', powerCost: 0, effect: 'pray', incenseGain: 3, successRate: 30 }].map((option, index) => (
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
