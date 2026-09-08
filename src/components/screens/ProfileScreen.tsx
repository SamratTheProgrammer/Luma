import React, { useState } from 'react';
import { CalibrationState, ScreenType } from '../../types';
import { LUMA_ASSETS } from '../../data/mockData';
import { triggerHaptic } from '../../utils/haptics';
import { Sparkles, Sliders, Shield, Heart, RefreshCw, LogOut, Vibrate, BellRing, EyeOff, CheckCircle2, Layers, ArrowRight } from 'lucide-react';

interface ProfileScreenProps {
  calibration: CalibrationState;
  onRecalibrate: () => void;
  onLogout: () => void;
  onNavigateScreen?: (screen: ScreenType) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  calibration,
  onRecalibrate,
  onLogout,
  onNavigateScreen
}) => {
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [ghostFreeMode, setGhostFreeMode] = useState(true);
  const [incognito, setIncognito] = useState(false);
  const [dailyQuota, setDailyQuota] = useState<'curated' | 'unlimited'>('curated');

  const toggleHaptic = () => {
    const next = !hapticEnabled;
    setHapticEnabled(next);
    if (next) triggerHaptic('spark');
  };

  const toggleGhostFree = () => {
    setGhostFreeMode(!ghostFreeMode);
    triggerHaptic('tap');
  };

  const toggleIncognito = () => {
    setIncognito(!incognito);
    triggerHaptic('tap');
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-32 pt-2">
      {/* User Header */}
      <div className="flex flex-col items-center text-center pt-2 pb-5">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#ff5e62] via-[#d4bbff] to-[#ffb599] shadow-2xl">
            <img 
              src={LUMA_ASSETS.userAvatar} 
              alt="You" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#120b19] border border-white/20 flex items-center justify-center text-[#ffb599]">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>

        <h2 className="text-[22px] font-bold text-[#ebdef2] mt-3 font-syne">You, 28</h2>
        <p className="text-[13px] text-[#e1bebd]">Creative Lead • SoHo, New York</p>
      </div>

      {/* Match DNA Summary Card */}
      <div className="p-5 rounded-2xl bg-[#201927] border border-white/10 shadow-xl flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b0] text-[20px]">insights</span>
            <h3 className="text-[17px] font-bold text-[#ebdef2] font-syne">Your Match DNA Blueprint</h3>
          </div>
          <span className="text-[14px] font-bold text-[#ffb3b0] font-syne">{calibration.resonance}% Calibrated</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#241d2b] border border-white/5 flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#ffb599] uppercase tracking-wider">Identified Archetype</span>
          <span className="text-[16px] font-semibold text-[#ebdef2] font-syne">{calibration.archetype}</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#582a9f]/50 text-[#d4bbff] text-[11px] font-semibold border border-[#d4bbff]/20">
              {calibration.socialEnergy === 'ambi' ? 'Ambivert' : calibration.socialEnergy === 'intro' ? 'Introvert' : 'Extrovert'}
            </span>
            {calibration.values.map(v => (
              <span key={v} className="px-2.5 py-0.5 rounded-full bg-[#2e2736] text-[#e1bebd] text-[11px] font-medium border border-white/5">
                {v}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            triggerHaptic('tap');
            onRecalibrate();
          }}
          className="w-full py-3 rounded-full bg-[#2e2736] hover:bg-[#3e3645] text-[#ebdef2] text-[13px] font-bold flex items-center justify-center gap-2 transition-all border border-white/10 cursor-pointer active:scale-98"
        >
          <RefreshCw className="w-4 h-4 text-[#ff5e62]" />
          <span>Recalibrate Match DNA (Step 2)</span>
        </button>
      </div>

      {/* Mobile Preferences & Intentional Dating Controls */}
      <div className="p-5 rounded-2xl bg-[#201927] border border-white/10 shadow-xl flex flex-col gap-4 mb-4">
        <h3 className="text-[16px] font-bold text-[#ebdef2] font-syne flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#ff5e62]" />
          <span>Intentional Dating Preferences</span>
        </h3>

        {/* Haptic Feedback Toggle */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2e2736] flex items-center justify-center text-[#ffb599]">
              <Vibrate className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-[#ebdef2]">Tactile Haptics</span>
              <span className="text-[11px] text-[#e1bebd]">Vibrate on card gestures and Sparks</span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleHaptic}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              hapticEnabled ? 'bg-[#ff5e62]' : 'bg-[#2e2736]'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                hapticEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Ghost-Free Accountability Mode */}
        <div className="flex items-center justify-between py-1 border-t border-white/5 pt-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2e2736] flex items-center justify-center text-[#d4bbff]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-[#ebdef2]">Ghost-Free Accountability</span>
              <span className="text-[11px] text-[#e1bebd]">Prompts gentle sign-off instead of ghosting</span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleGhostFree}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              ghostFreeMode ? 'bg-[#582a9f]' : 'bg-[#2e2736]'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                ghostFreeMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Incognito Exploration */}
        <div className="flex items-center justify-between py-1 border-t border-white/5 pt-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2e2736] flex items-center justify-center text-[#ffdad8]">
              <EyeOff className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-[#ebdef2]">Discreet Browsing</span>
              <span className="text-[11px] text-[#e1bebd]">Only visible to people you send a Spark to</span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleIncognito}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              incognito ? 'bg-[#ff5e62]' : 'bg-[#2e2736]'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                incognito ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Screen Navigator Directory (properly adjusted) */}
      <div className="p-5 rounded-2xl bg-[#201927] border border-white/10 shadow-xl flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#ff5e62]" />
            <h3 className="text-[16px] font-bold text-[#ebdef2] font-syne">All App Flows &amp; Screens</h3>
          </div>
          <span className="text-[11px] text-[#ffb599] font-semibold bg-[#ff5e62]/20 px-2 py-0.5 rounded-full">
            8 Flows
          </span>
        </div>
        <p className="text-[12px] text-[#e1bebd]">
          Directly switch to any experience or testing flow:
        </p>

        <div className="grid grid-cols-2 gap-2 mt-1">
          {[
            { id: 'welcome', label: '1. Welcome & Login' },
            { id: 'calibration', label: '2. Calibration' },
            { id: 'discover', label: '3. Discover Deck' },
            { id: 'match-detail', label: '4. Match Detail' },
            { id: 'explore', label: 'Explore Lounge' },
            { id: 'sparks', label: 'Sparks Lounge' },
            { id: 'chats', label: 'Active Chat' },
            { id: 'profile', label: 'Profile Settings' },
          ].map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                triggerHaptic('tap');
                onNavigateScreen?.(item.id as ScreenType);
              }}
              className="p-2.5 rounded-xl bg-[#241d2b] hover:bg-[#2e2736] border border-white/5 text-left text-[12px] font-semibold text-[#ebdef2] flex items-center justify-between active:scale-95 transition-all cursor-pointer"
            >
              <span className="truncate pr-1">{item.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ff5e62] flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Settings / Actions */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            triggerHaptic('light');
            onLogout();
          }}
          className="w-full py-3.5 rounded-xl bg-[#241d2b] hover:bg-[#2e2736] text-[#ffb4ab] text-[14px] font-semibold flex items-center justify-center gap-2 transition-all border border-white/5 cursor-pointer active:scale-98"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out &amp; Return to Welcome</span>
        </button>
      </div>
    </div>
  );
};
