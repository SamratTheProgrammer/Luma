import React from 'react';
import { ScreenType } from '../types';
import { LUMA_ASSETS } from '../data/mockData';
import { SlidersHorizontal, Sparkles, Layers } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onOpenFilters: () => void;
  onNavigateProfile: () => void;
  onOpenScreenNavigator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onOpenFilters,
  onNavigateProfile,
  onOpenScreenNavigator
}) => {
  // Hide on welcome and calibration screens
  if (currentScreen === 'welcome' || currentScreen === 'calibration' || currentScreen === 'match-detail') {
    return null;
  }

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#120b19]/85 backdrop-blur-xl border-b border-white/5 sm:max-w-md sm:mx-auto pt-[env(safe-area-inset-top)]">
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img 
              id="img-header-luma-logo"
              src={LUMA_ASSETS.logo} 
              alt="Luma" 
              className="h-6 w-auto object-contain drop-shadow" 
            />
            <span className="text-[#ff5e62] font-bold text-[22px] tracking-tight font-syne">
              Luma
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff5e62] shadow-[0_0_8px_#ff5e62]" />
          </div>
          {currentScreen !== 'discover' && (
            <span className="text-[13px] font-semibold text-[#e1bebd] px-2 py-0.5 rounded-full bg-[#241d2b] border border-white/5 capitalize">
              {currentScreen}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Screen Navigator Shortcut */}
          {onOpenScreenNavigator && (
            <button
              id="header-btn-screens"
              type="button"
              onClick={onOpenScreenNavigator}
              aria-label="screens"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#241d2b]/80 hover:bg-[#2e2736] border border-white/5 text-[#ebdef2] text-[11px] font-semibold active:scale-95 transition-all cursor-pointer"
            >
              <Layers className="w-3 h-3 text-[#ff5e62]" />
              <span id="header-screens-text">screens</span>
            </button>
          )}

          {/* Match DNA Status Pill */}
          <div className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#241d2b]/80 border border-white/5 text-[#ffb599] text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-[#ff5e62]" />
            <span>DNA Sync</span>
          </div>

          {/* Filter Button */}
          <button
            type="button"
            onClick={onOpenFilters}
            aria-label="Discovery filters"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#241d2b]/80 backdrop-blur-md text-[#e1bebd] hover:text-[#ebdef2] active:scale-95 transition-transform border border-white/5 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* User Profile Avatar */}
          <button
            type="button"
            onClick={onNavigateProfile}
            aria-label="View your profile"
            className="relative flex items-center justify-center p-[1.5px] rounded-full bg-gradient-to-tr from-[#ff5e62] to-[#d4bbff] active:scale-95 transition-transform cursor-pointer"
          >
            <img 
              src={LUMA_ASSETS.userAvatar} 
              alt="Profile" 
              className="w-7 h-7 rounded-full object-cover" 
            />
          </button>
        </div>
      </div>
    </header>
  );
};
