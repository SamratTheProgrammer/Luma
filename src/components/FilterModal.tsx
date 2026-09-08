import React, { useState, useEffect } from 'react';
import { X, Check, Mic, ShieldCheck, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (distance: number, minDna: number) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [distance, setDistance] = useState(() => {
    return Number(localStorage.getItem('filter_distance')) || 5;
  });
  const [minDna, setMinDna] = useState(() => {
    return Number(localStorage.getItem('filter_min_dna')) || 88;
  });
  const [selectedPill, setSelectedPill] = useState('All Vibes');
  const [voiceOnly, setVoiceOnly] = useState(() => {
    return localStorage.getItem('filter_voice_only') === 'true';
  });
  const [ghostFreeOnly, setGhostFreeOnly] = useState(() => {
    return localStorage.getItem('filter_ghost_free') !== 'false';
  });

  if (!isOpen) return null;

  const handleApply = () => {
    triggerHaptic('success');
    localStorage.setItem('filter_distance', String(distance));
    localStorage.setItem('filter_min_dna', String(minDna));
    localStorage.setItem('filter_voice_only', String(voiceOnly));
    localStorage.setItem('filter_ghost_free', String(ghostFreeOnly));

    onApply(distance, minDna);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-[#201927] p-6 shadow-2xl border border-white/10 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-1 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#ff5e62]/20 text-[#ff5e62] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-[20px] font-bold text-[#ebdef2] font-syne">Discovery Filters</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1bebd] hover:bg-[#2e2736] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Distance Range */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#ebdef2]">Maximum Distance</span>
            <span className="text-[13px] font-bold text-[#ffb599] font-mono">{distance} miles</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={distance}
            onChange={e => {
              setDistance(Number(e.target.value));
              triggerHaptic('light');
            }}
            className="w-full accent-[#ff5e62] cursor-pointer"
          />
        </div>

        {/* Minimum Match DNA */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-[#ebdef2]">Minimum Match DNA Resonance</span>
            <span className="text-[13px] font-bold text-[#d4bbff] font-mono">{minDna}%</span>
          </div>
          <input
            type="range"
            min="70"
            max="98"
            value={minDna}
            onChange={e => {
              setMinDna(Number(e.target.value));
              triggerHaptic('light');
            }}
            className="w-full accent-[#d4bbff] cursor-pointer"
          />
        </div>

        {/* Mobile Verification Options */}
        <div className="flex flex-col gap-2.5 pt-1">
          <span className="text-[12px] font-bold text-[#e1bebd] uppercase tracking-wider">
            Curated Safeguards
          </span>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-[#17111e]/70 border border-white/5 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Mic className="w-4 h-4 text-[#ffb599]" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#ebdef2]">Voice Spark Verified</span>
                <span className="text-[11px] text-[#e1bebd]">Only profiles with voice prompts</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={voiceOnly}
              onChange={e => {
                triggerHaptic('tap');
                setVoiceOnly(e.target.checked);
              }}
              className="w-5 h-5 accent-[#ff5e62] rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-[#17111e]/70 border border-white/5 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#d4bbff]" />
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#ebdef2]">Ghost-Free Members</span>
                <span className="text-[11px] text-[#e1bebd]">High responsiveness reputation</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={ghostFreeOnly}
              onChange={e => {
                triggerHaptic('tap');
                setGhostFreeOnly(e.target.checked);
              }}
              className="w-5 h-5 accent-[#d4bbff] rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Vibe Clusters */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#e1bebd] uppercase tracking-wider">Curated Archetypes</span>
          <div className="flex flex-wrap gap-2">
            {['All Vibes', 'Soulful Conversationalist', 'Intuitive Creator', 'Analog Alchemist'].map(vibe => (
              <button
                key={vibe}
                type="button"
                onClick={() => {
                  triggerHaptic('tap');
                  setSelectedPill(vibe);
                }}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer border ${
                  selectedPill === vibe
                    ? 'bg-[#ff5e62] text-[#64000f] font-bold border-[#ff5e62]'
                    : 'bg-[#241d2b] text-[#e1bebd] border-white/5'
                }`}
              >
                {vibe}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#ff5e62] via-[#d67f5b] to-[#ffb3b0] text-[#64000f] text-[14px] font-bold shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          Apply Filters &amp; Refresh
        </button>
      </div>
    </div>
  );
};
