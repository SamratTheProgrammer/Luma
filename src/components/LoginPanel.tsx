import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import confetti from 'canvas-confetti';

interface LoginPanelProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
  onCreateSuccess: (user: { name: string; email: string }) => void;
}

export const LoginPanel: React.FC<LoginPanelProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
  onCreateSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [intent, setIntent] = useState('Slow Dating & Deep Resonance');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync mode if initialMode changes
  React.useEffect(() => {
    setMode(initialMode);
    setErrorMsg(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleDemoFill = () => {
    triggerHaptic('tap');
    setEmail('alex.morgan@design.studio');
    setPassword('lumaResonance2026');
    setName('Alex Morgan');
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (mode === 'signup' && !name.trim()) {
      setErrorMsg('Please enter your full name');
      triggerHaptic('pass');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      triggerHaptic('pass');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      triggerHaptic('pass');
      return;
    }

    setIsLoading(true);
    triggerHaptic('tap');

    setTimeout(() => {
      setIsLoading(false);
      triggerHaptic('super');

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5e62', '#ffb599', '#d4bbff', '#ffffff']
      });

      const userProfile = {
        name: mode === 'signup' ? name.trim() : (name.trim() || 'Alex Morgan'),
        email: email.trim()
      };

      if (mode === 'login') {
        onLoginSuccess(userProfile);
      } else {
        onCreateSuccess(userProfile);
      }
    }, 850);
  };

  const handleSocialAuth = (provider: 'Apple' | 'Google') => {
    triggerHaptic('tap');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      triggerHaptic('super');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5e62', '#ffb599', '#d4bbff', '#ffffff']
      });

      const userProfile = {
        name: 'Alex Morgan',
        email: `alex.${provider.toLowerCase()}@luma.dating`
      };

      if (mode === 'login') {
        onLoginSuccess(userProfile);
      } else {
        onCreateSuccess(userProfile);
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-[#1e1725] p-6 sm:p-7 shadow-2xl border border-white/10 flex flex-col gap-4 max-h-[92vh] overflow-y-auto relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#ff5e62]/20 text-[#ff5e62] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <div className="flex flex-col">
              <h2 className="text-[19px] font-bold text-[#ebdef2] font-syne">
                {mode === 'login' ? 'Sign In to Luma' : 'Create Your Profile'}
              </h2>
              <span className="text-[11px] text-[#e1bebd]">
                {mode === 'login' ? 'Continue where you left off' : 'Match DNA intentional dating'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close login panel"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1bebd] hover:bg-[#2e2736] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Sign In / Create Account */}
        <div className="flex p-1 rounded-full bg-[#120b19] border border-white/10">
          <button
            type="button"
            onClick={() => {
              triggerHaptic('tap');
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-[13px] font-semibold rounded-full transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#ff5e62] text-[#64000f] shadow-md font-bold'
                : 'text-[#e1bebd] hover:text-[#ebdef2]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic('tap');
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 text-[13px] font-semibold rounded-full transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#ff5e62] text-[#64000f] shadow-md font-bold'
                : 'text-[#e1bebd] hover:text-[#ebdef2]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#64000f]/50 border border-[#ff5e62]/40 text-[#ffb4ab] text-[12px] flex items-center gap-2 animate-shake">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e62]" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {mode === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#e1bebd] uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-[#ffb599] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#120b19] text-[#ebdef2] text-[13px] placeholder-[#e1bebd]/40 border border-white/10 focus:border-[#ff5e62] outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#e1bebd] uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-[#ffb599] absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#120b19] text-[#ebdef2] text-[13px] placeholder-[#e1bebd]/40 border border-white/10 focus:border-[#ff5e62] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-semibold text-[#e1bebd] uppercase tracking-wider">
                Password
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('tap');
                    setErrorMsg('Password reset link sent to registered email');
                  }}
                  className="text-[11px] text-[#d4bbff] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[#ffb599] absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#120b19] text-[#ebdef2] text-[13px] placeholder-[#e1bebd]/40 border border-white/10 focus:border-[#ff5e62] outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#e1bebd] hover:text-[#ebdef2] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-[#e1bebd] uppercase tracking-wider">
                Dating Cadence
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  'Slow Dating & Deep Resonance',
                  'Analog Alchemist (Vinyl & Film)',
                  'Creative Sparks & Late Nights'
                ].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      triggerHaptic('tap');
                      setIntent(opt);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-[12px] border transition-all text-left cursor-pointer ${
                      intent === opt
                        ? 'bg-[#582a9f]/40 border-[#d4bbff] text-[#ebdcff] font-bold'
                        : 'bg-[#120b19] border-white/5 text-[#e1bebd]'
                    }`}
                  >
                    <span>{opt}</span>
                    {intent === opt && <CheckCircle2 className="w-3.5 h-3.5 text-[#d4bbff]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-[12px] text-[#e1bebd]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#ff5e62] rounded cursor-pointer"
                />
                <span>Stay signed in</span>
              </label>
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[#ffb599] font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Autofill Demo</span>
              </button>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-1 rounded-full bg-gradient-to-r from-[#ff5e62] via-[#d67f5b] to-[#ffb599] text-[#64000f] font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-[#ff5e62]/20 active:scale-98 transition-all cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#64000f] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In & Enter Lounge' : 'Create Account & Start Calibration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Social Authentication */}
        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
          <span className="text-center text-[11px] uppercase tracking-wider text-[#e1bebd]/60">
            Or continue with
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialAuth('Apple')}
              className="h-10 rounded-full bg-[#120b19] hover:bg-[#241d2b] border border-white/10 flex items-center justify-center gap-2 text-[#ebdef2] text-[12px] font-semibold transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-3.5 h-3.5 fill-[#ebdef2]" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.7-7.85-12-14.4-6.42-9.79-11.45-21.03-15.09-33.72-3.64-12.69-5.46-24.32-5.46-34.89 0-14.65 3.65-26.65 10.96-36 7.31-9.35 16.48-14.13 27.5-14.35 5.11 0 10.74 1.34 16.9 4.02 6.16 2.68 10.02 4.08 11.58 4.08 1.45 0 5.43-1.42 11.95-4.26 6.51-2.83 12.06-4.14 16.64-3.92 12.73.65 22.95 5.37 30.64 14.15-11.09 6.74-16.53 16.03-16.32 27.87.22 9.35 3.86 17.18 10.94 23.49 7.08 6.32 15.42 9.94 25.02 10.86-2.18 6.53-4.8 13.06-7.86 19.57zM119.22 33.78c-.22-7.18 2.39-13.92 7.82-20.22 5.44-6.3 12.18-10.43 20.22-12.39.22 1.3.33 2.5.33 3.59 0 6.96-2.61 13.79-7.83 20.48-5.22 6.7-12.06 10.81-20.54 12.34-.22-1.3-.33-2.5-.33-3.8z" />
              </svg>
              <span>Apple</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialAuth('Google')}
              className="h-10 rounded-full bg-[#120b19] hover:bg-[#241d2b] border border-white/10 flex items-center justify-center gap-2 text-[#ebdef2] text-[12px] font-semibold transition-all cursor-pointer active:scale-95"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path d="M12 5c1.56 0 2.98.54 4.09 1.58l3.05-3.05C17.29 1.81 14.83 1 12 1 7.42 1 3.53 3.61 1.63 7.41l3.66 2.84C6.17 7.09 8.84 5 12 5z" fill="#EA4335" />
                <path d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.92 3.71-8.7z" fill="#4285F4" />
                <path d="M5.29 14.75c-.24-.72-.37-1.49-.37-2.28s.13-1.56.37-2.28L1.63 7.41C.59 9.48 0 11.68 0 14s.59 4.52 1.63 6.59l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.07.72-2.45 1.16-4.22 1.16-3.16 0-5.83-2.09-6.71-4.95L1.63 16.26C3.53 20.06 7.42 23 12 23z" fill="#34A853" />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>

        {/* Accountability pledge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#e1bebd]/70 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ff5e62]" />
          <span>Ghost-free verified intentional community</span>
        </div>
      </div>
    </div>
  );
};
