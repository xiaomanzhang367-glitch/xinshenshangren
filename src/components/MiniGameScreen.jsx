import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { miniGames } from '../data/gameData';
import './MiniGameScreen.css';

const MiniGameScreen = ({ wish, onComplete }) => {
  const { gameState } = useGame();
  const gameType = wish?.gameType || wish?.category || '职场';
  const gameConfig = miniGames[gameType] || miniGames[wish?.category] || miniGames['职场'];
  
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameConfig.duration);
  const [gameEnded, setGameEnded] = useState(false);
  const timerRef = useRef(null);

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
            {gameType === '刮刮乐' && '🎟️'}
            {gameType === '转盘' && '🎡'}
            {gameType === '堆叠' && '📦'}
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
            {gameType === '刮刮乐' && (
              <p>滑动刮开卡片，看看你的运气！</p>
            )}
            {gameType === '转盘' && (
              <p>点击转动转盘，获得随机奖励！</p>
            )}
            {gameType === '堆叠' && (
              <p>点击放置箱子，堆叠到目标高度！</p>
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

  return (
    <div className="mini-game-container">
      <GameHeader timeLeft={timeLeft} score={score} gameType={gameType} />
      {gameType === '接东西' && <CatchGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      {gameType === '配对' && <MatchGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      {gameType === '跳台阶' && <JumpGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      {gameType === '连连看' && <LinkGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      {gameType === '答题' && <QuizGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      {gameType === '刮刮乐' && <ScratchGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      {gameType === '转盘' && <WheelGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      {gameType === '堆叠' && <StackGame score={score} setScore={setScore} gameEnded={gameEnded} />}
      
      {gameEnded && (
        <GameResult score={score} onComplete={handleComplete} />
      )}
    </div>
  );
};

const GameHeader = ({ timeLeft, score, gameType }) => (
  <div className="game-header">
    <div className="time-display">
      <span className="time-icon">⏱️</span>
      <span className="time-value">{timeLeft}s</span>
    </div>
    <div className="score-display">
      <span className="score-icon">
        {gameType === '接东西' && '📚'}
        {gameType === '配对' && '💕'}
        {gameType === '跳台阶' && '�'}
        {gameType === '连连看' && '🔗'}
        {gameType === '答题' && '❓'}
        {gameType === '刮刮乐' && '🎟️'}
        {gameType === '转盘' && '🎡'}
        {gameType === '堆叠' && '�'}
      </span>
      <span className="score-value">{score}分</span>
    </div>
  </div>
);

const CatchGame = ({ score, setScore, gameEnded }) => {
  const [items, setItems] = useState([]);
  const [playerPos, setPlayerPos] = useState(50);
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameEnded) return;

    const dropInterval = setInterval(() => {
      const goodItems = ['📚', '📖', '✏️'];
      const badItems = ['🎮', '📱'];
      const itemPool = Math.random() > 0.4 ? goodItems : badItems;
      const emoji = itemPool[Math.floor(Math.random() * itemPool.length)];
      const isGood = goodItems.includes(emoji);
      
      const newItem = {
        id: Date.now() + Math.random(),
        emoji,
        x: Math.random() * 70 + 15,
        y: 0,
        isGood
      };
      setItems(prev => [...prev, newItem]);
    }, 1200);

    return () => clearInterval(dropInterval);
  }, [gameEnded]);

  useEffect(() => {
    if (gameEnded) return;

    const moveInterval = setInterval(() => {
      setItems(prev => {
        let newScore = 0;
        
        const filtered = prev.map(item => ({
          ...item,
          y: item.y + 2.5
        })).filter(item => {
          if (item.y >= 85) {
            if (item.isGood) {
              newScore -= 3;
            }
            return false;
          }
          
          const playerWidth = 12;
          const itemWidth = 8;
          if (Math.abs(item.x - playerPos) < (playerWidth + itemWidth) / 2 && item.y >= 75 && item.y <= 85) {
            if (item.isGood) {
              newScore += 10;
            } else {
              newScore -= 8;
            }
            return false;
          }
          return true;
        });

        if (newScore !== 0) {
          setScore(s => Math.max(0, s + newScore));
        }
        
        return filtered;
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameEnded, playerPos, setScore]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setPlayerPos(prev => Math.max(10, prev - 6));
      } else if (e.key === 'ArrowRight') {
        setPlayerPos(prev => Math.min(90, prev + 6));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchMove = (e) => {
    const rect = gameRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      setPlayerPos(Math.max(10, Math.min(90, x)));
    }
  };

  return (
    <div className="game-area" ref={gameRef} onTouchMove={handleTouchMove}>
      <div className="falling-items">
        {items.map(item => (
          <div
            key={item.id}
            className={`falling-item ${item.isGood ? 'good' : 'bad'}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: '28px'
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
      <div 
        className="player catcher"
        style={{ left: `${playerPos}%` }}
      >
        👨‍🎓
      </div>
    </div>
  );
};

const MatchGame = ({ score, setScore, gameEnded }) => {
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
        setMatchedPairs(prev => prev + 1);
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

const JumpGame = ({ score, setScore, gameEnded }) => {
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
    } else if (power >= zone.start - 8 && power <= zone.end + 8) {
      hitType = 'good';
    } else {
      hitType = 'miss';
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

  const getPctX = (e) => {
    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return undefined;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return ((clientX - rect.left) / rect.width) * 100;
  };

  const { playerX, playerY, currentPlatformIdx, chargePower, charging, fallen, topped, goldenZone, lastJumpHit } = renderState;

  return (
    <div
      className="game-area jump-area"
      ref={gameAreaRef}
      onMouseDown={(e) => { stateRef.current.tapX = getPctX(e); doStartCharge(); }}
      onMouseUp={(e) => doReleaseJump(getPctX(e))}
      onMouseLeave={() => { if (stateRef.current.charging) doReleaseJump(undefined); }}
      onTouchStart={(e) => { e.preventDefault(); stateRef.current.tapX = getPctX(e); doStartCharge(); }}
      onTouchEnd={(e) => { e.preventDefault(); doReleaseJump(getPctX(e)); }}
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

const LinkGame = ({ score, setScore, gameEnded }) => {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (gameEnded) return;
    
    const emojis = ['🌸', '🌺', '🌻', '🌹', '🌷', '🌼', '💐', '🌵'];
    const pairs = [...emojis, ...emojis];
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    
    const newBoard = [];
    for (let i = 0; i < 4; i++) {
      newBoard.push(shuffled.slice(i * 4, (i + 1) * 4));
    }
    setBoard(newBoard);
    setSelected([]);
    setMatched([]);
  }, [gameEnded]);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (board[first.row][first.col] === board[second.row][second.col]) {
        setMatched(prev => [...prev, `${first.row}-${first.col}`, `${second.row}-${second.col}`]);
        setScore(prev => prev + 30);
      }
      setTimeout(() => setSelected([]), 300);
    }
  }, [selected, board]);

  const canLink = (r1, c1, r2, c2) => {
    if (r1 === r2 && c1 === c2) return false;
    if (board[r1][c1] !== board[r2][c2]) return false;
    if (matched.includes(`${r1}-${c1}`) || matched.includes(`${r2}-${c2}`)) return false;
    return true;
  };

  const handleClick = (row, col) => {
    if (gameEnded) return;
    if (selected.length >= 2) return;
    if (matched.includes(`${row}-${col}`)) return;
    
    if (selected.length === 1) {
      const [prev] = selected;
      if (canLink(prev.row, prev.col, row, col)) {
        setSelected([prev, { row, col }]);
      } else {
        setSelected([{ row, col }]);
      }
    } else {
      setSelected([{ row, col }]);
    }
  };

  return (
    <div className="game-area link-area">
      <div className="link-board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="link-row">
            {row.map((cell, colIdx) => {
              const isSelected = selected.some(s => s.row === rowIdx && s.col === colIdx);
              const isMatched = matched.includes(`${rowIdx}-${colIdx}`);
              return (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  className={`link-cell ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
                  onClick={() => handleClick(rowIdx, colIdx)}
                >
                  {!isMatched && cell}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="link-status">
        <span>已消除: {matched.length / 2}/8</span>
      </div>
    </div>
  );
};

const QuizGame = ({ score, setScore, gameEnded }) => {
  const [questions] = useState([
    { q: '一年有几个季节？', a: '4', options: ['4', '2', '3'] },
    { q: '水的化学式是？', a: 'H2O', options: ['H2O', 'CO2', 'O2'] },
    { q: '地球是圆的吗？', a: '是', options: ['是', '不是', '不知道'] },
    { q: '太阳从哪边升起？', a: '东边', options: ['东边', '西边', '北边'] },
    { q: '1+1等于几？', a: '2', options: ['2', '3', '1'] },
    { q: '人类有几只手？', a: '2', options: ['2', '1', '3'] }
  ]);
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
      }
      setSelectedAnswer(null);
      setAnswered(false);
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

const ScratchGame = ({ score, setScore, gameEnded }) => {
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState(null);

  useEffect(() => {
    if (gameEnded) return;
    const prizes = [
      { emoji: '⭐', points: 50 },
      { emoji: '🌟', points: 40 },
      { emoji: '✨', points: 30 },
      { emoji: '💫', points: 25 },
      { emoji: '⭐', points: 20 },
      { emoji: '🌟', points: 15 },
      { emoji: '✨', points: 10 },
      { emoji: '💫', points: 5 }
    ];
    setPrize(prizes[Math.floor(Math.random() * prizes.length)]);
    setRevealed(false);
  }, [gameEnded]);

  const handleScratch = () => {
    if (revealed || gameEnded) return;
    setRevealed(true);
    setScore(prev => prev + prize.points);
  };

  return (
    <div className="game-area scratch-area">
      <div className="scratch-card" onClick={handleScratch}>
        <div className="scratch-content">
          {revealed ? (
            <div className="prize-reveal">
              <span className="prize-emoji">{prize?.emoji}</span>
              <span className="prize-text">+{prize?.points}分</span>
            </div>
          ) : (
            <div className="scratch-cover">
              <span>👆 点击刮开</span>
            </div>
          )}
        </div>
      </div>
      <div className="scratch-hint">
        {revealed ? '恭喜获得奖励！' : '点击卡片刮开看看运气！'}
      </div>
    </div>
  );
};

const WheelGame = ({ score, setScore, gameEnded }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const segments = [
    { emoji: '🎁', points: 50 },
    { emoji: '🎈', points: 10 },
    { emoji: '🎁', points: 30 },
    { emoji: '🎉', points: 20 },
    { emoji: '🎁', points: 40 },
    { emoji: '🎈', points: 15 },
    { emoji: '🎁', points: 25 },
    { emoji: '🎉', points: 35 }
  ];

  const spin = () => {
    if (spinning || gameEnded) return;
    setSpinning(true);
    
    const spinDuration = 3000;
    const rotations = 3 + Math.random() * 2;
    const finalAngle = (rotations * 360) + (Math.random() * 360);
    
    setTimeout(() => {
      const idx = Math.floor((finalAngle % 360) / (360 / segments.length));
      const prize = segments[idx];
      setResult(prize);
      setScore(prev => prev + prize.points);
      setSpinning(false);
    }, spinDuration);
  };

  return (
    <div className="game-area wheel-area">
      <div className={`wheel-container ${spinning ? 'spinning' : ''}`}>
        <div className="wheel" style={{ 
          transform: spinning ? `rotate(${360 * 5}deg)` : 'rotate(0deg)',
          transition: spinning ? 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
        }}>
          {segments.map((seg, idx) => (
            <div 
              key={idx} 
              className="wheel-segment"
              style={{ transform: `rotate(${idx * 45}deg)` }}
            >
              {seg.emoji}
            </div>
          ))}
        </div>
        <div className="wheel-pointer">▲</div>
      </div>
      <button className="spin-btn" onClick={spin} disabled={spinning}>
        {spinning ? '转动中...' : '🎡 转动转盘'}
      </button>
      {result && !spinning && (
        <div className="wheel-result">
          {result.emoji} 获得 {result.points} 分！
        </div>
      )}
    </div>
  );
};

const StackGame = ({ score, setScore, gameEnded }) => {
  const [boxes, setBoxes] = useState([]);
  const [targetHeight] = useState(8);
  const [nextX, setNextX] = useState(50);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameEnded) return;
    setBoxes([]);
    setNextX(50);
    setGameOver(false);
  }, [gameEnded]);

  const addBox = () => {
    if (gameOver || gameEnded) return;
    
    const newBox = {
      id: Date.now(),
      x: nextX,
      width: 20 + Math.random() * 10
    };
    
    if (boxes.length > 0) {
      const lastBox = boxes[boxes.length - 1];
      const overlap = Math.max(0, Math.min(lastBox.width, newBox.width) - Math.abs(newBox.x - lastBox.x));
      
      if (overlap < 5) {
        setGameOver(true);
        return;
      }
      
      newBox.width = overlap;
      newBox.x = newBox.x < lastBox.x ? lastBox.x : lastBox.x + lastBox.width - overlap;
    }
    
    setBoxes(prev => [...prev, newBox]);
    setNextX(20 + Math.random() * 60);
    setScore(prev => prev + 10);
  };

  return (
    <div className="game-area stack-area">
      <div className="stack-target">
        <span>目标: {targetHeight}层</span>
      </div>
      <div className="stack-platform">
        <div 
          className="base-platform"
          style={{ left: '25%', width: '50%' }}
        >
          🧱
        </div>
        {boxes.map((box, idx) => (
          <div
            key={box.id}
            className="stack-box"
            style={{ 
              left: `${box.x - box.width / 2}%`, 
              width: `${box.width}%`,
              bottom: `${idx * 6}%`
            }}
          >
            📦
          </div>
        ))}
      </div>
      <div className="stack-controls">
        <button className="stack-btn" onClick={addBox} disabled={gameOver || boxes.length >= targetHeight}>
          {gameOver ? '游戏结束' : boxes.length >= targetHeight ? '🎉 完成！' : '⬇️ 放置箱子'}
        </button>
      </div>
      <div className="stack-progress">
        <span>进度: {boxes.length}/{targetHeight}</span>
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
