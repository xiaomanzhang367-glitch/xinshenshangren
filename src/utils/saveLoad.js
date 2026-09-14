// 互动空间版不在设备或网络中保存玩家的游戏内容。
// 这些兼容导出保留给旧调用方；所有数据只存在当前 React 会话内。
export const saveGame = () => {};
export const loadGame = () => null;
export const getSaveInfo = () => null;
export const clearSave = () => {};
export const hasSave = () => false;
