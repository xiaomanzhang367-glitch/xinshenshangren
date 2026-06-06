import React, { useState, useEffect, useRef } from 'react';
import haptic from '../utils/haptic';
import './PrologueScreen.css';

// 序章剧情 - "天庭录用通知" 信纸风
const SCRIPT = [
  { speaker: '', text: '叮——', sub: '一只信使白鹤掠过云端，丢下一卷烫金圣旨。', emoji: '🕊️' },
  { speaker: '📜 天庭人力资源部', text: '圣 旨', sub: '兹有凡间青年 {name}，资质过关、人品端正、政审通过。', emoji: '📜' },
  { speaker: '📜 天庭人力资源部', text: '即日上任试用神明，岗位：神庙运营。', sub: '试用期七天，业绩合格者转正万神殿编制。', emoji: '⛩️' },
  { speaker: '🏠 土地公', text: '哎呀，新来的{name}！', sub: '我是隔壁工位的土地公，欢迎欢迎。', emoji: '🏠' },
  { speaker: '🏠 土地公', text: '你这庙啊，香火不算多，但人间烟火气十足。', sub: '加油干，回头我请你喝桂花酿。', emoji: '🍶' },
  { speaker: '💰 财神', text: '{name}小神，财神看好你。', sub: '香火的事，问我准没错。', emoji: '💰' },
  { speaker: '🔥 灶王爷', text: '试用期间食堂搭伙，免费。', sub: '我做的红烧肉，神仙吃了都加香火。', emoji: '🥢' },
  { speaker: '', text: '那么，{name}小神。', sub: '请赐下您的神号——', emoji: '✨', isInput: true },
];

const PrologueScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [revealLen, setRevealLen] = useState(0);
  const [revealSubLen, setRevealSubLen] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);
  const [godName, setGodName] = useState('');
  const [seal, setSeal] = useState(false);
  const printRef = useRef({ active: null });

  const currentLine = SCRIPT[step];
  const isLast = step === SCRIPT.length - 1;

  const tempName = godName.trim() || '小神';
  const fullText = currentLine.text.replace(/\{name\}/g, tempName);
  const fullSub = (currentLine.sub || '').replace(/\{name\}/g, tempName);

  // 字迹"渐显"效果（不是打字机）— 逐字 reveal + 印章动效
  useEffect(() => {
    setRevealLen(0);
    setRevealSubLen(0);
    setDoneTyping(false);
    setSeal(false);

    if (printRef.current.active) clearTimeout(printRef.current.active);

    let i = 0;
    const tickMain = () => {
      i++;
      setRevealLen(i);
      if (i < fullText.length) {
        printRef.current.active = setTimeout(tickMain, 90);
      } else {
        // 主标题打完，开始副标题
        let j = 0;
        const tickSub = () => {
          j++;
          setRevealSubLen(j);
          if (j < fullSub.length) {
            printRef.current.active = setTimeout(tickSub, 45);
          } else {
            setDoneTyping(true);
            // 第2/3屏（圣旨内容）显示印章
            if (step === 1 || step === 2) {
              setTimeout(() => { setSeal(true); haptic.heavy(); }, 200);
            } else {
              haptic.light();
            }
          }
        };
        printRef.current.active = setTimeout(tickSub, 200);
      }
    };
    printRef.current.active = setTimeout(tickMain, 100);

    return () => clearTimeout(printRef.current.active);
  }, [step, fullText, fullSub]);

  const next = () => {
    if (!doneTyping) {
      // 跳过打印动画
      setRevealLen(fullText.length);
      setRevealSubLen(fullSub.length);
      setDoneTyping(true);
      if (printRef.current.active) clearTimeout(printRef.current.active);
      return;
    }
    if (step < SCRIPT.length - 1) {
      haptic.page();
      setStep(s => s + 1);
    }
  };

  const handleStart = () => {
    haptic.success();
    onComplete(godName.trim() || '小神');
  };

  return (
    <div
      className="prologue-screen-paper"
      onClick={isLast ? undefined : next}
    >
      {/* 信纸 */}
      <div className="paper-scroll">
        {/* 顶部装饰 */}
        <div className="scroll-decor top">
          <span className="cloud-decor">☁</span>
          <span className="cloud-decor">⛩️</span>
          <span className="cloud-decor">☁</span>
        </div>

        {/* 大 emoji */}
        <div className="prologue-big-emoji" key={`emoji-${step}`}>
          {currentLine.emoji}
        </div>

        {/* 说话人 */}
        {currentLine.speaker && doneTyping && (
          <div className="paper-speaker">{currentLine.speaker}</div>
        )}

        {/* 主标题 - 字迹渐显 */}
        <div className="paper-title">
          {fullText.split('').map((ch, i) => (
            <span
              key={i}
              className={`char ${i < revealLen ? 'show' : ''}`}
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* 副标题 */}
        <div className="paper-sub">
          {fullSub.split('').map((ch, i) => (
            <span
              key={i}
              className={`char-sub ${i < revealSubLen ? 'show' : ''}`}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* 朱红印章（圣旨页才显示） */}
        {seal && (
          <div className="vermilion-seal">
            <div className="seal-inner">
              <div>天</div>
              <div>庭</div>
              <div>认</div>
              <div>证</div>
            </div>
          </div>
        )}

        {/* 输入神号 */}
        {isLast && doneTyping && (
          <div
            className="paper-name-input"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              maxLength={6}
              placeholder="例：长安君 / 小招财"
              value={godName}
              onChange={(e) => setGodName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              autoFocus
            />
            <div className="name-hint-paper">不填则默认为「小神」</div>
            <button className="paper-go-btn" onClick={(e) => { e.stopPropagation(); handleStart(); }}>
              ⛩️ 开 门 接 客
            </button>
          </div>
        )}

        {!isLast && doneTyping && (
          <div className="paper-next-hint">点击信纸继续 →</div>
        )}

        {/* 底部装饰 */}
        <div className="scroll-decor bot">
          <span>—— ✦ 天庭出品 · 必属精品 ✦ ——</span>
        </div>
      </div>

      {/* 进度点 */}
      <div className="prologue-progress-paper">
        {SCRIPT.map((_, i) => (
          <span key={i} className={`prog-dot ${i <= step ? 'on' : ''}`} />
        ))}
      </div>

      <button className="prologue-skip-paper" onClick={() => onComplete('小神')}>
        跳过 »
      </button>
    </div>
  );
};

export default PrologueScreen;
