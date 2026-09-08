import React from 'react';
import { ScreenType } from '../types';
import { X, Sparkles, Compass, Flame, MessageSquare, User, LayoutGrid, Sliders, Layers, ArrowRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface ScreenNavigatorModalProps {
  isOpen: boolean;
  currentScreen: ScreenType;
  onClose: () => void;
  onSelectScreen: (screen: ScreenType) => void;
}

interface ScreenOption {
  id: ScreenType;
  title: string;
  step?: string;
  desc: string;
  icon: React.ReactNode;
}

const SCREENS: ScreenOption[] = [
  {
    id: 'welcome',
    step: 'Step 1',
    title: 'Welcome & Login',
    desc: 'Atmospheric landing, Sign In & Create Account panel',
    icon: <Sparkles className="w-4 h-4 text-[#ff5e62]" />
  },
  {
    id: 'calibration',
    step: 'Step 2',
    title: 'Match DNA Calibration',
    desc: 'Values, social rhythm & personality onboarding',
    icon: <Sliders className="w-4 h-4 text-[#d4bbff]" />
  },
  {
    id: 'discover',
    step: 'Step 3',
    title: 'Discover Lounge',
    desc: 'Interactive card deck with touch drag & voice sparks',
    icon: <Compass className="w-4 h-4 text-[#ffb599]" />
  },
  {
    id: 'match-detail',
    step: 'Step 4',
    title: 'Match Detail & Aura Sync',
    desc: 'Deep compatibility breakdown & curated date ideas',
    icon: <Layers className="w-4 h-4 text-[#ffb3b0]" />
  },
  {
    id: 'explore',
    title: 'Explore Community',
    desc: 'Curated vibe clusters and archetype spotlights',
    icon: <LayoutGrid className="w-4 h-4 text-[#d4bbff]" />
  },
  {
    id: 'sparks',
    title: 'Sparks Lounge',
    desc: 'Mutual wavelengths, sent sparks & invitations',
    icon: <Flame className="w-4 h-4 text-[#ff5e62]" />
  },
  {
    id: 'chats',
    title: 'Chat & Date RSVPs',
    desc: 'Direct messaging, icebreakers & interactive date invites',
    icon: <MessageSquare className="w-4 h-4 text-[#ffb599]" />
  },
  {
    id: 'profile',
    title: 'Profile & Settings',
    desc: 'DNA Blueprint, dating preferences & ghost-free mode',
    icon: <User className="w-4 h-4 text-[#d4bbff]" />
  }
];

export const ScreenNavigatorModal: React.FC<ScreenNavigatorModalProps> = ({
  isOpen,
  currentScreen,
  onClose,
  onSelectScreen
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-[#1e1725] p-5 sm:p-6 shadow-2xl border border-white/10 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#ff5e62]/20 text-[#ff5e62] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </span>
            <div className="flex flex-col">
              <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">Screen Navigator</h3>
              <span className="text-[11px] text-[#e1bebd]">Switch directly to any screen flow</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigator"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1bebd] hover:bg-[#2e2736] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Screen Options List */}
        <div className="flex flex-col gap-2">
          {SCREENS.map(item => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  triggerHaptic('tap');
                  onSelectScreen(item.id);
                  onClose();
                }}
                className={`p-3 rounded-2xl flex items-center justify-between gap-3 text-left transition-all border cursor-pointer active:scale-[0.98] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#582a9f]/40 to-[#ff5e62]/20 border-[#ff5e62]/60 shadow-md'
                    : 'bg-[#150e1b] hover:bg-[#241d2b] border-white/5 text-[#ebdef2]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-[#ff5e62]/30 border border-[#ff5e62]' : 'bg-[#241d2b]'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#ebdef2] font-syne truncate">
                        {item.title}
                      </span>
                      {item.step && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#2e2736] text-[#ffb599] flex-shrink-0">
                          {item.step}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#e1bebd]/70 truncate">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {isActive ? (
                    <span className="text-[11px] font-bold text-[#ff5e62] bg-[#ff5e62]/20 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#e1bebd]/50" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
