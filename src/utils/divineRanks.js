// 十六神位 · 梗版
// 按四属性高低（>=50为高）映射 16 种神位
// 顺序：秩序 慈悲 介入 理性

export const DIVINE_RANKS = {
  // 全高
  '1111': {
    emoji: '👑',
    name: '玉帝亲儿子',
    tagline: '上面有人，下面有人，万事通',
    advice: '卷王！转正后必给提名万神殿。',
    bgGradient: 'linear-gradient(135deg, #ffd700, #ff9800)',
    rarity: '稀有',
  },
  // 秩序+慈悲+介入
  '1110': {
    emoji: '🩹',
    name: '创可贴菩萨',
    tagline: '哪里有人哭哪里去，但常忘记自己也会疼',
    advice: '别人的伤都贴好了，自己的还流着血呢，多吃点。',
    bgGradient: 'linear-gradient(135deg, #ffb6c1, #ff7799)',
    rarity: '常见',
  },
  // 秩序+慈悲+理性
  '1101': {
    emoji: '🧘',
    name: '岁月静好神',
    tagline: '我什么都不做，但我祝福你',
    advice: '你的祝福已超额发送 8888 次，请下班。',
    bgGradient: 'linear-gradient(135deg, #b8e6b8, #88c688)',
    rarity: '常见',
  },
  // 秩序+介入+理性
  '1011': {
    emoji: '💼',
    name: 'KPI 大魔王',
    tagline: '上班整顿凡人，下班整顿神仙',
    advice: '本期最佳员工！但希望你下次别让土地公加班到凌晨。',
    bgGradient: 'linear-gradient(135deg, #4a90e2, #1a5dab)',
    rarity: '稀有',
  },
  // 慈悲+介入+理性
  '0111': {
    emoji: '🎓',
    name: '教导主任神',
    tagline: '哎你这样不对，听我说...',
    advice: '凡人都怕你来上香，因为你总要"语重心长"半小时。',
    bgGradient: 'linear-gradient(135deg, #9c7ecc, #6c4ec0)',
    rarity: '常见',
  },
  // 秩序+慈悲
  '1100': {
    emoji: '🪷',
    name: '观音侍童',
    tagline: '慈悲但还在学习，香火给阿姨们的多',
    advice: '老阿姨们都说你乖，可她们也是你最大的客户来源。',
    bgGradient: 'linear-gradient(135deg, #c4a5d8, #a384c8)',
    rarity: '常见',
  },
  // 秩序+介入
  '1010': {
    emoji: '⚔️',
    name: '霸总神',
    tagline: '我管你死活，业绩第一',
    advice: '财神说他要分点提成给你，因为你帮他完成了KPI。',
    bgGradient: 'linear-gradient(135deg, #555, #222)',
    rarity: '常见',
  },
  // 秩序+理性
  '1001': {
    emoji: '🧮',
    name: '抠门户部尚书',
    tagline: '一分一厘都要算，但确实不出错',
    advice: '财神跟你打过 3 次架，最后他承认你算账更精。',
    bgGradient: 'linear-gradient(135deg, #d4a574, #8b6543)',
    rarity: '常见',
  },
  // 慈悲+介入
  '0110': {
    emoji: '🌹',
    name: '舔狗祖师爷',
    tagline: '替凡人舔，自己也很享受',
    advice: '月老说你抢了他生意，但你不收钱，他没办法。',
    bgGradient: 'linear-gradient(135deg, #ff8fab, #d4636f)',
    rarity: '常见',
  },
  // 慈悲+理性
  '0101': {
    emoji: '🥺',
    name: '眼泪汪汪菩萨',
    tagline: '同情每一个人，自己也想哭',
    advice: '土地公在群里发了个抱抱表情，那是给你的。',
    bgGradient: 'linear-gradient(135deg, #b8d4e8, #88a8c4)',
    rarity: '常见',
  },
  // 介入+理性
  '0011': {
    emoji: '💸',
    name: '韭菜大保健',
    tagline: '凡人就该被收割（但还嘴硬说是为你好）',
    advice: '财神看到你眼神放光，说你是他失散多年的儿子。',
    bgGradient: 'linear-gradient(135deg, #71a85a, #4a7838)',
    rarity: '稀有',
  },
  // 仅秩序
  '1000': {
    emoji: '🏮',
    name: '过路神',
    tagline: '谁也不沾，只想下班',
    advice: '你是这一届最准时下班的神。',
    bgGradient: 'linear-gradient(135deg, #b8a888, #807060)',
    rarity: '常见',
  },
  // 仅慈悲
  '0100': {
    emoji: '🐶',
    name: 'emo 神仙',
    tagline: '又又又破防了，香火吃灰',
    advice: '唉…你别哭了…你的香火其实够用的…',
    bgGradient: 'linear-gradient(135deg, #a8a8c4, #6c6c88)',
    rarity: '常见',
  },
  // 仅介入
  '0010': {
    emoji: '🎭',
    name: '戏精神仙',
    tagline: '凡人哭三句我哭五句',
    advice: '月老说你比她还会演，要不要转行做演员神？',
    bgGradient: 'linear-gradient(135deg, #ff7eb9, #ff4a8c)',
    rarity: '常见',
  },
  // 仅理性
  '0001': {
    emoji: '🐟',
    name: '摸鱼真君',
    tagline: '工位常空，但 KPI 总能完成',
    advice: '我们查了你的考勤，迟到22次但KPI满分，可以。',
    bgGradient: 'linear-gradient(135deg, #88c4d4, #5494a4)',
    rarity: '稀有',
  },
  // 全低
  '0000': {
    emoji: '🥱',
    name: '躺平真君',
    tagline: '你叫我我就不来，香火放门口自己拿',
    advice: '你不来上班，凡人居然没投诉，挺神奇。',
    bgGradient: 'linear-gradient(135deg, #888, #444)',
    rarity: '稀有',
  },
};

// 根据四属性算神位 key
export function calcDivineRank(attrs) {
  const { order = 50, mercy = 50, involvement = 50, rational = 50 } = attrs || {};
  const key =
    (order >= 50 ? '1' : '0') +
    (mercy >= 50 ? '1' : '0') +
    (involvement >= 50 ? '1' : '0') +
    (rational >= 50 ? '1' : '0');
  return DIVINE_RANKS[key] || DIVINE_RANKS['0000'];
}

// 神仙寄语（按 totalScore 分级）
export function getDivineEnvoy(score) {
  if (score >= 200) return '本期最佳神明，万神殿向您招手。';
  if (score >= 100) return '勤勤恳恳的一届，凡人都念叨着您。';
  if (score >= 50) return '中规中矩，至少没出大事。';
  return '试用期勉强通过，请下次努力。';
}
