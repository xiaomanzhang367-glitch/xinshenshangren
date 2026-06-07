import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { miniGames } from '../data/gameData';
import haptic from '../utils/haptic';
import { PerfectBurst, Fireworks } from './VFX';
import './MiniGameScreen.css';

const MiniGameScreen = ({ wish, onComplete }) => {
  const { gameState } = useGame();
  const gameType = wish?.gameType || wish?.category || '职场';
  const gameConfig = miniGames[gameType] || miniGames[wish?.category] || miniGames['职场'];
  
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameConfig.duration);
  const [gameEnded, setGameEnded] = useState(false);
  const [showBurst, setShowBurst] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const timerRef = useRef(null);

  // 全局事件：PERFECT 命中时震屏 + 视觉爆炸
  useEffect(() => {
    const handler = (e) => {
      setShowBurst(e.detail || { text: '✨ PERFECT ✨', color: '#ffd700' });
      haptic.shake('heavy');
    };
    window.addEventListener('vfx:perfect', handler);
    return () => window.removeEventListener('vfx:perfect', handler);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(gameConfig.duration);
    setGameEnded(false);

    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleComplete = () => {
    const successRate = Math.min(100, Math.max(20, score * 3));
    const success = Math.random() * 100 < successRate;
    
    const result = {
      success,
      option: score >= 50 ? 'excellent' : 'normal',
      incenseGain: success ? (score >= 50 ? 25 : 15) : 5,
      powerCost: 0,
      gameScore: score
    };

    onComplete(wish, result);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!gameStarted) {
    return (
      <div className="mini-game-intro">
        <div className="game-info-card card animate-slide-in">
          <div className="game-icon">
            {gameType === '接东西' && '📚'}
            {gameType === '配对' && '💕'}
            {gameType === '跳台阶' && '💼'}
            {gameType === '连连看' && '🔗'}
            {gameType === '答题' && '❓'}
            {gameType === '点灯' && '🪷'}
          </div>
          <h2 className="game-title">{gameConfig.name}</h2>
          <p className="game-desc">{gameConfig.description}</p>
          
          <div className="game-stats">
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">时长</span>
              <span className="stat-value">{gameConfig.duration}秒</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⚡</span>
              <span className="stat-label">消耗</span>
              <span className="stat-value">{gameConfig.powerCost}</span>
            </div>
          </div>

          <div className="game-tips">
            <h4>🎯 玩法说明</h4>
            {gameType === '接东西' && (
              <p>左右键/触屏控制书生移动，接到 📚📖✏️ 加分！</p>
            )}
            {gameType === '配对' && (
              <p>点击相同颜色的心形配对，越快分数越高！</p>
            )}
            {gameType === '跳台阶' && (
              <p>点击屏幕左右移动，中间跳跃，跳上更高台阶！</p>
            )}
            {gameType === '连连看' && (
              <p>点击两个相同图案连线消除，限时内消除所有！</p>
            )}
            {gameType === '答题' && (
              <p>快速选择正确答案，答对得分！</p>
            )}
            {gameType === '点灯' && (
              <p>看清莲花灯亮起的顺序，按顺序点击点亮！连续答对越多分越高～</p>
            )}
          </div>

          <button className="btn btn-primary start-game-btn" onClick={startGame}>
            开始游戏 ⚡
          </button>

          <button className="btn btn-outline back-btn" onClick={() => window.history.back()}>
            返回
          </button>
        </div>
      </div>
    );
  }

  const handleExit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (window.confirm('确定要退出本次愿望？将损失 5 香火')) {
      onComplete(wish, { success: false, option: 'quit', incenseGain: -5, powerCost: 0, gameScore: 0, quit: true });
    }
  };

  const handleEarlyWin = () => {
    if (gameEnded) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setGameEnded(true);
    setScore(s => s + 30); // 提前通关奖励
  };

  return (
    <div className="mini-game-container">
      <GameHeader timeLeft={timeLeft} score={score} gameType={gameType} onExit={handleExit} />
      {gameType === '接东西' && <CatchGame score={score} setScore={setScore} gameEnded={gameEnded} onEarlyWin={handleEarlyWin} />}
      {gameType === '配对' && <MatchGame score={score} setScore={setScore} gameEnded={gameEnded} onEarlyWin={handleEarlyWin} />}
      {gameType === '跳台阶' && <JumpGame score={score} setScore={setScore} gameEnded={gameEnded} onEarlyWin={handleEarlyWin} />}
      {gameType === '连连看' && <LinkGame score={score} setScore={setScore} gameEnded={gameEnded} onEarlyWin={handleEarlyWin} />}
      {gameType === '答题' && <QuizGame score={score} setScore={setScore} gameEnded={gameEnded} onEarlyWin={handleEarlyWin} />}
      {gameType === '点灯' && <LightLampGame score={score} setScore={setScore} gameEnded={gameEnded} onEarlyWin={handleEarlyWin} />}

      {gameEnded && (
        <>
          {score >= 60 && <Fireworks onDone={() => setShowFireworks(false)} />}
          <GameResult score={score} onComplete={handleComplete} />
        </>
      )}

      {showBurst && (
        <PerfectBurst
          text={showBurst.text}
          color={showBurst.color}
          onDone={() => setShowBurst(null)}
        />
      )}
    </div>
  );
};

const GameHeader = ({ timeLeft, score, gameType, onExit }) => (
  <div className="game-header">
    <div className="time-display">
      <span className="time-icon">⏱️</span>
      <span className="time-value">{timeLeft}s</span>
    </div>
    <div className="score-display">
      <span className="score-icon">
        {gameType === '接东西' && '📚'}
        {gameType === '配对' && '💕'}
        {gameType === '跳台阶' && '💼'}
        {gameType === '连连看' && '🔗'}
        {gameType === '答题' && '❓'}
        {gameType === '点灯' && '🪷'}
      </span>
      <span className="score-value">{score}分</span>
    </div>
    <button className="game-exit-btn" onClick={onExit} title="退出游戏（扣5香火）">✕</button>
  </div>
);

const CatchGame = ({ score, setScore, gameEnded, onEarlyWin }) => {
  const [items, setItems] = useState([]);
  const [playerPos, setPlayerPos] = useState(50);
  const gameRef = useRef(null);
  // 用 ref 镜像当前玩家位置和游戏结束状态，避免重渲染影响 interval
  const playerPosRef = useRef(50);
  const gameEndedRef = useRef(false);
  const caughtCountRef = useRef(0);

  useEffect(() => { gameEndedRef.current = gameEnded; }, [gameEnded]);
  useEffect(() => { playerPosRef.current = playerPos; }, [playerPos]);

  // 生成物体 - 独立 interval，不再依赖任何 state
  useEffect(() => {
    const dropInterval = setInterval(() => {
      if (gameEndedRef.current) return;
      const goodItems = ['📚', '📖', '✏️'];
      const badItems = ['🎮', '📱'];
      const itemPool = Math.random() > 0.4 ? goodItems : badItems;
      const emoji = itemPool[Math.floor(Math.random() * itemPool.length)];
      const isGood = goodItems.includes(emoji);

      setItems(prev => [...prev, {
        id: Date.now() + Math.random(),
        emoji,
        x: Math.random() * 70 + 15,
        y: 0,
        isGood
      }]);
    }, 1100);

    return () => clearInterval(dropInterval);
  }, []);

  // 物体下落 + 碰撞检测 - 读取 ref，永不依赖 playerPos
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (gameEndedRef.current) return;
      setItems(prev => {
        let newScore = 0;
        const playerX = playerPosRef.current;
        const filtered = prev.map(item => ({ ...item, y: item.y + 2.5 })).filter(item => {
          if (item.y >= 85) {
            if (item.isGood) newScore -= 3;
            return false;
          }
          if (Math.abs(item.x - playerX) < 10 && item.y >= 75 && item.y <= 85) {
            if (item.isGood) {
              newScore += 10;
              caughtCountRef.current += 1;
              if (caughtCountRef.current >= 10 && onEarlyWin) onEarlyWin();
            } else {
              newScore -= 8;
            }
            return false;
          }
          return true;
        });
        if (newScore !== 0) setScore(s => Math.max(0, s + newScore));
        return filtered;
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [setScore, onEarlyWin]);

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setPlayerPos(p => Math.max(10, p - 6));
      else if (e.key === 'ArrowRight') setPlayerPos(p => Math.min(90, p + 6));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch + Pointer 双绑（兼容微信WebView），位置改 ref 不引起重渲染
  const movePlayerRef = useRef(null);
  movePlayerRef.current = (clientX) => {
    const rect = gameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(10, Math.min(90, x));
    playerPosRef.current = clamped;
    setPlayerPos(clamped);
  };

  // 用原生事件监听器避免 React 合成事件在某些微信版本里被吞
  useEffect(() => {
    const el = gameRef.current;
    if (!el) return;
    const onTouch = (e) => {
      const t = e.touches?.[0] || e.changedTouches?.[0];
      if (t) movePlayerRef.current?.(t.clientX);
    };
    const onPointer = (e) => {
      if (e.clientX !== undefined) movePlayerRef.current?.(e.clientX);
    };
    const onMouse = (e) => movePlayerRef.current?.(e.clientX);

    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('touchmove', onTouch, { passive: true });
    el.addEventListener('pointermove', onPointer);
    el.addEventListener('mousemove', onMouse);
    return () => {
      el.removeEventListener('touchstart', onTouch);
      el.removeEventListener('touchmove', onTouch);
      el.removeEventListener('pointermove', onPointer);
      el.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div
      className="game-area"
      ref={gameRef}
      style={{ touchAction: 'none' }}
    >
      <div className="falling-items">
        {items.map(item => (
          <div
            key={item.id}
            className={`falling-item ${item.isGood ? 'good' : 'bad'}`}
            style={{ left: `${item.x}%`, top: `${item.y}%`, fontSize: '28px' }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
      <div className="player catcher" style={{ left: `${playerPos}%` }}>
        👨‍🎓
      </div>
      <div style={{position:'absolute',top:8,right:8,fontSize:11,color:'#888'}}>
        已接 {caughtCountRef.current}/10
      </div>
    </div>
  );
};

const MatchGame = ({ score, setScore, gameEnded, onEarlyWin }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    if (gameEnded) return;

    const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜'];
    const cardPairs = [...hearts, ...hearts].sort(() => Math.random() - 0.5);
    
    const newCards = cardPairs.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
  }, [gameEnded]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      
      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev => prev.map((card, index) => 
          index === first || index === second 
            ? { ...card, matched: true }
            : card
        ));
        setMatchedPairs(prev => {
          const next = prev + 1;
          if (next >= 6 && onEarlyWin) setTimeout(onEarlyWin, 400);
          return next;
        });
        setScore(prev => prev + 25);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            index === first || index === second 
              ? { ...card, flipped: false }
              : card
          ));
        }, 800);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index) => {
    if (gameEnded) return;
    if (cards[index].flipped || cards[index].matched) return;
    if (flippedCards.length >= 2) return;

    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, flipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  return (
    <div className="game-area match-area">
      <div className="match-grid">
        {cards.map((card, index) => (
          <button
            key={card.id}
            className={`match-card ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <span className="card-emoji">{card.flipped || card.matched ? card.emoji : '❓'}</span>
          </button>
        ))}
      </div>
      <div className="match-status">
        <span>已配对: {matchedPairs}/6</span>
      </div>
    </div>
  );
};

const JUMP_PLATFORMS = [
  { x: 20, y: 82, width: 22 },
  { x: 62, y: 68, width: 18 },
  { x: 28, y: 54, width: 16 },
  { x: 68, y: 40, width: 14 },
  { x: 38, y: 26, width: 12 },
  { x: 72, y: 13, width: 12 }
];

const JumpGame = ({ score, setScore, gameEnded, onEarlyWin }) => {
  const gameAreaRef = useRef(null);

  // 使用ref存储所有可变游戏状态，彻底避免stale closure
  const stateRef = useRef({
    playerX: JUMP_PLATFORMS[0].x,
    playerY: JUMP_PLATFORMS[0].y,
    currentPlatformIdx: 0,
    charging: false,
    chargePower: 0,
    jumping: false,
    fallen: false,
    chargeTimer: null,
    jumpTimer: null,
    tapX: null
  });

  // 每跳生成一个黄金区间，停在区间内才算完美命中
  const generateGoldenZone = () => {
    const start = 40 + Math.random() * 30; // 40-70
    return { start, end: start + 18 };       // 区间宽度18
  };

  const [renderState, setRenderState] = useState({
    playerX: JUMP_PLATFORMS[0].x,
    playerY: JUMP_PLATFORMS[0].y,
    currentPlatformIdx: 0,
    chargePower: 0,
    charging: false,
    fallen: false,
    topped: false,
    goldenZone: { start: 50, end: 68 },
    lastJumpHit: null // 'perfect' | 'good' | 'miss'
  });

  const sync = () => {
    const s = stateRef.current;
    setRenderState(prev => ({
      ...prev,
      playerX: s.playerX,
      playerY: s.playerY,
      currentPlatformIdx: s.currentPlatformIdx,
      chargePower: s.chargePower,
      charging: s.charging,
      fallen: s.fallen,
      topped: s.currentPlatformIdx >= JUMP_PLATFORMS.length - 1,
      goldenZone: s.goldenZone || prev.goldenZone,
      lastJumpHit: s.lastJumpHit
    }));
  };

  const doStartCharge = useCallback(() => {
    const s = stateRef.current;
    if (s.jumping || s.fallen || gameEnded) return;
    if (s.chargeTimer) clearInterval(s.chargeTimer);
    s.charging = true;
    s.chargePower = 0;
    if (!s.goldenZone) s.goldenZone = generateGoldenZone();
    s.chargeTimer = setInterval(() => {
      s.chargePower = Math.min(100, s.chargePower + 2); // 稍慢一点，让玩家有时间反应
      sync();
    }, 25);
    sync();
  }, [gameEnded]);

  const doReleaseJump = useCallback((tapXPercent) => {
    const s = stateRef.current;
    if (!s.charging || s.jumping || s.fallen || gameEnded) return;
    if (s.chargeTimer) { clearInterval(s.chargeTimer); s.chargeTimer = null; }
    s.charging = false;

    const power = s.chargePower;
    const zone = s.goldenZone || { start: 50, end: 68 };

    // 判定命中区间
    let hitType;
    if (power >= zone.start && power <= zone.end) {
      hitType = 'perfect';
      haptic.heavy();
      window.dispatchEvent(new CustomEvent('vfx:perfect', { detail: { text: '✨ PERFECT ✨', color: '#ffd700' } }));
    } else if (power >= zone.start - 8 && power <= zone.end + 8) {
      hitType = 'good';
      haptic.medium();
    } else {
      hitType = 'miss';
      haptic.error();
    }
    s.lastJumpHit = hitType;

    // 根据点击位置决定方向
    const dir = tapXPercent !== undefined
      ? (tapXPercent > s.playerX ? 1 : -1)
      : 1;

    // 完美命中=直接落到下一台阶；good=落点偏离少；miss=落点严重偏离/掉下去
    const nextIdx = s.currentPlatformIdx + 1;
    const nextP = JUMP_PLATFORMS[nextIdx];
    let destX, destY, willLand;

    if (!nextP) {
      // 已在顶层
      destX = s.playerX;
      destY = s.playerY;
      willLand = true;
    } else if (hitType === 'perfect') {
      destX = nextP.x;
      destY = nextP.y;
      willLand = true;
    } else if (hitType === 'good') {
      // 略微偏离，仍站上去
      const offset = (Math.random() - 0.5) * (nextP.width * 0.3);
      destX = nextP.x + offset;
      destY = nextP.y;
      willLand = true;
    } else {
      // miss - 跳过头或没跳到
      const jumpDist = (power / 100) * 52;
      destX = Math.max(5, Math.min(93, s.playerX + dir * jumpDist));
      destY = s.playerY + 28; // 掉下去
      willLand = false;
    }

    const startX = s.playerX;
    const startY = s.playerY;

    s.jumping = true;
    let progress = 0;
    const totalSteps = 28;

    if (s.jumpTimer) clearInterval(s.jumpTimer);
    s.jumpTimer = setInterval(() => {
      progress++;
      const t = progress / totalSteps;
      const arc = Math.sin(t * Math.PI) * 18;
      s.playerX = startX + (destX - startX) * t;
      s.playerY = startY + (destY - startY) * t - arc;
      sync();

      if (progress >= totalSteps) {
        clearInterval(s.jumpTimer);
        s.jumpTimer = null;
        s.jumping = false;
        s.playerX = destX;
        s.playerY = destY;

        if (willLand) {
          s.currentPlatformIdx = nextIdx;
          s.playerX = nextP.x;
          s.playerY = nextP.y;
          const baseScore = (nextIdx + 1) * 10;
          const bonus = hitType === 'perfect' ? 15 : 0;
          setScore(prev => prev + baseScore + bonus);
          if (nextIdx >= JUMP_PLATFORMS.length - 1) {
            setScore(prev => prev + 50);
            if (onEarlyWin) setTimeout(onEarlyWin, 800);
          }
          // 下一跳生成新黄金区间
          s.goldenZone = generateGoldenZone();
        } else {
          s.fallen = true;
        }
        sync();
      }
    }, 14);
  }, [gameEnded, setScore]);

  const doRestart = useCallback(() => {
    const s = stateRef.current;
    if (s.chargeTimer) { clearInterval(s.chargeTimer); s.chargeTimer = null; }
    if (s.jumpTimer) { clearInterval(s.jumpTimer); s.jumpTimer = null; }
    s.playerX = JUMP_PLATFORMS[0].x;
    s.playerY = JUMP_PLATFORMS[0].y;
    s.currentPlatformIdx = 0;
    s.charging = false;
    s.chargePower = 0;
    s.jumping = false;
    s.fallen = false;
    s.goldenZone = generateGoldenZone();
    s.lastJumpHit = null;
    sync();
  }, []);

  // 键盘事件
  useEffect(() => {
    const onDown = (e) => {
      if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); doStartCharge(); }
    };
    const onUp = (e) => {
      if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); doReleaseJump(undefined); }
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, [doStartCharge, doReleaseJump]);

  useEffect(() => {
    return () => {
      const s = stateRef.current;
      if (s.chargeTimer) clearInterval(s.chargeTimer);
      if (s.jumpTimer) clearInterval(s.jumpTimer);
    };
  }, []);

  // 统一用 PointerEvents，方向用「按下时的屏幕左右半边」判定
  const getPctX = (e) => {
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return undefined;
    return ((e.clientX - rect.left) / rect.width) * 100;
  };

  const { playerX, playerY, currentPlatformIdx, chargePower, charging, fallen, topped, goldenZone, lastJumpHit } = renderState;

  return (
    <div
      className="game-area jump-area"
      ref={gameAreaRef}
      style={{ touchAction: 'none', userSelect: 'none' }}
      onPointerDown={(e) => {
        e.preventDefault();
        gameAreaRef.current?.setPointerCapture?.(e.pointerId);
        stateRef.current.tapX = getPctX(e);
        doStartCharge();
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        const finalX = getPctX(e);
        // 方向用屏幕左右半边判定：左半 = 向左跳，右半 = 向右跳
        const dir = finalX !== undefined && finalX < 50 ? finalX - 60 : finalX;
        doReleaseJump(dir);
        gameAreaRef.current?.releasePointerCapture?.(e.pointerId);
      }}
      onPointerCancel={(e) => {
        if (stateRef.current.charging) doReleaseJump(undefined);
        gameAreaRef.current?.releasePointerCapture?.(e.pointerId);
      }}
    >
      {/* 平台 */}
      {JUMP_PLATFORMS.map((plat, idx) => (
        <div
          key={idx}
          className={`jump-platform ${idx === currentPlatformIdx ? 'current' : idx < currentPlatformIdx ? 'passed' : ''}`}
          style={{
            left: `${plat.x - plat.width / 2}%`,
            bottom: `${100 - plat.y}%`,
            width: `${plat.width}%`
          }}
        >
          {idx === JUMP_PLATFORMS.length - 1 ? '🏆' : '🧱'}
        </div>
      ))}

      {/* 进度提示 */}
      <div style={{ position: 'absolute', top: '8px', right: '12px', fontSize: '13px', color: '#8b4513', fontWeight: 700 }}>
        {currentPlatformIdx}/{JUMP_PLATFORMS.length - 1}层
      </div>

      {/* 蓄力条 + 黄金区间 */}
      {charging && (
        <>
          <div className="charge-bar-container">
            {/* 黄金区间标记 */}
            <div
              className="golden-zone"
              style={{
                left: `${goldenZone.start}%`,
                width: `${goldenZone.end - goldenZone.start}%`
              }}
            />
            <div className="charge-bar" style={{ width: `${chargePower}%` }} />
          </div>
          <div className="charge-label">蓄力 {Math.round(chargePower)}% · 停在🟡区间内</div>
        </>
      )}

      {/* 命中反馈 */}
      {lastJumpHit && !charging && (
        <div className={`hit-feedback hit-${lastJumpHit}`}>
          {lastJumpHit === 'perfect' && '✨ PERFECT! +15'}
          {lastJumpHit === 'good' && '👍 GOOD'}
          {lastJumpHit === 'miss' && '😵 MISS!'}
        </div>
      )}

      {/* 玩家 */}
      <div
        className="jump-player"
        style={{ left: `${playerX}%`, bottom: `${100 - playerY}%` }}
      >
        🧑‍💼
      </div>

      {/* 提示区 */}
      <div className="jump-instructions">
        {fallen ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div className="game-over-text">掉落了！😅</div>
            <button
              className="btn btn-primary"
              style={{ fontSize: '13px', padding: '6px 16px' }}
              onClick={(e) => { e.stopPropagation(); doRestart(); }}
            >
              🔄 重新来过
            </button>
          </div>
        ) : topped ? (
          <div style={{ color: '#c0905a', fontWeight: 700 }}>🎉 登顶！已满分！</div>
        ) : (
          <div style={{ fontSize: '12px', color: '#888' }}>长按蓄力，松手跳跃｜点击方向决定左右</div>
        )}
      </div>
    </div>
  );
};

// 开心消消乐 — 7x7 网格，6 种神主题图案，3 连消除
const LINK_ICONS = ['🪷', '🍑', '🪙', '🌸', '🍀', '⛩️'];
const GRID_ROWS = 7;
const GRID_COLS = 7;

const makeRandomGrid = () => {
  const g = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = [];
    for (let c = 0; c < GRID_COLS; c++) {
      row.push(LINK_ICONS[Math.floor(Math.random() * LINK_ICONS.length)]);
    }
    g.push(row);
  }
  return g;
};

// 找所有 3 连
const findMatches = (g) => {
  const matched = new Set();
  // 横向
  for (let r = 0; r < GRID_ROWS; r++) {
    let run = 1;
    for (let c = 1; c < GRID_COLS; c++) {
      if (g[r][c] && g[r][c] === g[r][c - 1]) {
        run++;
      } else {
        if (run >= 3) {
          for (let k = 1; k <= run; k++) matched.add(`${r}-${c - k}`);
        }
        run = 1;
      }
    }
    if (run >= 3) {
      for (let k = 1; k <= run; k++) matched.add(`${r}-${GRID_COLS - k}`);
    }
  }
  // 纵向
  for (let c = 0; c < GRID_COLS; c++) {
    let run = 1;
    for (let r = 1; r < GRID_ROWS; r++) {
      if (g[r][c] && g[r][c] === g[r - 1][c]) {
        run++;
      } else {
        if (run >= 3) {
          for (let k = 1; k <= run; k++) matched.add(`${r - k}-${c}`);
        }
        run = 1;
      }
    }
    if (run >= 3) {
      for (let k = 1; k <= run; k++) matched.add(`${GRID_ROWS - k}-${c}`);
    }
  }
  return matched;
};

// 把 matched 标记的格子去掉，上方掉下来
const collapse = (g) => {
  const next = g.map(row => [...row]);
  for (let c = 0; c < GRID_COLS; c++) {
    let writeR = GRID_ROWS - 1;
    for (let r = GRID_ROWS - 1; r >= 0; r--) {
      if (next[r][c]) {
        next[writeR][c] = next[r][c];
        writeR--;
      }
    }
    for (let r = writeR; r >= 0; r--) {
      next[r][c] = LINK_ICONS[Math.floor(Math.random() * LINK_ICONS.length)];
    }
  }
  return next;
};

const LinkGame = ({ score, setScore, gameEnded, onEarlyWin }) => {
  const [grid, setGrid] = useState(() => {
    // 初始无 3 连
    let g = makeRandomGrid();
    let safety = 0;
    while (findMatches(g).size > 0 && safety < 20) {
      g = makeRandomGrid();
      safety++;
    }
    return g;
  });
  const [selected, setSelected] = useState(null);
  const [combo, setCombo] = useState(0);
  const [animFlash, setAnimFlash] = useState(null);
  const [eliminatedTotal, setEliminatedTotal] = useState(0);
  const TARGET = 40;

  const isAdjacent = (a, b) =>
    (a.r === b.r && Math.abs(a.c - b.c) === 1) ||
    (a.c === b.c && Math.abs(a.r - b.r) === 1);

  // 触发 / 连锁消除
  const processMatches = (g, comboCount = 1) => {
    const matches = findMatches(g);
    if (matches.size === 0) {
      setCombo(0);
      return;
    }
    setAnimFlash(matches);
    haptic.medium();
    // 计分（连锁 × 2 × 3 …）
    const gain = matches.size * 10 * comboCount;
    setScore(s => s + gain);
    setEliminatedTotal(t => {
      const nt = t + matches.size;
      if (nt >= TARGET && onEarlyWin) setTimeout(onEarlyWin, 600);
      return nt;
    });
    setCombo(comboCount);

    // 200ms 后掉落 + 重新检测
    setTimeout(() => {
      const cleared = g.map((row, r) => row.map((cell, c) => matches.has(`${r}-${c}`) ? null : cell));
      const collapsed = collapse(cleared);
      setGrid(collapsed);
      setAnimFlash(null);
      // 递归连锁
      setTimeout(() => processMatches(collapsed, comboCount + 1), 200);
    }, 300);
  };

  const handleCellClick = (r, c) => {
    if (gameEnded || animFlash) return;
    haptic.light();
    if (!selected) {
      setSelected({ r, c });
      return;
    }
    if (selected.r === r && selected.c === c) {
      setSelected(null);
      return;
    }
    if (!isAdjacent(selected, { r, c })) {
      setSelected({ r, c });
      return;
    }
    // 交换试试
    const newGrid = grid.map(row => [...row]);
    [newGrid[selected.r][selected.c], newGrid[r][c]] = [newGrid[r][c], newGrid[selected.r][selected.c]];
    if (findMatches(newGrid).size === 0) {
      // 无效交换，回弹
      haptic.error();
      setSelected(null);
      return;
    }
    setGrid(newGrid);
    setSelected(null);
    setTimeout(() => processMatches(newGrid, 1), 100);
  };

  return (
    <div className="game-area xiaoxiaole-area">
      <div className="xiaoxiao-header">
        <div>已消 {eliminatedTotal}/{TARGET}</div>
        {combo > 1 && <div className="combo-tag">COMBO ×{combo} 🔥</div>}
      </div>
      <div className="xiaoxiao-grid">
        {grid.map((row, r) => row.map((cell, c) => {
          const isSel = selected && selected.r === r && selected.c === c;
          const isFlash = animFlash && animFlash.has(`${r}-${c}`);
          return (
            <button
              key={`${r}-${c}`}
              className={`xx-cell ${isSel ? 'sel' : ''} ${isFlash ? 'flash' : ''}`}
              onClick={() => handleCellClick(r, c)}
              style={{ touchAction: 'manipulation' }}
            >
              {cell}
            </button>
          );
        }))}
      </div>
      <div style={{ textAlign: 'center', fontSize: 11, color: '#888', marginTop: 8 }}>
        点击两个相邻格子交换，3 连成消除
      </div>
    </div>
  );
};

const QUIZ_BANK = [
  // 古风神话类
  { q: '灶王爷每年腊月几日上天汇报？', a: '腊月二十三', options: ['腊月二十三', '腊月初八', '正月初一'] },
  { q: '月老的红线绑的是凡人的哪个部位？', a: '脚踝', options: ['脚踝', '手腕', '小指'] },
  { q: '"小神"在天庭一般是几品官？', a: '九品', options: ['九品', '一品', '没有品级'] },
  { q: '城隍庙主要管理什么？', a: '阴阳两界户籍', options: ['阴阳两界户籍', '凡人婚姻', '财运分配'] },
  { q: '土地公属于哪个级别的神？', a: '基层神', options: ['基层神', '中央神', '上仙'] },
  { q: '财神爷比干没有什么？', a: '心', options: ['心', '钱', '坐骑'] },
  // 职场打工人
  { q: '"PUA" 是什么意思？', a: '精神操控', options: ['精神操控', '一种舞蹈', '考试制度'] },
  { q: '"996" 中的 6 指什么？', a: '一周工作6天', options: ['一周工作6天', '工作6小时', '6份工作'] },
  { q: '凡人最讨厌微信收到哪条消息？', a: '在吗', options: ['在吗', '生日快乐', '红包来了'] },
  { q: '北漂凡人最怕老板说什么？', a: '辛苦了大家', options: ['辛苦了大家', '今天发工资', '可以下班了'] },
  { q: 'KPI 没完成会被？', a: '约谈', options: ['约谈', '升职', '发奖金'] },
  // 网络梗
  { q: '"塌房" 是什么意思？', a: '偶像人设崩塌', options: ['偶像人设崩塌', '装修事故', '楼盘暴雷'] },
  { q: '"emo" 表示什么状态？', a: '低落', options: ['低落', '兴奋', '吃饱了'] },
  { q: '"i人" 中的 i 是什么？', a: '内向', options: ['内向', '聪明', '互联网'] },
  { q: '"yyds" 全称是？', a: '永远的神', options: ['永远的神', '原因得失', '永远单身'] },
  // 生活常识
  { q: '"双十一" 这个购物节是哪天？', a: '11月11日', options: ['11月11日', '10月1日', '12月31日'] },
  { q: '螺蛳粉的灵魂是什么？', a: '酸笋', options: ['酸笋', '螺蛳', '辣椒'] },
  { q: '点外卖看到"已送达"但没收到，第一反应？', a: '查监控', options: ['查监控', '再点一份', '算了'] },
  // 恶搞类
  { q: '神仙考勤打卡用什么工具？', a: '神识感应', options: ['神识感应', '指纹', '钉钉'] },
  { q: '玉帝的微信头像最可能是？', a: '云彩', options: ['云彩', '自拍', '宠物'] }
];

const QuizGame = ({ score, setScore, gameEnded, onEarlyWin }) => {
  const [questions] = useState(() => {
    // 随机抽 6 题
    return [...QUIZ_BANK].sort(() => Math.random() - 0.5).slice(0, 6).map(item => ({
      q: item.q,
      a: item.a,
      // 选项也打乱顺序
      options: [...item.options].sort(() => Math.random() - 0.5)
    }));
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (answer) => {
    if (answered || gameEnded) return;
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === questions[currentQ].a) {
      setScore(prev => prev + 25);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        // 答完所有题，提前通关
        if (onEarlyWin) onEarlyWin();
      }
    }, 1000);
  };

  return (
    <div className="game-area quiz-area">
      <div className="quiz-progress">
        {questions.map((_, idx) => (
          <div key={idx} className={`progress-dot ${idx < currentQ ? 'done' : idx === currentQ ? 'active' : ''}`} />
        ))}
      </div>
      <div className="quiz-question">
        <p>{questions[currentQ]?.q}</p>
      </div>
      <div className="quiz-options">
        {questions[currentQ]?.options.map((opt, idx) => (
          <button
            key={idx}
            className={`quiz-option ${selectedAnswer === opt ? (opt === questions[currentQ].a ? 'correct' : 'wrong') : ''}`}
            onClick={() => handleAnswer(opt)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// 功德点灯 — 节奏游戏：莲花灯按顺序亮起，玩家依次点击
const LightLampGame = ({ score, setScore, gameEnded, onEarlyWin }) => {
  const [sequence, setSequence] = useState([]);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [showing, setShowing] = useState(false);
  const [showingIdx, setShowingIdx] = useState(-1);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'good' | 'miss'
  const TOTAL_ROUNDS = 8;

  const generateNext = () => {
    setSequence(prev => [...prev, Math.floor(Math.random() * 6)]);
    setPlayerIdx(0);
    setRound(r => r + 1);
  };

  // 初始：先生成一个起始序列
  useEffect(() => {
    if (gameEnded) return;
    setSequence([Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)]);
    setRound(1);
  }, [gameEnded]);

  // 展示序列
  useEffect(() => {
    if (sequence.length === 0 || gameEnded) return;
    setShowing(true);
    setShowingIdx(-1);
    let i = 0;
    const showTimer = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(showTimer);
        setShowing(false);
        setShowingIdx(-1);
        setPlayerIdx(0);
        return;
      }
      setShowingIdx(sequence[i]);
      i++;
      setTimeout(() => setShowingIdx(-1), 350);
    }, 600);
    return () => clearInterval(showTimer);
  }, [sequence.length, gameEnded]);

  const handleLamp = (i) => {
    if (showing || gameEnded || feedback) return;
    if (i === sequence[playerIdx]) {
      haptic.light();
      if (playerIdx + 1 >= sequence.length) {
        // 本轮通关
        haptic.medium();
        setFeedback('good');
        setScore(s => s + 15 + round * 2);
        setTimeout(() => {
          setFeedback(null);
          if (round >= TOTAL_ROUNDS) {
            if (onEarlyWin) onEarlyWin();
          } else {
            generateNext();
          }
        }, 500);
      } else {
        setPlayerIdx(p => p + 1);
      }
    } else {
      haptic.error();
      setFeedback('miss');
      setScore(s => Math.max(0, s - 8));
      setTimeout(() => {
        setFeedback(null);
        // 重置本轮
        setPlayerIdx(0);
      }, 700);
    }
  };

  return (
    <div className="game-area lamp-area">
      <div style={{ textAlign: 'center', color: '#8b4513', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
        第 {round} / {TOTAL_ROUNDS} 轮
      </div>
      <div style={{ textAlign: 'center', color: '#888', fontSize: 12, marginBottom: 16 }}>
        {showing ? '看好顺序…' : feedback === 'good' ? '🎉 太棒了！' : feedback === 'miss' ? '😢 顺序错了' : `按顺序点亮 ${sequence.length} 盏灯`}
      </div>
      <div className="lamp-grid">
        {[0, 1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            className={`lamp ${showingIdx === i ? 'lit' : ''} ${feedback === 'miss' ? 'shake' : ''}`}
            onClick={() => handleLamp(i)}
            disabled={showing}
          >
            🪷
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 16, color: '#666', fontSize: 12 }}>
        进度：{playerIdx} / {sequence.length}
      </div>
    </div>
  );
};

const GameResult = ({ score, onComplete }) => {
  const grade = score >= 60 ? '🎉' : score >= 40 ? '👍' : '😅';
  const message = score >= 60 ? '太棒了！' : score >= 40 ? '还不错！' : '继续加油！';

  return (
    <div className="game-result-overlay">
      <div className="game-result-card card animate-slide-in">
        <div className="result-emoji">{grade}</div>
        <h3>{message}</h3>
        <div className="final-score">
          <span>最终得分</span>
          <span className="score">{score}分</span>
        </div>
        <p className="result-hint">
          {score >= 50 ? '成功率大幅提升！' : '有进步空间哦～'}
        </p>
        <button className="btn btn-primary" onClick={onComplete}>
          查看结果
        </button>
      </div>
    </div>
  );
};

export default MiniGameScreen;
