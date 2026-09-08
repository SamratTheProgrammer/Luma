import React, { useState, useEffect } from 'react';
import { LUMA_ASSETS } from '../../data/mockData';
import { ArrowRight, Sparkles, Filter, Heart, Music, Film, CheckCircle2 } from 'lucide-react';
import { LoginPanel } from '../LoginPanel';

interface WelcomeScreenProps {
  onCreateProfile: (user?: { name: string; email: string }) => void;
  onLogin: (user?: { name: string; email: string }) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreateProfile, onLogin }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 12;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 12;
      setTilt({ x: xOffset, y: yOffset });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col w-full px-5 relative overflow-hidden pb-12 pt-4">
      {/* Dynamic Atmospheric Background Glows */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#ff5e62]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-80 -right-24 w-72 h-72 bg-[#582a9f]/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-40 -left-20 w-64 h-64 bg-[#d67f5b]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Brand Mark Header */}
      <div className="flex flex-col items-center justify-center pt-4 pb-2">
        <div className="relative group flex items-center justify-center">
          {/* Subtle atmospheric glow behind the logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e62]/30 via-[#d4bbff]/20 to-[#ffb599]/30 blur-2xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />
          
          {/* Big Luma Logo without circle */}
          <img 
            id="img-luma-welcome-logo"
            src={LUMA_ASSETS.logo} 
            alt="Luma Logo" 
            className="relative h-24 sm:h-28 w-auto max-w-[260px] object-contain drop-shadow-[0_10px_30px_rgba(255,94,98,0.35)] transition-transform duration-300 group-hover:scale-105 cursor-pointer" 
          />
        </div>

        <div className="flex items-center gap-1.5 mt-3.5 px-3.5 py-1 rounded-full bg-[#2e2736]/60 backdrop-blur-md border border-white/5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff5e62] animate-ping" />
          <span className="text-[11px] font-bold text-[#ffb599] tracking-widest uppercase">Late-Night Intimacy</span>
        </div>
      </div>

      {/* Hero Typography */}
      <div className="text-center mt-3 mb-5 px-1">
        <h1 className="text-[32px] sm:text-[38px] font-bold text-[#ebdef2] tracking-tight leading-tight font-syne">
          Meet someone who <br />
          <span className="bg-gradient-to-r from-[#ffdad8] to-[#ff5e62] bg-clip-text text-transparent">
            gets you.
          </span>
        </h1>
        <p className="text-[15px] text-[#e1bebd] mt-2.5 max-w-xs mx-auto leading-relaxed">
          Discover people through personality, shared rhythm, and the little quirks that make you click.
        </p>
      </div>

      {/* Visual Centerpiece: Overlapping Avatars & Contextual Delight Chips */}
      <div className="relative w-full max-w-sm mx-auto h-64 my-2 flex items-center justify-center select-none">
        {/* Central Ambient Aura */}
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-[#582a9f]/40 to-[#ff5e62]/30 blur-2xl" />

        {/* Avatar Left */}
        <div 
          className="absolute left-4 top-10 transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105 z-10"
          style={{ transform: `translate(${tilt.x * -0.5}px, ${tilt.y * -0.5}px) rotate(-6deg)` }}
        >
          <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-b from-[#d4bbff] to-[#2e2736] shadow-2xl">
            <img 
              src={LUMA_ASSETS.avatarLeft} 
              alt="Match portrait" 
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-[#120b19] flex items-center justify-center shadow border border-white/10">
              <span className="material-symbols-outlined text-[#d4bbff] text-[14px]">graphic_eq</span>
            </span>
          </div>
        </div>

        {/* Avatar Right */}
        <div 
          className="absolute right-4 top-12 transform rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105 z-10"
          style={{ transform: `translate(${tilt.x * 0.5}px, ${tilt.y * 0.5}px) rotate(6deg)` }}
        >
          <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-b from-[#ffb599] to-[#2e2736] shadow-2xl">
            <img 
              src={LUMA_ASSETS.avatarRight} 
              alt="Match portrait" 
              className="w-full h-full rounded-full object-cover"
            />
            <span className="absolute bottom-0 left-1 w-6 h-6 rounded-full bg-[#120b19] flex items-center justify-center shadow border border-white/10">
              <span className="material-symbols-outlined text-[#ffb599] text-[14px]">camera_alt</span>
            </span>
          </div>
        </div>

        {/* Avatar Center Main */}
        <div 
          className="relative z-20 transition-all duration-500 hover:scale-105"
          style={{ transform: `translate(${tilt.x}px, ${tilt.y}px)` }}
        >
          <div className="relative w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-[#ff5e62] via-[#ffb599] to-[#582a9f] shadow-2xl shadow-[#ff5e62]/20">
            <img 
              src={LUMA_ASSETS.avatarCenter} 
              alt="Match portrait" 
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#120b19] text-[#ebdef2] flex items-center gap-1.5 shadow-lg whitespace-nowrap border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#ffb3b0] animate-pulse" />
              <span className="text-[11px] font-bold text-[#ffb3b0]">Active Now</span>
            </div>
          </div>
        </div>

        {/* Ambient Floating Trait Badges */}
        <div className="absolute top-1 left-2 z-30 animate-bounce" style={{ animationDuration: '4s' }}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2e2736]/80 backdrop-blur-xl shadow-lg shadow-black/40 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#ff5e62]" />
            <span className="text-[12px] text-[#ebdef2] font-semibold">96% Match DNA</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 z-30 animate-bounce" style={{ animationDuration: '4.8s', animationDelay: '0.6s' }}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2e2736]/80 backdrop-blur-xl shadow-lg shadow-black/40 border border-white/10">
            <Film className="w-3.5 h-3.5 text-[#ffb599]" />
            <span className="text-[12px] text-[#ffb599] font-medium">Both love 35mm film</span>
          </div>
        </div>

        <div className="absolute top-4 right-1 z-30 animate-bounce" style={{ animationDuration: '5.2s', animationDelay: '1.2s' }}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2e2736]/80 backdrop-blur-xl shadow-lg shadow-black/40 border border-white/10">
            <Music className="w-3.5 h-3.5 text-[#d4bbff]" />
            <span className="text-[12px] text-[#ebdcff] font-medium">Sunday jazz vibes</span>
          </div>
        </div>
      </div>

      {/* Value Propositions Section */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 mb-7 px-2">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#241d2b]/70 backdrop-blur-sm border border-white/5 shadow-sm">
          <span className="material-symbols-outlined text-[#ffb3b0] text-[16px]">filter_vintage</span>
          <span className="text-[12px] text-[#e1bebd]">No endless swiping</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#582a9f]/20 backdrop-blur-sm border border-[#d4bbff]/20 shadow-sm">
          <span className="material-symbols-outlined text-[#d4bbff] text-[16px]">interests</span>
          <span className="text-[12px] text-[#d4bbff] font-medium">Deep compatibility</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#241d2b]/70 backdrop-blur-sm border border-white/5 shadow-sm">
          <span className="material-symbols-outlined text-[#ffb599] text-[16px]">bolt</span>
          <span className="text-[12px] text-[#e1bebd]">Thoughtful sparks</span>
        </div>
      </div>

      {/* Interactive Action CTAs */}
      <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
        {/* Primary Shimmer Pill CTA */}
        <button
          id="btn-create-profile"
          onClick={() => {
            setPanelMode('signup');
            setIsLoginPanelOpen(true);
          }}
          type="button"
          className="relative group overflow-hidden w-full h-14 rounded-full bg-gradient-to-r from-[#ff5e62] via-[#d67f5b] to-[#ff5e62] bg-[length:200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center shadow-lg shadow-[#ff5e62]/30 active:scale-[0.98] cursor-pointer"
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="flex items-center gap-2 z-10">
            <span className="text-[15px] font-bold text-[#64000f] tracking-wide">
              Create my profile
            </span>
            <ArrowRight className="w-5 h-5 text-[#64000f] transition-transform group-hover:translate-x-1" />
          </div>
        </button>

        {/* Secondary Frosted Glass CTA */}
        <button
          id="btn-login-account"
          onClick={() => {
            setPanelMode('login');
            setIsLoginPanelOpen(true);
          }}
          type="button"
          className="w-full h-14 rounded-full bg-[#2e2736]/70 hover:bg-[#2e2736]/90 transition-colors backdrop-blur-xl flex items-center justify-center shadow-md active:scale-[0.98] border border-white/10 cursor-pointer"
        >
          <span className="text-[14px] text-[#ebdef2] font-semibold tracking-wide">
            I already have an account
          </span>
        </button>
      </div>

      {/* Divider & Social Authentication */}
      <div className="w-full max-w-sm mx-auto mt-6 flex flex-col items-center">
        <div className="relative w-full flex items-center justify-center py-2">
          <div className="w-full h-px bg-[#393241]/60" />
          <span className="absolute px-3 bg-[#17111e] text-[#e1bebd]/70 text-[11px] uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        <div className="flex items-center gap-3 mt-3 w-full justify-center">
          {/* Apple Auth Pill */}
          <button
            onClick={() => {
              setPanelMode('login');
              setIsLoginPanelOpen(true);
            }}
            type="button"
            className="flex-1 h-12 rounded-full bg-[#241d2b]/90 hover:bg-[#2e2736] transition-colors backdrop-blur-md flex items-center justify-center gap-2 shadow-sm border border-white/5 active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-[#ebdef2]" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.7-7.85-12-14.4-6.42-9.79-11.45-21.03-15.09-33.72-3.64-12.69-5.46-24.32-5.46-34.89 0-14.65 3.65-26.65 10.96-36 7.31-9.35 16.48-14.13 27.5-14.35 5.11 0 10.74 1.34 16.9 4.02 6.16 2.68 10.02 4.08 11.58 4.08 1.45 0 5.43-1.42 11.95-4.26 6.51-2.83 12.06-4.14 16.64-3.92 12.73.65 22.95 5.37 30.64 14.15-11.09 6.74-16.53 16.03-16.32 27.87.22 9.35 3.86 17.18 10.94 23.49 7.08 6.32 15.42 9.94 25.02 10.86-2.18 6.53-4.8 13.06-7.86 19.57zM119.22 33.78c-.22-7.18 2.39-13.92 7.82-20.22 5.44-6.3 12.18-10.43 20.22-12.39.22 1.3.33 2.5.33 3.59 0 6.96-2.61 13.79-7.83 20.48-5.22 6.7-12.06 10.81-20.54 12.34-.22-1.3-.33-2.5-.33-3.8z" />
            </svg>
            <span className="text-[13px] font-semibold text-[#ebdef2]">Apple</span>
          </button>

          {/* Google Auth Pill */}
          <button
            onClick={() => {
              setPanelMode('login');
              setIsLoginPanelOpen(true);
            }}
            type="button"
            className="flex-1 h-12 rounded-full bg-[#241d2b]/90 hover:bg-[#2e2736] transition-colors backdrop-blur-md flex items-center justify-center gap-2 shadow-sm border border-white/5 active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M12 5c1.56 0 2.98.54 4.09 1.58l3.05-3.05C17.29 1.81 14.83 1 12 1 7.42 1 3.53 3.61 1.63 7.41l3.66 2.84C6.17 7.09 8.84 5 12 5z" fill="#EA4335" />
              <path d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.71 2.88c2.16-1.99 3.71-4.92 3.71-8.7z" fill="#4285F4" />
              <path d="M5.29 14.75c-.24-.72-.37-1.49-.37-2.28s.13-1.56.37-2.28L1.63 7.41C.59 9.48 0 11.68 0 14s.59 4.52 1.63 6.59l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.07.72-2.45 1.16-4.22 1.16-3.16 0-5.83-2.09-6.71-4.95L1.63 16.26C3.53 20.06 7.42 23 12 23z" fill="#34A853" />
            </svg>
            <span className="text-[13px] font-semibold text-[#ebdef2]">Google</span>
          </button>
        </div>
      </div>

      {/* Login & Create Account Modal Panel */}
      <LoginPanel
        isOpen={isLoginPanelOpen}
        initialMode={panelMode}
        onClose={() => setIsLoginPanelOpen(false)}
        onLoginSuccess={(userData) => {
          setIsLoginPanelOpen(false);
          onLogin(userData);
        }}
        onCreateSuccess={(userData) => {
          setIsLoginPanelOpen(false);
          onCreateProfile(userData);
        }}
      />
    </div>
  );
};
