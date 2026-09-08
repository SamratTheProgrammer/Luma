import React, { useState, useRef } from 'react';
import { CuratedProfile } from '../../types';
import confetti from 'canvas-confetti';
import { 
  SlidersHorizontal, 
  MapPin, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Heart, 
  Flame, 
  MessageSquare, 
  ArrowRight, 
  Building2, 
  Lightbulb, 
  Repeat, 
  Brain, 
  Smile, 
  Headphones, 
  Activity, 
  ArrowUp, 
  Shuffle, 
  HandMetal 
} from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';
import { VoicePromptCard } from '../VoicePromptCard';

interface DiscoverScreenProps {
  profile: CuratedProfile;
  onViewMatchDetail: (profile: CuratedProfile) => void;
  onNextProfile: () => void;
  onSendSpark: (profile: CuratedProfile) => void;
  onFilterClick: () => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  profile,
  onViewMatchDetail,
  onNextProfile,
  onSendSpark,
  onFilterClick
}) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cardFlyDirection, setCardFlyDirection] = useState<'idle' | 'left' | 'right'>('idle');

  // Interactive Touch & Gesture Drag States
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasTriggeredThresholdHaptic = useRef(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handlePass = () => {
    triggerHaptic('pass');
    setCardFlyDirection('left');
    setTimeout(() => {
      onNextProfile();
      setCardFlyDirection('idle');
      setDragOffset({ x: 0, y: 0 });
      showToast('Refreshed. Introducing next curated match...');
    }, 320);
  };

  const handleSpark = (isSuper: boolean = false) => {
    triggerHaptic(isSuper ? 'super' : 'spark');
    confetti({
      particleCount: isSuper ? 80 : 50,
      spread: isSuper ? 90 : 65,
      origin: { y: 0.75 },
      colors: ['#ff5e62', '#d4bbff', '#ffb599', '#ffffff']
    });

    onSendSpark(profile);
    setCardFlyDirection('right');
    setTimeout(() => {
      onNextProfile();
      setCardFlyDirection('idle');
      setDragOffset({ x: 0, y: 0 });
      showToast(
        isSuper
          ? `Super-Spark delivered directly to ${profile.name}'s lounge! ✨`
          : `Spark sent! ${profile.name} was notified ✨`
      );
    }, 320);
  };

  // Pointer / Touch Gestures for mobile-friendly swiping
  const handlePointerDown = (e: React.PointerEvent) => {
    // Avoid starting card drag if touching an input, button, or slider
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) return;

    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    hasTriggeredThresholdHaptic.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Dampen vertical movement to keep feel stable
    setDragOffset({ x: deltaX, y: deltaY * 0.4 });

    // Haptic tick when crossing threshold
    if (!hasTriggeredThresholdHaptic.current && Math.abs(deltaX) > 85) {
      triggerHaptic('light');
      hasTriggeredThresholdHaptic.current = true;
    } else if (hasTriggeredThresholdHaptic.current && Math.abs(deltaX) < 85) {
      hasTriggeredThresholdHaptic.current = false;
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStartRef.current = null;

    if (dragOffset.x > 85) {
      handleSpark(false);
    } else if (dragOffset.x < -85) {
      handlePass();
    } else {
      // Spring back to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    triggerHaptic('spark');
    setIsReplyOpen(false);
    setReplyText('');
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#ff5e62', '#d4bbff', '#ffb599']
    });
    showToast(`Thought sent to ${profile.name} ✨`);
  };

  // Calculate dynamic transform
  let transformStyle = '';
  if (cardFlyDirection === 'left') {
    transformStyle = 'translate3d(-120%, 0, 0) rotate(-16deg)';
  } else if (cardFlyDirection === 'right') {
    transformStyle = 'translate3d(120%, 0, 0) rotate(16deg)';
  } else if (isDragging || dragOffset.x !== 0) {
    transformStyle = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${dragOffset.x * 0.08}deg)`;
  }

  // Stamp opacities
  const sparkStampOpacity = Math.min(1, Math.max(0, (dragOffset.x - 25) / 60));
  const passStampOpacity = Math.min(1, Math.max(0, (-dragOffset.x - 25) / 60));

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-32 pt-1 touch-pan-y">
      {/* Toast Notification */}
      <div 
        className={`fixed top-14 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-300 px-4 ${
          toastMessage ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#3e3645] text-[#ebdef2] shadow-2xl border border-white/10">
          <Sparkles className="w-4 h-4 text-[#ff5e62]" />
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      </div>

      {/* Discover Location & Controls Bar */}
      <section className="flex items-center justify-between gap-2 py-1 mb-2">
        <div className="flex flex-col min-w-0">
          <button 
            type="button"
            onClick={onFilterClick}
            className="flex items-center gap-1.5 text-left active:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#ff5e62] text-[18px]">near_me</span>
            <span className="text-[17px] font-semibold text-[#ebdef2] truncate font-syne">SoHo, New York</span>
            <span className="text-[11px] font-bold text-[#e1bebd] bg-[#2e2736] px-2 py-0.5 rounded-full border border-white/5">
              (3 mi)
            </span>
            <ChevronDown className="w-4 h-4 text-[#e1bebd] group-hover:translate-y-0.5 transition-transform" />
          </button>
          <p className="text-[12px] text-[#e1bebd] mt-0.5">High resonance Match DNA matches</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Shuffle Button */}
          <button 
            type="button"
            onClick={() => {
              triggerHaptic('tap');
              onNextProfile();
              showToast('Shuffled to next curated match');
            }}
            aria-label="Shuffle next profile"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#241d2b] text-[#e1bebd] hover:text-[#ebdef2] active:scale-95 transition-all shadow-md border border-white/10 cursor-pointer"
            title="Next match"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          {/* Filter Button */}
          <button 
            type="button"
            onClick={onFilterClick}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#2e2736] text-[#ebdef2] active:scale-95 transition-transform shadow-md border border-white/10 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#ebdef2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff5e62] shadow-[0_0_8px_#ff5e62]" />
          </button>
        </div>
      </section>

      {/* Touch Swipe Gesture Guidance Strip */}
      <div className="flex items-center justify-between px-1 mb-2 text-[11px] text-[#e1bebd]/70">
        <span>← Swipe Left to Pass</span>
        <span className="text-[#ffb599]">Swipe Right to Spark ✨ →</span>
      </div>

      {/* Curated Persona Card with Drag Physics */}
      <article 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: transformStyle,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className="relative flex flex-col w-full rounded-3xl bg-[#201927] shadow-2xl overflow-hidden border border-white/10 touch-none select-none cursor-grab active:cursor-grabbing"
      >
        {/* Dynamic Stamp: SPARK (Right Swipe) */}
        <div 
          style={{ opacity: sparkStampOpacity }}
          className="absolute top-6 left-6 z-30 pointer-events-none px-4 py-1.5 rounded-xl bg-[#ff5e62]/90 border-2 border-white text-white font-extrabold text-[18px] uppercase tracking-wider font-syne shadow-[0_0_20px_#ff5e62] rotate-[-12deg]"
        >
          SPARK ✨
        </div>

        {/* Dynamic Stamp: PASS (Left Swipe) */}
        <div 
          style={{ opacity: passStampOpacity }}
          className="absolute top-6 right-6 z-30 pointer-events-none px-4 py-1.5 rounded-xl bg-[#393241]/90 border-2 border-white/40 text-white font-extrabold text-[18px] uppercase tracking-wider font-syne shadow-lg rotate-[12deg]"
        >
          PASS ✕
        </div>

        {/* Visual Stage / Portrait Canvas */}
        <div 
          onClick={() => onViewMatchDetail(profile)}
          className="relative w-full aspect-[4/5] overflow-hidden bg-[#120b19] cursor-pointer group"
        >
          <img 
            src={profile.avatarUrl} 
            alt={profile.name} 
            className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105" 
          />

          {/* Atmosphere Gradient Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#201927] via-[#201927]/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120b19]/70 via-transparent to-transparent pointer-events-none" />

          {/* Match DNA Floating Highlight */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#120b19]/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(255,94,98,0.35)] border border-white/10">
            <div className="relative flex items-center justify-center w-5 h-5">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path 
                  className="text-[#393241]" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3.5"
                />
                <path 
                  className="text-[#ff5e62]" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeDasharray="94, 100" 
                  strokeLinecap="round" 
                  strokeWidth="3.5"
                />
              </svg>
              <span className="material-symbols-outlined text-[10px] text-[#ffdbce] absolute">flare</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[16px] font-bold text-[#ebdef2] font-syne">{profile.matchDnaScore}%</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb599]">DNA</span>
            </div>
          </div>

          {/* Top Story Indicator Capsules */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120b19]/70 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#d4bbff] shadow-[0_0_6px_#d4bbff]" />
            <span className="text-[11px] font-bold text-[#ebdef2] uppercase tracking-wider">Curated Today</span>
          </div>

          {/* Identity Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[26px] font-bold text-[#ebdef2] drop-shadow-md font-syne">
                {profile.name}, {profile.age}
              </h2>
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#582a9f] text-[#c6a5ff] shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4bbff]" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#e1bebd]">
              <Building2 className="w-4 h-4 text-[#ffb599]" />
              <span className="text-[13px] font-medium">{profile.occupation} • {profile.distance}</span>
            </div>
          </div>
        </div>

        {/* Expressive Body Details */}
        <div className="flex flex-col p-4 gap-4 bg-[#201927]">
          {/* Bio Thought Snippet */}
          <div className="relative p-3.5 rounded-xl bg-[#241d2b] shadow-sm border border-white/5">
            <span className="material-symbols-outlined text-[24px] text-[#d67f5b] absolute -top-3 left-3 bg-[#241d2b] px-1 rounded-full">
              format_quote
            </span>
            <p className="text-[14px] text-[#ebdef2] leading-relaxed pt-1">
              {profile.bio}
            </p>
          </div>

          {/* Voice Spark Note Player (New Interactive Mobile Feature) */}
          {profile.voicePrompt && (
            <VoicePromptCard voicePrompt={profile.voicePrompt} name={profile.name} />
          )}

          {/* "Why You Might Click" Spotlight Module */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#582a9f]/80 via-[#2e2736] to-[#201927] p-4 shadow-lg border border-[#d4bbff]/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5e62] text-[#64000f] shadow-[0_0_12px_#ff5e62]">
                <Lightbulb className="w-3.5 h-3.5 text-[#64000f]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ebdcff]">
                Why You Might Click
              </span>
            </div>
            <p className="text-[15px] text-[#ebdef2] font-semibold leading-snug">
              {profile.whyClickHeadline}
            </p>
            <div className="flex items-center gap-1.5 mt-2.5 text-[#d4bbff]">
              <Repeat className="w-4 h-4" />
              <span className="text-[12px] font-medium">{profile.whyClickDetail}</span>
            </div>
          </div>

          {/* Match DNA Dimension Metric Grid */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#e1bebd]">Affinity Spectrum</span>
              <span className="text-[11px] font-semibold text-[#ffb599]">Deep Resonance</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {profile.affinities.map(aff => (
                <div key={aff.label} className="flex items-center justify-between p-2.5 rounded-xl bg-[#241d2b] border border-white/5">
                  <div className="flex items-center gap-2">
                    {aff.label === 'Personality' && <Brain className="w-4 h-4 text-[#ff5e62]" />}
                    {aff.label === 'Lifestyle' && <Activity className="w-4 h-4 text-[#d4bbff]" />}
                    {aff.label === 'Humor' && <Smile className="w-4 h-4 text-[#ffb599]" />}
                    {aff.label === 'Music' && <Headphones className="w-4 h-4 text-[#ffdad8]" />}
                    <span className="text-[13px] font-semibold text-[#ebdef2]">{aff.label}</span>
                  </div>
                  <span className="text-[13px] font-bold text-[#ffb3b0]">{aff.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Passion Clusters */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#e1bebd]">Shared Interests</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map(interest => (
                <span 
                  key={interest}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2e2736] text-[#ebdef2] text-[12px] font-medium border border-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e62] shadow-[0_0_6px_#ff5e62]" />
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Inline Micro-interaction Prompt Pill */}
          <button 
            type="button"
            onClick={() => {
              triggerHaptic('tap');
              setIsReplyOpen(true);
            }}
            className="group flex items-center justify-between w-full px-4 py-3 rounded-full bg-[#2e2736] text-[#ebdef2] active:scale-[0.98] transition-all shadow-md border border-white/10 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <MessageSquare className="w-4 h-4 text-[#ff5e62] flex-shrink-0" />
              <span className="text-[13px] font-semibold truncate">
                Reply to {profile.name}'s weekend prompt
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#e1bebd] group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>

          {/* Action Lounge Bar (Tactile touch targets with haptics) */}
          <div className="flex items-center justify-between gap-2 pt-1 pb-1">
            {/* Pass Button */}
            <button 
              id="btn-discover-pass"
              type="button"
              onClick={handlePass}
              aria-label="Pass on profile" 
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#241d2b] text-[#e1bebd] hover:bg-[#2e2736] active:scale-90 transition-transform shadow-lg border border-white/10 cursor-pointer flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Spark Icebreaker Button */}
            <button 
              id="btn-discover-spark"
              type="button"
              onClick={() => handleSpark(false)}
              aria-label="Send Spark"
              className="flex-1 max-w-[170px] h-12 sm:h-14 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#ff5e62] to-[#d67f5b] text-[#64000f] shadow-[0_6px_20px_rgba(255,94,98,0.4)] active:scale-95 transition-all cursor-pointer font-bold flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <Flame className="w-5 h-5 fill-[#64000f] flex-shrink-0" />
              <span className="text-[14px] sm:text-[15px] font-bold whitespace-nowrap tracking-wide leading-none">Send Spark</span>
            </button>

            {/* Super-Spark Button */}
            <button 
              id="btn-discover-super-spark"
              type="button"
              onClick={() => handleSpark(true)}
              aria-label="Super-spark" 
              className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#241d2b] text-[#ff5e62] hover:bg-[#2e2736] active:scale-90 transition-transform shadow-[0_0_18px_rgba(255,94,98,0.3)] border border-[#ff5e62]/30 cursor-pointer flex-shrink-0"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff5e62]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5e62] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5e62]" />
              </span>
            </button>

            {/* Direct React / Match Detail Button */}
            <button 
              id="btn-discover-detail"
              type="button"
              onClick={() => {
                triggerHaptic('tap');
                onViewMatchDetail(profile);
              }}
              aria-label="View deep resonance details" 
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#241d2b] text-[#d4bbff] hover:bg-[#2e2736] active:scale-90 transition-transform shadow-lg border border-white/10 cursor-pointer flex-shrink-0"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4bbff]" />
            </button>
          </div>
        </div>
      </article>

      {/* Interactive Reply Sheet Modal */}
      {isReplyOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#2e2736] p-5 shadow-2xl flex flex-col gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-6 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-bold text-[#ebdef2] font-syne">Respond to {profile.name}</span>
              <button 
                type="button"
                onClick={() => setIsReplyOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1bebd] hover:bg-[#393241] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[14px] text-[#ffb599] font-medium italic">
              "{profile.weekendPrompt}"
            </p>

            <div className="relative flex items-center mt-2">
              <input 
                type="text"
                autoFocus
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendReply()}
                placeholder="Share your favorite hidden corner..."
                className="w-full h-12 pl-4 pr-12 rounded-full bg-[#120b19] text-[#ebdef2] placeholder-[#e1bebd]/50 outline-none text-[14px] focus:ring-1 focus:ring-[#ff5e62] transition-all border border-white/10"
              />
              <button 
                type="button"
                onClick={handleSendReply}
                className="absolute right-1.5 w-9 h-9 rounded-full bg-[#ff5e62] text-[#64000f] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
