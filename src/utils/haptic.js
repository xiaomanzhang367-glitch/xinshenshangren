// 触觉反馈工具：开关仅作用于当前会话，不写入设备存储。
let enabled = true;

const isEnabled = () => {
  if (typeof navigator === 'undefined') return false;
  return enabled && 'vibrate' in navigator;
};

const safeVibrate = (pattern) => {
  if (!isEnabled()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // 平台不支持时静默忽略。
  }
};

const shake = (intensity = 'medium') => {
  if (typeof document === 'undefined') return;
  const cls = `screen-shake-${intensity}`;
  const body = document.body;
  body.classList.add(cls);
  setTimeout(() => body.classList.remove(cls), intensity === 'heavy' ? 600 : 400);
};

export const haptic = {
  shake: (intensity = 'medium') => shake(intensity),
  light: () => safeVibrate(20),
  medium: () => safeVibrate(50),
  heavy: () => safeVibrate(100),
  error: () => safeVibrate([80, 60, 80]),
  success: () => safeVibrate([40, 30, 80]),
  spooky: () => safeVibrate([50, 40, 50, 40, 100]),
  page: () => safeVibrate(15),
  levelup: () => safeVibrate([60, 40, 60, 40, 120]),
  setEnabled: (value) => { enabled = Boolean(value); },
  isEnabled,
  isSupported: () => typeof navigator !== 'undefined' && 'vibrate' in navigator
};

export default haptic;
