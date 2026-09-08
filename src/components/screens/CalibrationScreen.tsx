import React, { useState } from 'react';
import { CalibrationState } from '../../types';
import { INITIAL_CALIBRATION } from '../../data/mockData';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Circle, Heart, Sparkles, Plus } from 'lucide-react';

interface CalibrationScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const CalibrationScreen: React.FC<CalibrationScreenProps> = ({ onBack, onContinue }) => {
  const [calib, setCalib] = useState<CalibrationState>(INITIAL_CALIBRATION);

  // Radar points variants for dynamic morphing on change
  const radarVariants = [
    "50,16 82,41 68,78 30,73 19,45",
    "50,14 84,36 71,80 28,76 16,42",
    "50,20 78,44 64,74 34,70 22,48",
    "50,12 86,40 76,82 24,78 14,39"
  ];
  const [currentPolygon, setCurrentPolygon] = useState(radarVariants[0]);

  const updateResonance = (offset: number) => {
    setCalib(prev => {
      const nextRes = Math.min(99, Math.max(75, prev.resonance + offset));
      return { ...prev, resonance: nextRes };
    });
    const nextPoly = radarVariants[Math.floor(Math.random() * radarVariants.length)];
    setCurrentPolygon(nextPoly);
  };

  const handleSelectIntent = (key: string) => {
    setCalib(prev => ({ ...prev, intent: key }));
    updateResonance(key === 'serious' ? 3 : 1);
  };

  const handleSelectWeekend = (key: string) => {
    setCalib(prev => ({ ...prev, weekend: key }));
    updateResonance(1);
  };

  const handleSetEnergy = (energy: 'intro' | 'ambi' | 'extro') => {
    setCalib(prev => ({ ...prev, socialEnergy: energy }));
    updateResonance(2);
  };

  const handleToggleValue = (val: string) => {
    setCalib(prev => {
      const exists = prev.values.includes(val);
      let nextVals: string[];
      if (exists) {
        nextVals = prev.values.filter(v => v !== val);
      } else {
        if (prev.values.length >= 3) {
          nextVals = [...prev.values.slice(1), val];
        } else {
          nextVals = [...prev.values, val];
        }
      }
      return { ...prev, values: nextVals };
    });
    updateResonance(1);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-2">
      {/* Progress Header */}
      <div className="flex flex-col w-full pt-2 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-[#ffb3b0] tracking-wider uppercase">Calibration</span>
          <span className="text-[12px] font-semibold text-[#ffb599]">Step 2 of 4 • 65%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#2e2736] overflow-hidden relative shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#ff5e62] via-[#d4bbff] to-[#ffb599] rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ width: '65%' }}
          />
        </div>
      </div>

      {/* Match DNA Blueprint Live Visualizer */}
      <div className="relative w-full rounded-2xl bg-[#201927]/90 backdrop-blur-xl p-5 shadow-2xl mb-6 overflow-hidden border border-white/10">
        {/* Ambient glowing light accent behind radar */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#582a9f]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#ff5e62]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b0] text-[20px]">insights</span>
            <h2 className="text-[20px] font-bold text-[#ebdef2] tracking-tight font-syne">Match DNA Blueprint</h2>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2e2736] text-[#ffb3b0] text-[11px] font-bold tracking-wider border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#ff5e62] animate-ping" />
            <span>SYNCHRONIZING</span>
          </div>
        </div>

        {/* Live Blueprint Graphic & Dynamic Stats */}
        <div className="flex flex-row items-center gap-4 relative z-10">
          {/* Polygonal Radar Visualizer */}
          <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-18deg filter drop-shadow-md" viewBox="0 0 100 100">
              <polygon 
                points="50,10 88,38 73,82 27,82 12,38" 
                fill="none" 
                stroke="#e1bebd" 
                strokeOpacity="0.2" 
                strokeWidth="0.75" 
              />
              <polygon 
                points="50,25 76,43 66,74 34,74 24,43" 
                fill="none" 
                stroke="#e1bebd" 
                strokeOpacity="0.15" 
                strokeWidth="0.75" 
              />
              <line x1="50" y1="50" x2="50" y2="10" stroke="#e1bebd" strokeOpacity="0.2" strokeWidth="0.75" />
              <line x1="50" y1="50" x2="88" y2="38" stroke="#e1bebd" strokeOpacity="0.2" strokeWidth="0.75" />
              <line x1="50" y1="50" x2="73" y2="82" stroke="#e1bebd" strokeOpacity="0.2" strokeWidth="0.75" />
              <line x1="50" y1="50" x2="27" y2="82" stroke="#e1bebd" strokeOpacity="0.2" strokeWidth="0.75" />
              <line x1="50" y1="50" x2="12" y2="38" stroke="#e1bebd" strokeOpacity="0.2" strokeWidth="0.75" />
              
              <polygon 
                id="dna-polygon"
                points={currentPolygon}
                className="transition-all duration-700 ease-out" 
                fill="url(#dnaGradient)" 
                stroke="#ffb3b0" 
                strokeWidth="2" 
              />
              <defs>
                <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5e62" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#582a9f" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb3b0] shadow-sm" />
            </div>
          </div>

          {/* Resonating Archetype Trait Badges */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold text-[#e1bebd] uppercase tracking-wider">CURRENT RESONANCE</span>
              <span className="text-[24px] font-bold text-[#ffb3b0] tracking-tight font-syne">{calib.resonance}%</span>
            </div>
            <p className="text-[16px] font-semibold text-[#ebdef2] truncate font-syne">
              {calib.archetype}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#582a9f]/60 text-[#d4bbff] text-[11px] font-semibold border border-[#d4bbff]/20">
                Intentional
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#2e2736] text-[#ffb599] text-[11px] font-semibold border border-white/5">
                Subtle Wit
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#2e2736] text-[#e1bebd] text-[11px] font-semibold border border-white/5">
                Warm Vinyl
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Blocks Container */}
      <div className="flex flex-col gap-7">
        {/* Question 1 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#393241] flex items-center justify-center text-[12px] font-bold text-[#ffb3b0]">
              1
            </span>
            <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">What brings you here?</h3>
          </div>

          <div className="flex flex-col gap-2">
            {/* Option 1 */}
            <button
              type="button"
              onClick={() => handleSelectIntent('serious')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between relative overflow-hidden border cursor-pointer ${
                calib.intent === 'serious'
                  ? 'bg-[#241d2b] shadow-lg border-[#ff5e62]/40'
                  : 'bg-[#201927] hover:bg-[#241d2b] border-white/5'
              }`}
            >
              {calib.intent === 'serious' && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e62]/20 to-[#582a9f]/20 opacity-100 pointer-events-none" />
              )}
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-2xl">💍</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[16px] font-semibold text-[#ebdef2]">Something serious &amp; intentional</span>
                  <span className={`text-[13px] ${calib.intent === 'serious' ? 'text-[#ffb3b0]' : 'text-[#e1bebd]'}`}>
                    Long-term alignment &amp; quiet dedication
                  </span>
                </div>
              </div>
              {calib.intent === 'serious' ? (
                <CheckCircle2 className="w-6 h-6 text-[#ffb3b0] relative z-10 flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-[#393241] flex-shrink-0" />
              )}
            </button>

            {/* Option 2 */}
            <button
              type="button"
              onClick={() => handleSelectIntent('meaningful')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between relative overflow-hidden border cursor-pointer ${
                calib.intent === 'meaningful'
                  ? 'bg-[#241d2b] shadow-lg border-[#ff5e62]/40'
                  : 'bg-[#201927] hover:bg-[#241d2b] border-white/5'
              }`}
            >
              {calib.intent === 'meaningful' && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e62]/20 to-[#582a9f]/20 opacity-100 pointer-events-none" />
              )}
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-2xl">✨</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[16px] font-semibold text-[#ebdef2]">Meaningful new connections</span>
                  <span className={`text-[13px] ${calib.intent === 'meaningful' ? 'text-[#ffb3b0]' : 'text-[#e1bebd]'}`}>
                    Curiosity without rigid scripts
                  </span>
                </div>
              </div>
              {calib.intent === 'meaningful' ? (
                <CheckCircle2 className="w-6 h-6 text-[#ffb3b0] relative z-10 flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-[#393241] flex-shrink-0" />
              )}
            </button>

            {/* Option 3 */}
            <button
              type="button"
              onClick={() => handleSelectIntent('spark')}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between relative overflow-hidden border cursor-pointer ${
                calib.intent === 'spark'
                  ? 'bg-[#241d2b] shadow-lg border-[#ff5e62]/40'
                  : 'bg-[#201927] hover:bg-[#241d2b] border-white/5'
              }`}
            >
              {calib.intent === 'spark' && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e62]/20 to-[#582a9f]/20 opacity-100 pointer-events-none" />
              )}
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-2xl">🌱</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[16px] font-semibold text-[#ebdef2]">Let's see where the spark goes</span>
                  <span className={`text-[13px] ${calib.intent === 'spark' ? 'text-[#ffb3b0]' : 'text-[#e1bebd]'}`}>
                    Effortless rhythm and unhurried dates
                  </span>
                </div>
              </div>
              {calib.intent === 'spark' ? (
                <CheckCircle2 className="w-6 h-6 text-[#ffb3b0] relative z-10 flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-[#393241] flex-shrink-0" />
              )}
            </button>
          </div>
        </div>

        {/* Question 2 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#393241] flex items-center justify-center text-[12px] font-bold text-[#ffb3b0]">
              2
            </span>
            <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">Your ideal weekend?</h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'coffee', icon: '☕', label: 'Cozy morning coffee & record stores' },
              { id: 'mountain', icon: '🏔️', label: 'Spontaneous mountain escape' },
              { id: 'city', icon: '🎷', label: 'Late-night city discoveries' },
              { id: 'rest', icon: '🛋️', label: 'Resting, reading & recharging' }
            ].map(item => {
              const isSelected = calib.weekend === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectWeekend(item.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-[#241d2b] shadow-md border-[#ff5e62]/40'
                      : 'bg-[#201927] hover:bg-[#241d2b] border-white/5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e62]/20 to-transparent pointer-events-none" />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`text-[16px] ${isSelected ? 'text-[#ebdef2] font-semibold' : 'text-[#ebdef2]'}`}>
                      {item.label}
                    </span>
                  </div>
                  <Heart className={`w-5 h-5 relative z-10 ${isSelected ? 'text-[#ff5e62] fill-[#ff5e62]' : 'text-[#393241]'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#393241] flex items-center justify-center text-[12px] font-bold text-[#ffb3b0]">
                3
              </span>
              <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">Pick your social energy</h3>
            </div>
            <span className="text-[12px] font-medium text-[#ffb599]">Balanced cadence</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-full bg-[#120b19] shadow-inner border border-white/5">
            <button
              type="button"
              onClick={() => handleSetEnergy('intro')}
              className={`py-3 px-2 rounded-full text-[13px] font-semibold text-center transition-all cursor-pointer ${
                calib.socialEnergy === 'intro'
                  ? 'bg-[#d4bbff] text-[#400688] font-bold shadow-md'
                  : 'text-[#e1bebd] hover:text-[#ebdef2]'
              }`}
            >
              Introvert
            </button>
            <button
              type="button"
              onClick={() => handleSetEnergy('ambi')}
              className={`py-3 px-2 rounded-full text-[13px] font-semibold text-center transition-all cursor-pointer ${
                calib.socialEnergy === 'ambi'
                  ? 'bg-[#d4bbff] text-[#400688] font-bold shadow-md'
                  : 'text-[#e1bebd] hover:text-[#ebdef2]'
              }`}
            >
              Ambivert
            </button>
            <button
              type="button"
              onClick={() => handleSetEnergy('extro')}
              className={`py-3 px-2 rounded-full text-[13px] font-semibold text-center transition-all cursor-pointer ${
                calib.socialEnergy === 'extro'
                  ? 'bg-[#d4bbff] text-[#400688] font-bold shadow-md'
                  : 'text-[#e1bebd] hover:text-[#ebdef2]'
              }`}
            >
              Social Butterfly
            </button>
          </div>
        </div>

        {/* Question 4 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#393241] flex items-center justify-center text-[12px] font-bold text-[#ffb3b0]">
                4
              </span>
              <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">Core values that matter most</h3>
            </div>
            <div className="px-2.5 py-0.5 rounded-full bg-[#2e2736] text-[#ffb3b0] text-[12px] font-semibold border border-white/5">
              {calib.values.length} of 3 chosen
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Humor & Wit',
              'Unspoken Kindness',
              'Ambition & Drive',
              'Creativity & Art',
              'Open Communication'
            ].map(val => {
              const active = calib.values.includes(val);
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleToggleValue(val)}
                  className={`h-10 px-4 rounded-full text-[13px] font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#582a9f]/40 text-[#ebdef2] border-[#d4bbff]/40 shadow-md'
                      : 'bg-[#201927] text-[#e1bebd] hover:text-[#ebdef2] border-white/5'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${active ? 'bg-[#d4bbff]' : 'bg-[#594040]'}`} />
                  <span>{val}</span>
                  {active ? (
                    <Check className="w-4 h-4 text-[#d4bbff]" />
                  ) : (
                    <Plus className="w-4 h-4 text-[#a98988]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Island */}
      <div className="fixed bottom-4 inset-x-4 sm:max-w-md sm:mx-auto z-40">
        <div className="w-full rounded-full bg-[#393241]/95 backdrop-blur-2xl p-2 shadow-2xl flex items-center justify-between gap-3 border border-white/10">
          {/* Back Action Button */}
          <button
            type="button"
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-[#2e2736] hover:bg-[#3e3645] flex items-center justify-center text-[#ebdef2] transition-colors flex-shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Primary Gradient Save & Continue Button */}
          <button
            id="btn-save-continue"
            type="button"
            onClick={onContinue}
            className="flex-1 h-12 rounded-full bg-gradient-to-r from-[#ff5e62] via-[#d67f5b] to-[#ffb3b0] text-[#64000f] text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Save &amp; Continue</span>
            <ArrowRight className="w-5 h-5 text-[#64000f]" />
          </button>
        </div>
      </div>
    </div>
  );
};
