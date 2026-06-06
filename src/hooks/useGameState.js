import { useState, useCallback, useEffect, useRef } from 'react';
import { initialCharacters, initialGods, initialWishes, wishTemplates, gameConfig, godMessages, godChatStarters } from '../data/gameData';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    phase: 'start',
    incense: gameConfig.incense,
    power: gameConfig.power,
    maxPower: gameConfig.maxPower,
    characters: { ...initialCharacters },
    gods: { ...initialGods },
    wishes: [...initialWishes],
    processedWishes: [],
    currentWish: null,
    wishResult: null,
    moments: [],
    godMessages: [],
    godMessagesQueue: [],
    groupMessages: [],
    currentMessage: null,
    typingGodId: null,
    unreadCount: 0,
    godFriendship: { caishen: 0, tudigong: 0, chenghuang: 0, yuelao: 0, zaowang: 0 },
    redPackets: [], // 神仙红包队列
    lastReliefAt: 0,
    divineAttributes: {
      order: 50,
      mercy: 50,
      involvement: 50,
      rational: 50
    },
    divineTitle: '懵懂新神',
    totalScore: 0,
    wishesProcessed: 0,
    wishIndex: 0
  });

  const messageTimerRef = useRef(null);
  const lastMessageTimeRef = useRef({});

  // 被动收入：凡人每25秒自动上香+2，神力每25秒自动+1
  useEffect(() => {
    const tick = setInterval(() => {
      setGameState(prev => {
        if (prev.phase !== 'wish' && prev.phase !== 'result') return prev;
        return {
          ...prev,
          incense: prev.incense + 2,
          power: Math.min(prev.maxPower, prev.power + 1)
        };
      });
    }, 25000);
    return () => clearInterval(tick);
  }, []);

  // 资源死锁救济：香火≤5 且 神力≤5 时，关系最好的神仙发红包
  useEffect(() => {
    const checkRelief = setInterval(() => {
      setGameState(prev => {
        if (prev.phase !== 'wish') return prev;
        if (prev.incense > 5 || prev.power > 5) return prev;
        // 一天只能触发一次（24小时 = 86400000ms，演示用5分钟）
        if (Date.now() - prev.lastReliefAt < 5 * 60 * 1000) return prev;

        // 找关系最好的神仙
        const friends = Object.entries(prev.godFriendship)
          .filter(([id]) => prev.gods[id]?.unlocked)
          .sort((a, b) => b[1] - a[1]);
        const [bestGodId] = friends[0] || ['tudigong'];
        const god = prev.gods[bestGodId];

        const redPacketMsg = {
          id: `redpacket_${Date.now()}`,
          godId: bestGodId,
          isRedPacket: true,
          amount: { incense: 25, power: 25 },
          message: `小神别愁，${god.name}给你发个红包，先撑着！`,
          timestamp: new Date().toLocaleTimeString(),
          read: false
        };
        return {
          ...prev,
          godMessagesQueue: [...prev.godMessagesQueue, redPacketMsg],
          unreadCount: prev.unreadCount + 1,
          lastReliefAt: Date.now()
        };
      });
    }, 10000);
    return () => clearInterval(checkRelief);
  }, []);

  const generateGodMessage = useCallback((triggerType, context = {}) => {
    const now = Date.now();
    const cooldown = 30000;
    
    let candidateMessages = [];
    
    if (triggerType === 'wish_success') {
      candidateMessages = [
        ...godMessages.success,
        ...godMessages.encouragement
      ].filter(msg => {
        const lastTime = lastMessageTimeRef.current[msg.godId] || 0;
        return now - lastTime > cooldown;
      });
    } else if (triggerType === 'wish_fail') {
      candidateMessages = godMessages.fail.filter(msg => {
        const lastTime = lastMessageTimeRef.current[msg.godId] || 0;
        return now - lastTime > cooldown;
      });
    } else if (triggerType === 'incense_milestone') {
      candidateMessages = godMessages.greeting.filter(msg => {
        if (msg.godId !== 'caishen') return false;
        const lastTime = lastMessageTimeRef.current[msg.godId] || 0;
        return now - lastTime > cooldown;
      });
    } else if (triggerType === 'game_start') {
      candidateMessages = godMessages.greeting;
    } else if (triggerType === 'random') {
      candidateMessages = godMessages.random.filter(msg => {
        const lastTime = lastMessageTimeRef.current[msg.godId] || 0;
        return now - lastTime > cooldown;
      });
    }
    
    if (candidateMessages.length === 0) return null;
    
    const randomMsg = candidateMessages[Math.floor(Math.random() * candidateMessages.length)];
    
    lastMessageTimeRef.current[randomMsg.godId] = now;
    
    return {
      ...randomMsg,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    };
  }, []);

  const addDivineMessage = useCallback((message) => {
    setGameState(prev => ({
      ...prev,
      godMessagesQueue: [...prev.godMessagesQueue, message],
      unreadCount: prev.unreadCount + 1
    }));
  }, []);

  const triggerGodMessage = useCallback((triggerType, context = {}) => {
    const message = generateGodMessage(triggerType, context);
    if (message) {
      addDivineMessage(message);
    }
  }, [generateGodMessage, addDivineMessage]);

  const startMessageTimer = useCallback(() => {
  }, []);

  const stopMessageTimer = useCallback(() => {
    if (messageTimerRef.current) {
      clearInterval(messageTimerRef.current);
      messageTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopMessageTimer();
    };
  }, [stopMessageTimer]);

  const generateNewWishes = useCallback(() => {
    const newWishes = [];
    const sources = ['liMing', 'wangWu', 'chenJuan', 'random'];
    const baseCount = Math.min(5, Math.floor(gameState.wishesProcessed / 3) + 2);
    const randomExtra = Math.floor(Math.random() * 3);
    const count = baseCount + randomExtra;
    
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
        // 模板用完后重置，允许循环使用
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
    
    return newWishes;
  }, [gameState.processedWishes, gameState.wishesProcessed]);

  const addMoment = useCallback((characterId, content) => {
    const newMoment = {
      id: `moment_${Date.now()}`,
      characterId,
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    setGameState(prev => ({
      ...prev,
      moments: [newMoment, ...prev.moments]
    }));
  }, []);

  const updateDivineAttributes = useCallback((effect, category) => {
    setGameState(prev => {
      let newAttributes = { ...prev.divineAttributes };
      let scoreDelta = 0;
      
      switch(effect) {
        case 'excellent':
          newAttributes.mercy = Math.min(100, newAttributes.mercy + 10);
          newAttributes.involvement = Math.min(100, newAttributes.involvement + 8);
          newAttributes.order = Math.min(100, newAttributes.order + 5);
          scoreDelta = 15;
          break;
        case 'normal':
          newAttributes.mercy = Math.min(100, newAttributes.mercy + 5);
          newAttributes.involvement = Math.min(100, newAttributes.involvement + 3);
          scoreDelta = 5;
          break;
        case 'ignore':
          newAttributes.involvement = Math.max(0, newAttributes.involvement - 10);
          newAttributes.mercy = Math.max(0, newAttributes.mercy - 5);
          newAttributes.rational = Math.min(100, newAttributes.rational + 5);
          scoreDelta = -5;
          break;
      }

      const categoryEffects = {
        学业: () => { newAttributes.rational = Math.min(100, newAttributes.rational + 3); },
        姻缘: () => { newAttributes.rational = Math.max(0, newAttributes.rational - 3); },
        职场: () => { newAttributes.order = Math.min(100, newAttributes.order + 5); },
        财运: () => { newAttributes.mercy = Math.max(0, newAttributes.mercy - 3); },
        健康: () => { newAttributes.mercy = Math.min(100, newAttributes.mercy + 5); }
      };
      
      categoryEffects[category]?.();

      const newTotalScore = Math.max(0, prev.totalScore + scoreDelta);
      
      let newTitle = '懵懂新神';
      if (newTotalScore >= 200) newTitle = '万神殿至尊';
      else if (newTotalScore >= 150) newTitle = '众生客服神';
      else if (newTotalScore >= 100) newTitle = '爱管闲事真君';
      else if (newTotalScore >= 50) newTitle = '香火运营大师';

      return {
        ...prev,
        divineAttributes: newAttributes,
        divineTitle: newTitle,
        totalScore: newTotalScore
      };
    });
  }, []);

  const processWish = useCallback((wish, result) => {
    const character = gameState.characters[wish.characterId] || { id: wish.characterId };
    
    const momentContents = {
      liMing: {
        success: ['425！！！终于过了！', '查分的时候手都在抖！', '感谢神明大人！'],
        fail: ['唉，看来这次又没希望了...', '为什么啊...']
      },
      wangWu: {
        success: ['面试太顺利了！', '终于不用啃老了！', '生意越来越好！'],
        fail: ['面试搞砸了...', '难道我真的这么没用吗...']
      },
      chenJuan: {
        success: ['我妈今天居然没催婚！', '世界清静了！', '终于脱单了！'],
        fail: ['今天又相了三个...累了', '什么时候是个头啊...']
      },
      random: {
        success: ['感谢神明！', '愿望实现了！', '太开心了！'],
        fail: ['愿望没有实现...', '继续努力吧...']
      }
    };

    const moments = momentContents[character.id]?.[result.success ? 'success' : 'fail'] || ['今天平平无奇...'];
    addMoment(character.id, moments[Math.floor(Math.random() * moments.length)]);

    setGameState(prev => {
      let newCharacters = { ...prev.characters };
      if (prev.characters[wish.characterId]) {
        const char = { ...prev.characters[wish.characterId] };
        if (result.success) {
          char.happiness = Math.min(100, char.happiness + 20);
          char.recentEvents.push(`愿望实现了！`);
        } else {
          char.happiness = Math.max(0, char.happiness - 10);
          char.recentEvents.push(`愿望失败了...`);
        }
        newCharacters[wish.characterId] = char;
      }

      const hasMoreWishes = prev.wishes.length > 1;
      let newWishes = prev.wishes.filter(w => w.id !== wish.id);
      
      if (!hasMoreWishes) {
        newWishes = [...newWishes, ...generateNewWishes()];
      }

      return {
        ...prev,
        characters: newCharacters,
        incense: Math.max(0, prev.incense + result.incenseGain),
        power: Math.max(0, prev.power - result.powerCost),
        wishes: newWishes,
        currentWish: null,
        wishResult: result,
        wishesProcessed: prev.wishesProcessed + 1,
        processedWishes: [...prev.processedWishes, { characterId: wish.characterId, templateIndex: wish.templateIndex }]
      };
    });

    updateDivineAttributes(result.option, wish.category);
    
    if (result.success) {
      triggerGodMessage('wish_success', { wish });
      // 70%概率触发群聊
      if (Math.random() < 0.7) {
        const pool = godMessages.groupChat;
        const count = Math.random() < 0.4 ? 2 : 1;
        const msgs = [];
        const usedIdx = new Set();
        for (let i = 0; i < count; i++) {
          let idx;
          do { idx = Math.floor(Math.random() * pool.length); } while (usedIdx.has(idx));
          usedIdx.add(idx);
          msgs.push({ ...pool[idx], timestamp: new Date().toLocaleTimeString() });
        }
        setGameState(prev => ({
          ...prev,
          groupMessages: [...prev.groupMessages, ...msgs]
        }));
      }
    } else {
      triggerGodMessage('wish_fail', { wish });
      // 40%概率触发失败群聊
      if (Math.random() < 0.4 && godMessages.groupChatFail) {
        const pool = godMessages.groupChatFail;
        const msg = { ...pool[Math.floor(Math.random() * pool.length)], timestamp: new Date().toLocaleTimeString() };
        setGameState(prev => ({
          ...prev,
          groupMessages: [...prev.groupMessages, msg]
        }));
      }
    }
  }, [gameState.characters, addMoment, generateNewWishes, updateDivineAttributes, triggerGodMessage]);

  const startGame = useCallback(() => {
    const initialMessages = godMessages.greeting.slice(0, 2).map(msg => ({
      ...msg,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    }));
    
    setGameState(prev => ({
      ...prev,
      phase: 'wish',
      godMessagesQueue: initialMessages,
      unreadCount: initialMessages.length
    }));
    
    startMessageTimer();
  }, [startMessageTimer]);

  const selectWish = useCallback((wish) => {
    setGameState(prev => ({ ...prev, currentWish: wish }));
  }, []);

  const selectMessage = useCallback((message) => {
    setGameState(prev => ({
      ...prev,
      currentMessage: message,
      unreadCount: Math.max(0, prev.unreadCount - 1),
      godMessagesQueue: prev.godMessagesQueue.filter(m => m.id !== message.id)
    }));
  }, []);

  const replyToMessage = useCallback((messageId, optionIndex) => {
    const message = gameState.currentMessage || gameState.godMessagesQueue.find(m => m.id === messageId);
    if (!message) return;

    const option = message.options[optionIndex];

    // 玩家自己的回复（先发送）
    const playerMsg = {
      id: `player_${Date.now()}`,
      godId: message.godId,
      message: option.text,
      timestamp: new Date().toLocaleTimeString(),
      isPlayer: true
    };

    // 把原消息也"沉淀"到godMessages，并从队列中移除
    const archivedOriginal = {
      ...message,
      options: undefined, // 已经回复了，不再可点
      answered: true
    };

    // 模拟"对方正在输入"的延迟回复
    const baseTime = Date.now();
    setGameState(prev => ({
      ...prev,
      incense: prev.incense + option.result.incense,
      godMessages: [
        ...prev.godMessages,
        archivedOriginal,
        playerMsg
      ],
      godMessagesQueue: prev.godMessagesQueue.filter(m => m.id !== message.id),
      currentMessage: null,
      typingGodId: message.godId
    }));

    // 1秒后神仙回复
    setTimeout(() => {
      const replyMessage = {
        id: `msg_reply_${baseTime + 1}`,
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
  }, [gameState.currentMessage, gameState.godMessagesQueue]);

  const closeMessage = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentMessage: null
    }));
  }, []);

  const claimRedPacket = useCallback((msgId) => {
    setGameState(prev => {
      const msg = prev.godMessagesQueue.find(m => m.id === msgId);
      if (!msg || !msg.isRedPacket) return prev;
      return {
        ...prev,
        incense: prev.incense + msg.amount.incense,
        power: Math.min(prev.maxPower, prev.power + msg.amount.power),
        godMessagesQueue: prev.godMessagesQueue.filter(m => m.id !== msgId),
        godMessages: [...prev.godMessages, { ...msg, claimed: true }],
        unreadCount: Math.max(0, prev.unreadCount - 1)
      };
    });
  }, []);

  const exchangePower = useCallback(() => {
    if (gameState.incense >= gameConfig.exchangeCost) {
      setGameState(prev => ({
        ...prev,
        incense: prev.incense - gameConfig.exchangeCost,
        power: Math.min(prev.maxPower, prev.power + gameConfig.exchangeAmount)
      }));
      return true;
    }
    return false;
  }, [gameState.incense]);

  const continueGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      wishResult: null,
      phase: 'wish'
    }));
  }, []);

  const startGodConversation = useCallback((godId, starter) => {
    const playerMsg = {
      id: `player_${Date.now()}`,
      godId,
      message: starter.message,
      timestamp: new Date().toLocaleTimeString(),
      isPlayer: true
    };
    setGameState(prev => ({
      ...prev,
      godMessages: [...prev.godMessages, playerMsg],
      typingGodId: godId
    }));
    // 神仙过1.2秒后回复
    setTimeout(() => {
      const replyMsg = {
        id: `reply_${Date.now()}`,
        godId,
        message: starter.reply,
        timestamp: new Date().toLocaleTimeString(),
        isReply: true
      };
      setGameState(prev => ({
        ...prev,
        incense: prev.incense + starter.incense,
        godMessages: [...prev.godMessages, replyMsg],
        typingGodId: null
      }));
    }, 1200);
  }, []);

  return {
    gameState,
    setGameState,
    startGame,
    selectWish,
    processWish,
    addMoment,
    selectMessage,
    replyToMessage,
    closeMessage,
    claimRedPacket,
    exchangePower,
    continueGame,
    startGodConversation,
    startMessageTimer,
    stopMessageTimer
  };
};
