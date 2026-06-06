import React, { useState, useEffect, useRef } from 'react';
import './PrologueScreen.css';

// 序章剧情 - "天庭录用通知"
const SCRIPT = [
  { bg: '#000', text: '"叮——"', speaker: '', sub: '你的手机响了。' },
  { bg: '#1a1a2e', text: '一封烫金大字的快递单从云端飘下。', speaker: '', sub: '寄件人：天庭人力资源部' },
  { bg: '#2d1b4e', text: '本届毕业生 {name}：', speaker: '📜 天庭 HR', sub: '经多轮笔试、面试、生死簿审核、祖宗八代政审通过——' },
  { bg: '#2d1b4e', text: '您已被录用为试用期小神，岗位：神庙运营。', speaker: '📜 天庭 HR', sub: '请于今日上任，谢绝拒绝。' },
  { bg: '#3a2a5e', text: '哎呀！新来的！', speaker: '🏠 土地公', sub: '我是你隔壁工位的土地公。' },
  { bg: '#3a2a5e', text: '你这庙啊，香火不算多，但人间烟火气十足。', speaker: '🏠 土地公', sub: '加油干，回头我请你喝桂花酿。' },
  { bg: '#4a2a3e', text: '欢迎欢迎，新人。', speaker: '💰 财神', sub: '试用期 7 天，凭你接待凡人愿望的表现转正。' },
  { bg: '#4a2a3e', text: '转正后 → 万神殿编制，五险一金外加一炉香火。', speaker: '💰 财神', sub: '干得好可以早日上市哦。' },
  { bg: '#3e2a4a', text: '试用期间你都在我食堂搭伙。', speaker: '🔥 灶王爷', sub: '我做的红烧肉，神仙吃了都加香火。' },
  { bg: '#3e2a4a', text: '那么，小神。', speaker: '', sub: '请问，您贵姓尊号？' },
];

const PrologueScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [printedText, setPrintedText] = useState('');
  const [printedSub, setPrintedSub] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);
  const [godName, setGodName] = useState('');
  const printRef = useRef({ active: null });

  const currentLine = SCRIPT[step];
  const isLast = step === SCRIPT.length - 1;

  // 逐字打印
  useEffect(() => {
    if (!currentLine) return;
    setPrintedText('');
    setPrintedSub('');
    setDoneTyping(false);

    const text = currentLine.text.replace('{name}', godName || '???');
    let i = 0;
    if (printRef.current.active) clearInterval(printRef.current.active);
    printRef.current.active = setInterval(() => {
      i++;
      setPrintedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(printRef.current.active);
        // 副标题接着打
        let j = 0;
        const sub = currentLine.sub || '';
        printRef.current.active = setInterval(() => {
          j++;
          setPrintedSub(sub.slice(0, j));
          if (j >= sub.length) {
            clearInterval(printRef.current.active);
            setDoneTyping(true);
          }
        }, 35);
      }
    }, 55);
    return () => clearInterval(printRef.current.active);
  }, [step, godName]);

  const next = () => {
    if (!doneTyping) {
      // 跳过打印动画，直接显示完整
      const text = currentLine.text.replace('{name}', godName || '???');
      setPrintedText(text);
      setPrintedSub(currentLine.sub || '');
      setDoneTyping(true);
      if (printRef.current.active) clearInterval(printRef.current.active);
      return;
    }
    if (step < SCRIPT.length - 1) {
      setStep(s => s + 1);
    }
  };

  const handleStart = () => {
    onComplete(godName.trim() || '小神');
  };

  return (
    <div
      className="prologue-screen"
      style={{ background: currentLine.bg }}
      onClick={!isLast ? next : undefined}
    >
      {/* 进度点 */}
      <div className="prologue-progress">
        {SCRIPT.map((_, i) => (
          <span key={i} className={`prog-dot ${i <= step ? 'on' : ''}`} />
        ))}
      </div>

      <div className="prologue-content">
        {currentLine.speaker && (
          <div className="prologue-speaker">{currentLine.speaker}</div>
        )}

        <div className="prologue-text">{printedText}<span className="cursor">▍</span></div>

        {printedSub && (
          <div className="prologue-sub">{printedSub}</div>
        )}

        {/* 最后一步：输入神号 */}
        {isLast && doneTyping && (
          <div className="prologue-name-input">
            <input
              type="text"
              maxLength={6}
              placeholder="请输入您的神号（最多6字）"
              value={godName}
              onChange={(e) => setGodName(e.target.value)}
              autoFocus
            />
            <div className="name-hint">空着不填将默认为「小神」</div>
            <button className="prologue-go-btn" onClick={handleStart}>
              ⛩️ 开门接客
            </button>
          </div>
        )}

        {!isLast && doneTyping && (
          <div className="prologue-next-hint">
            点击屏幕继续 →
          </div>
        )}
      </div>

      <button className="prologue-skip" onClick={() => onComplete('小神')}>
        跳过序章 »
      </button>
    </div>
  );
};

export default PrologueScreen;
