import React, { useState } from 'react';
import { CuratedProfile } from '../../types';
import { PROFILES } from '../../data/mockData';
import { Sparkles, Heart, Zap, SlidersHorizontal, MapPin } from 'lucide-react';

interface ExploreScreenProps {
  onSelectProfile: (profile: CuratedProfile) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onSelectProfile }) => {
  const [selectedVibe, setSelectedVibe] = useState('All');

  const vibes = [
    'All',
    'Late-Night Intimacy',
    'Sunday Jazz',
    'Bookworms',
    'Modern Art'
  ];

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-2">
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-[24px] font-bold text-[#ebdef2] font-syne">Curated Lounges</h2>
        <p className="text-[13px] text-[#e1bebd]">
          Explore people clustered by shared rhythm and creative frequency.
        </p>
      </div>

      {/* Horizontal Vibe Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
        {vibes.map(vibe => (
          <button
            key={vibe}
            type="button"
            onClick={() => setSelectedVibe(vibe)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              selectedVibe === vibe
                ? 'bg-[#d4bbff] text-[#400688] font-bold border-[#d4bbff] shadow-md'
                : 'bg-[#241d2b] text-[#e1bebd] hover:text-[#ebdef2] border-white/5'
            }`}
          >
            {vibe}
          </button>
        ))}
      </div>

      {/* Explore Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        {PROFILES.map(profile => (
          <div
            key={profile.id}
            onClick={() => onSelectProfile(profile)}
            className="group relative rounded-2xl bg-[#201927] overflow-hidden shadow-xl border border-white/10 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#120b19]">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201927] via-transparent to-transparent opacity-90" />
              
              {/* Match DNA pill */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#120b19]/80 backdrop-blur-md border border-white/10 shadow">
                <Sparkles className="w-3 h-3 text-[#ff5e62]" />
                <span className="text-[12px] font-bold text-[#ebdef2] font-syne">{profile.matchDnaScore}%</span>
              </div>

              {/* Identity & Archetype info */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-0.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">
                    {profile.name}, {profile.age}
                  </h3>
                  <span className="text-[11px] text-[#ffb599] font-medium">{profile.distance}</span>
                </div>
                <p className="text-[12px] text-[#e1bebd]">{profile.occupation}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#2e2736] text-[#d4bbff] text-[10px] font-semibold border border-white/5">
                    {profile.archetype}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#2e2736] text-[#e1bebd] text-[10px] font-medium border border-white/5">
                    {profile.interests[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
