// 触觉反馈工具 - Android 支持，iOS 静默忽略，永不报错
// 全局开关存 localStorage，用户在设置里关闭后所有调用都返回

const STORAGE_KEY = 'haptic_enabled';

const isEnabled = () => {
  if (typeof navigator === 'undefined') return false;
  if (!('vibrate' in navigator)) return false;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === null ? true : v === 'true';
};

const safeVibrate = (pattern) => {
  if (!isEnabled()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch (e) {
    // 静默
  }
};

// 屏幕震动假振动 - 给 body 加震屏 class 短时
const shake = (intensity = 'medium') => {
  const cls = `screen-shake-${intensity}`;
  const body = document.body;
  body.classList.add(cls);
  setTimeout(() => body.classList.remove(cls), intensity === 'heavy' ? 600 : 400);
};

export const haptic = {
  // 屏幕震动 - 任意时机都能调（视觉上的"伪振动"）
  shake: (intensity = 'medium') => shake(intensity),
  // 轻触：UI 点击、翻页、按钮
  light: () => safeVibrate(20),

  // 中等：配对成功、接到东西、答题正确
  medium: () => safeVibrate(50),

  // 强烈：PERFECT 命中、完美通关
  heavy: () => safeVibrate(100),

  // 失败：MISS、答错、跌落
  error: () => safeVibrate([80, 60, 80]),

  // 成功：红包到账、评级 Perfect
  success: () => safeVibrate([40, 30, 80]),

  // 神一阵鬼一阵触发
  spooky: () => safeVibrate([50, 40, 50, 40, 100]),

  // 翻页
  page: () => safeVibrate(15),

  // 升级 / 解锁
  levelup: () => safeVibrate([60, 40, 60, 40, 120]),

  // 控制
  setEnabled: (v) => localStorage.setItem(STORAGE_KEY, v ? 'true' : 'false'),
  isEnabled,
  isSupported: () => typeof navigator !== 'undefined' && 'vibrate' in navigator
};

export default haptic;
