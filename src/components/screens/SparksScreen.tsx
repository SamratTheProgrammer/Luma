import React, { useState } from 'react';
import { SparkItem, CuratedProfile } from '../../types';
import { PROFILES } from '../../data/mockData';
import { Flame, MessageCircle, Heart, ArrowRight, Zap, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface SparksScreenProps {
  sparks: SparkItem[];
  onOpenChat: (profile: CuratedProfile) => void;
  onViewMatchDetail: (profile: CuratedProfile) => void;
}

export const SparksScreen: React.FC<SparksScreenProps> = ({
  sparks,
  onOpenChat,
  onViewMatchDetail
}) => {
  const [filter, setFilter] = useState<'all' | 'mutual' | 'dates'>('all');

  const filteredSparks = sparks.filter(spark => {
    if (filter === 'mutual') return spark.status === 'mutual';
    if (filter === 'dates') return spark.preview.toLowerCase().includes('date') || spark.id.includes('date');
    return true;
  });

  return (
    <div className="flex flex-col w-full px-4 sm:px-5 pb-28 pt-2">
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-[#ff5e62] fill-[#ff5e62]" />
          <h2 className="text-[24px] font-bold text-[#ebdef2] font-syne">Sparks Lounge</h2>
        </div>
        <p className="text-[13px] text-[#e1bebd]">
          Mutual wavelengths, date inspirations, and active conversation catalysts.
        </p>
      </div>

      {/* Mobile Filter Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-none py-1">
        {[
          { id: 'all', label: `All (${sparks.length})` },
          { id: 'mutual', label: 'Mutual Wavelengths' },
          { id: 'dates', label: 'Curated Dates' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              triggerHaptic('tap');
              setFilter(tab.id as 'all' | 'mutual' | 'dates');
            }}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all border cursor-pointer ${
              filter === tab.id
                ? 'bg-[#ff5e62] text-[#64000f] font-bold border-[#ff5e62]'
                : 'bg-[#241d2b] text-[#e1bebd] border-white/5 hover:bg-[#2e2736]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sparks List */}
      <div className="flex flex-col gap-3">
        {filteredSparks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#201927] border border-white/5 flex flex-col items-center gap-2">
            <Sparkles className="w-8 h-8 text-[#ffb599]" />
            <p className="text-[14px] font-semibold text-[#ebdef2]">No items in this category yet</p>
            <p className="text-[12px] text-[#e1bebd]">Send a spark or propose a curated date from Discover to see them here.</p>
          </div>
        ) : (
          filteredSparks.map(spark => {
            const profile = PROFILES.find(p => p.id === spark.profileId) || PROFILES[0];
            const isDate = spark.preview.toLowerCase().includes('date') || spark.id.includes('date');

            return (
              <div
                key={spark.id}
                className="p-4 rounded-2xl bg-[#201927] border border-white/10 shadow-lg flex flex-col gap-3 transition-all hover:bg-[#241d2b]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      onClick={() => {
                        triggerHaptic('tap');
                        onViewMatchDetail(profile);
                      }}
                      className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff5e62] cursor-pointer"
                    >
                      <img 
                        src={spark.avatarUrl} 
                        alt={spark.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[16px] font-bold text-[#ebdef2] font-syne">{spark.name}</span>
                        {spark.status === 'mutual' && (
                          <span className="px-2 py-0.5 rounded-full bg-[#582a9f]/50 text-[#d4bbff] text-[10px] font-bold border border-[#d4bbff]/20">
                            Mutual Spark
                          </span>
                        )}
                        {isDate && (
                          <span className="px-2 py-0.5 rounded-full bg-[#ff5e62]/20 text-[#ffb599] text-[10px] font-bold border border-[#ff5e62]/30 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#ff5e62]" />
                            Date Proposed
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#ffb599]">{spark.timestamp} • {spark.matchScore}% Match DNA</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('tap');
                      onViewMatchDetail(profile);
                    }}
                    className="w-9 h-9 rounded-full bg-[#2e2736] hover:bg-[#393241] flex items-center justify-center text-[#ffb3b0] border border-white/5 cursor-pointer"
                    title="View Match Detail"
                  >
                    <Zap className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[13px] text-[#e1bebd] italic bg-[#17111e]/70 p-3 rounded-xl border border-white/5">
                  {spark.preview}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('tap');
                      onViewMatchDetail(profile);
                    }}
                    className="text-[12px] font-semibold text-[#d4bbff] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Aura Sync</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('tap');
                      onOpenChat(profile);
                    }}
                    className="px-4 py-2 rounded-full bg-[#ff5e62] hover:bg-[#ff758c] text-[#64000f] text-[12px] font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#64000f]" />
                    <span>Open Chat</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
