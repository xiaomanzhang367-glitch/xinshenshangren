// 存档系统 - localStorage 防抖写入 + 读取
const SAVE_KEY = 'xinshenshangren_save_v1';
const SAVE_TIME_KEY = 'xinshenshangren_save_time_v1';

let writeTimer = null;

export const saveGame = (state) => {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    try {
      // 只存可序列化的、必要的字段
      const data = {
        phase: state.phase,
        incense: state.incense,
        power: state.power,
        maxPower: state.maxPower,
        characters: state.characters,
        gods: state.gods,
        wishes: state.wishes,
        processedWishes: state.processedWishes,
        moments: state.moments,
        godMessages: state.godMessages,
        godMessagesQueue: state.godMessagesQueue,
        groupMessages: state.groupMessages,
        groupUnreadCount: state.groupUnreadCount,
        unreadCount: state.unreadCount,
        godFriendship: state.godFriendship,
        divineAttributes: state.divineAttributes,
        divineTitle: state.divineTitle,
        totalScore: state.totalScore,
        wishesProcessed: state.wishesProcessed,
        godName: state.godName,
        day: state.day,
        maxDays: state.maxDays
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      localStorage.setItem(SAVE_TIME_KEY, new Date().toLocaleString());
    } catch (e) {
      console.warn('保存失败', e);
    }
  }, 1500);
};

export const loadGame = () => {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const getSaveInfo = () => {
  const saved = loadGame();
  if (!saved) return null;
  return {
    godName: saved.godName || '小神',
    day: saved.day || 1,
    incense: saved.incense || 0,
    power: saved.power || 0,
    totalScore: saved.totalScore || 0,
    savedAt: localStorage.getItem(SAVE_TIME_KEY) || '未知时间'
  };
};

export const clearSave = () => {
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem(SAVE_TIME_KEY);
};

export const hasSave = () => {
  return !!localStorage.getItem(SAVE_KEY);
};
