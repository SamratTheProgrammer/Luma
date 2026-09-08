import React, { useState } from 'react';
import { CuratedProfile, DateInvitation } from '../../types';
import { LUMA_ASSETS } from '../../data/mockData';
import { DateProposalModal } from '../DateProposalModal';
import { VoicePromptCard } from '../VoicePromptCard';
import { triggerHaptic } from '../../utils/haptics';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  MoreVertical, 
  Heart, 
  Sparkles, 
  Zap, 
  Bookmark, 
  BookmarkCheck, 
  Coffee, 
  Palette, 
  Clock, 
  MessageSquare, 
  Send, 
  SunMedium,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface MatchDetailScreenProps {
  profile: CuratedProfile;
  onBack: () => void;
  onSendSpark: (profile: CuratedProfile) => void;
  onSaveSpark: (profile: CuratedProfile) => void;
  onSuggestDate: (profile: CuratedProfile) => void;
}

export const MatchDetailScreen: React.FC<MatchDetailScreenProps> = ({
  profile,
  onBack,
  onSendSpark,
  onSaveSpark,
  onSuggestDate
}) => {
  const [dateSuggested, setDateSuggested] = useState(false);
  const [sparkDispatched, setSparkDispatched] = useState(false);
  const [savedToSparks, setSavedToSparks] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const handleSendSpark = () => {
    triggerHaptic('spark');
    setSparkDispatched(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ff5e62', '#d4bbff', '#ffb599', '#ffffff']
    });
    onSendSpark(profile);
  };

  const handleSaveSparks = () => {
    triggerHaptic('tap');
    setSavedToSparks(!savedToSparks);
    onSaveSpark(profile);
  };

  const handleDateInviteSent = (invitation: DateInvitation) => {
    setDateSuggested(true);
    onSuggestDate(profile);
  };

  return (
    <div className="flex flex-col w-full pb-36 px-4 sm:px-5 pt-2">
      {/* Detail Header */}
      <div className="flex items-center justify-between py-2 mb-3">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#241d2b]/80 backdrop-blur-md text-[#ebdef2] hover:bg-[#2e2736] active:scale-95 transition-all border border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[20px] font-bold text-[#ebdef2] truncate font-syne">Match Detail</h1>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#241d2b]/80 backdrop-blur-md text-[#e1bebd] hover:bg-[#2e2736] active:scale-95 transition-all border border-white/10"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          <img 
            src={LUMA_ASSETS.userAvatar} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover border border-[#ff5e62]/40 shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-5">
        {/* Aura Sync Card */}
        <div className="relative w-full rounded-2xl bg-[#201927] p-6 overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ff5e62]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#582a9f]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Aura Sync Active pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2e2736]/80 border border-white/5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ffb3b0] animate-pulse" />
              <span className="text-[11px] font-bold text-[#ffb599] uppercase tracking-wider">Aura Sync Active</span>
            </div>

            {/* Orbit Dual-Arc Overlap Visualizer */}
            <div className="relative flex items-center justify-center w-56 h-56 my-1">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="orbitOuter" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff5e62" />
                    <stop offset="50%" stopColor="#ffb3b0" />
                    <stop offset="100%" stopColor="#d4bbff" />
                  </linearGradient>
                  <linearGradient id="orbitMid" x1="100%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#582a9f" />
                    <stop offset="70%" stopColor="#ff758c" />
                    <stop offset="100%" stopColor="#ffb599" />
                  </linearGradient>
                  <filter id="auraGlow" width="140%" height="140%" x="-20%" y="-20%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer Ring Background */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="82" 
                  className="text-[#393241]/40 fill-none" 
                  stroke="currentColor" 
                  strokeWidth="6" 
                />
                {/* Outer Progress Ring */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="82" 
                  filter="url(#auraGlow)"
                  className="fill-none transition-all duration-1000 ease-out" 
                  stroke="url(#orbitOuter)" 
                  strokeWidth="7" 
                  strokeDasharray="515.2" 
                  strokeDashoffset="41.2" 
                  strokeLinecap="round" 
                />

                {/* Inner Ring Background */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="66" 
                  className="text-[#393241]/30 fill-none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                />
                {/* Inner Progress Ring */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="66" 
                  className="fill-none opacity-90 transition-all duration-1000 ease-out" 
                  stroke="url(#orbitMid)" 
                  strokeWidth="4.5" 
                  strokeDasharray="414.7" 
                  strokeDashoffset="49.7" 
                  strokeLinecap="round" 
                />

                {/* Innermost dashed orbit */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="52" 
                  className="text-[#d4bbff]/40 fill-none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeDasharray="3 6" 
                />
              </svg>

              {/* Central percentage stats */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-[44px] font-extrabold text-[#ebdef2] tracking-tight font-syne">
                    {profile.overlapScore}
                  </span>
                  <span className="text-[20px] font-bold text-[#ffb3b0]">%</span>
                </div>
                <span className="text-[11px] font-bold text-[#e1bebd] uppercase tracking-widest mt-0.5">
                  Overlap
                </span>
              </div>
            </div>

            <h2 className="text-[24px] font-bold text-[#ebdef2] mt-1 font-syne">High Resonance Connection</h2>
            <p className="text-[13px] text-[#e1bebd] mt-1 max-w-xs leading-relaxed">
              Calculated across 128 emotional, stylistic, and rhythmic compatibility markers.
            </p>

            {/* Persona Connection Bridge */}
            <div className="flex items-center justify-center gap-5 w-full mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md border border-white/20">
                  <img 
                    src={profile.detailPhotoUrl} 
                    alt={profile.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-[#ebdef2]">{profile.name}, {profile.age}</p>
                  <p className="text-[12px] text-[#e1bebd]">{profile.occupation}</p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#582a9f] flex items-center justify-center shadow-inner text-[#d4bbff]">
                <Heart className="w-4 h-4 fill-[#d4bbff]" />
              </div>

              <div className="flex items-center gap-2.5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md border border-white/20">
                  <img 
                    src={LUMA_ASSETS.userAvatar} 
                    alt="You" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-[#ebdef2]">You</p>
                  <p className="text-[12px] text-[#e1bebd]">Creative Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Spark Note Player */}
        {profile.voicePrompt && (
          <VoicePromptCard voicePrompt={profile.voicePrompt} name={profile.name} />
        )}

        {/* Your Shared Spark */}
        <div className="relative w-full rounded-2xl bg-[#241d2b] p-5 overflow-hidden shadow-lg border border-white/10">
          <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-[#ffb3b0]/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2e2736] flex-shrink-0 flex items-center justify-center text-[#ffb599] shadow-sm border border-white/5">
              <Sparkles className="w-5 h-5 text-[#ffb599]" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffb599]">Intuitive Harmony</span>
              <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">Your Shared Spark</h3>
              <p className="text-[14px] text-[#e1bebd] leading-relaxed mt-1">
                You both value intentional communication, slow Sunday mornings, and creative careers. You share an identical sense of humor and love discovering hidden gems in the city.
              </p>
            </div>
          </div>
        </div>

        {/* Match DNA Breakdown */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[20px] font-bold text-[#ebdef2] font-syne">Match DNA Breakdown</h3>
            <span className="text-[11px] font-bold text-[#d4bbff] uppercase tracking-wider bg-[#582a9f]/30 px-2.5 py-0.5 rounded-full border border-[#d4bbff]/20">
              5 Core Pillars
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {profile.pillars.map(pillar => (
              <div 
                key={pillar.title}
                className="flex flex-col p-4 rounded-xl bg-[#201927] gap-2 shadow-md border border-white/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {pillar.title === 'Personality Resonance' && <Sparkles className="w-4 h-4 text-[#ffb3b0]" />}
                    {pillar.title === 'Lifestyle & Rhythm' && <Clock className="w-4 h-4 text-[#d4bbff]" />}
                    {pillar.title === 'Interests & Passions' && <Palette className="w-4 h-4 text-[#ffb599]" />}
                    {pillar.title === 'Conversation Chemistry' && <MessageSquare className="w-4 h-4 text-[#ffb3b0]" />}
                    {pillar.title === 'Relationship Intentions' && <Heart className="w-4 h-4 text-[#d4bbff]" />}
                    <span className="text-[15px] font-bold text-[#ebdef2] font-syne">{pillar.title}</span>
                  </div>
                  <span className="text-[18px] font-bold text-[#ffb3b0] font-syne">{pillar.score}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#393241] overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${pillar.gradient} transition-all duration-700`} 
                    style={{ width: `${pillar.score}%` }} 
                  />
                </div>
                <p className="text-[13px] text-[#e1bebd]">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithmic Match Suggestion Card */}
        <div className="relative w-full rounded-2xl bg-[#241d2b] overflow-hidden shadow-xl border border-white/10">
          <div className="relative h-44 w-full overflow-hidden">
            <img 
              src={profile.dateSuggestion.imageUrl} 
              alt="Date spot"
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241d2b] via-[#241d2b]/60 to-transparent" />
            
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#120b19]/80 backdrop-blur-md flex items-center gap-1.5 border border-white/10">
              <span className="material-symbols-outlined text-[14px] text-[#ffb599]">lightbulb</span>
              <span className="text-[10px] font-bold text-[#ffb599] uppercase tracking-wider">Algorithmic Match Suggestion</span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-3 -mt-4 relative z-10">
            <div className="flex flex-col gap-1">
              <h4 className="text-[18px] font-bold text-[#ebdef2] font-syne">
                {profile.dateSuggestion.title}
              </h4>
              <p className="text-[13px] text-[#e1bebd] leading-relaxed">
                {profile.dateSuggestion.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#2e2736] text-[#ebdef2] text-[12px] font-medium flex items-center gap-1 border border-white/5">
                <Coffee className="w-3.5 h-3.5 text-[#ffb599]" /> Coffee
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2e2736] text-[#ebdef2] text-[12px] font-medium flex items-center gap-1 border border-white/5">
                <Palette className="w-3.5 h-3.5 text-[#ff5e62]" /> Art
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2e2736] text-[#ebdef2] text-[12px] font-medium flex items-center gap-1 border border-white/5">
                <SunMedium className="w-3.5 h-3.5 text-[#d4bbff]" /> Afternoon
              </span>
            </div>

            <button 
              type="button"
              onClick={() => {
                triggerHaptic('tap');
                setIsDateModalOpen(true);
              }}
              className={`w-full py-3 px-4 rounded-full text-[14px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                dateSuggested
                  ? 'bg-[#3e3645] text-[#ffb3b0]'
                  : 'bg-[#393241] hover:bg-[#3e3645] text-[#ebdef2] active:scale-[0.98]'
              }`}
            >
              {dateSuggested ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#ffb3b0]" />
                  <span>Date Proposal Dispatched to Chat!</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 text-[#ffb599]" />
                  <span>Propose Curated Date ✨</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-4 bg-[#120b19]/90 backdrop-blur-xl flex flex-col gap-2 border-t border-white/10 sm:max-w-md sm:mx-auto">
        <button 
          id="btn-detail-send-spark"
          type="button"
          onClick={handleSendSpark}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#ff5e62] via-[#ffb3b0] to-[#d4bbff] text-[#64000f] text-[15px] font-bold shadow-lg shadow-[#ff5e62]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap className="w-5 h-5 fill-[#64000f]" />
          <span>{sparkDispatched ? `Spark Dispatched to ${profile.name}!` : `Send ${profile.name} a Spark`}</span>
        </button>

        <button 
          type="button"
          onClick={handleSaveSparks}
          className={`w-full py-2.5 rounded-full text-[13px] font-semibold active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border ${
            savedToSparks
              ? 'bg-[#2e2736] text-[#d4bbff] border-[#d4bbff]/30'
              : 'bg-[#241d2b]/80 text-[#e1bebd] hover:text-[#ebdef2] border-white/5'
          }`}
        >
          {savedToSparks ? (
            <>
              <BookmarkCheck className="w-4 h-4 text-[#d4bbff]" />
              <span>Added to Sparks List</span>
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4" />
              <span>Save to Sparks List</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Date Proposal Sheet Modal */}
      <DateProposalModal
        isOpen={isDateModalOpen}
        profile={profile}
        onClose={() => setIsDateModalOpen(false)}
        onSendDateInvite={handleDateInviteSent}
      />
    </div>
  );
};
