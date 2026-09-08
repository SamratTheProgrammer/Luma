// Mobile Haptic Feedback Helper
// Triggers vibration on supported mobile devices (iOS Safari with support & Android Chrome/Webview)

export const triggerHaptic = (type: 'tap' | 'light' | 'spark' | 'super' | 'pass' | 'success' = 'light') => {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return;

  try {
    switch (type) {
      case 'tap':
      case 'light':
        navigator.vibrate(8);
        break;
      case 'spark':
        navigator.vibrate([15, 30, 20]);
        break;
      case 'super':
        navigator.vibrate([25, 40, 30, 50, 40]);
        break;
      case 'pass':
        navigator.vibrate(18);
        break;
      case 'success':
        navigator.vibrate([12, 24, 36]);
        break;
    }
  } catch {
    // Ignore environments where navigator.vibrate is restricted or denied
  }
};
