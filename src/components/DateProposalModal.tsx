import React, { useState } from 'react';
import { CuratedProfile, DateInvitation } from '../types';
import { X, Calendar, Clock, MapPin, Sparkles, Send, Check } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import confetti from 'canvas-confetti';

interface DateProposalModalProps {
  isOpen: boolean;
  profile: CuratedProfile;
  onClose: () => void;
  onSendDateInvite: (invitation: DateInvitation) => void;
}

export const DateProposalModal: React.FC<DateProposalModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSendDateInvite
}) => {
  const [selectedVenue, setSelectedVenue] = useState(profile.dateSuggestion.title);
  const [selectedSlot, setSelectedSlot] = useState('Saturday 11:00 AM (Morning Rhythm)');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const dateOptions = [
    {
      title: profile.dateSuggestion.title,
      description: profile.dateSuggestion.description,
      tag: 'Curated 94% Overlap'
    },
    {
      title: 'Hi-Fi Record Lounge & Natural Wine',
      description: 'Unhurried analog listening session in Soho.',
      tag: 'Sonic Chemistry'
    },
    {
      title: 'Architectural Bookstore & Cortados',
      description: 'Hidden cobblestone sanctuary with sunny skylights.',
      tag: 'Conversational'
    }
  ];

  const timeSlots = [
    'Friday 6:30 PM (Golden Hour)',
    'Saturday 11:00 AM (Morning Rhythm)',
    'Sunday 4:30 PM (Dusk Espresso)'
  ];

  const handleDispatch = () => {
    triggerHaptic('super');
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ff5e62', '#ffb599', '#d4bbff', '#ffffff']
    });

    const invitation: DateInvitation = {
      title: selectedVenue,
      venue: 'SoHo / Lower Manhattan',
      scheduledTime: selectedSlot,
      status: 'pending',
      proposedBy: 'me'
    };

    onSendDateInvite(invitation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-[#201927] p-5 sm:p-6 shadow-2xl border border-white/10 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#ff5e62]/20 text-[#ff5e62] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-[18px] font-bold text-[#ebdef2] font-syne">Propose a Curated Date</h3>
              <p className="text-[11px] text-[#e1bebd]">Match DNA suggested experience with {profile.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1bebd] hover:bg-[#2e2736] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Venue / Activity Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#e1bebd] uppercase tracking-wider">
            1. Select Experience
          </span>
          <div className="flex flex-col gap-2">
            {dateOptions.map((opt) => (
              <button
                key={opt.title}
                type="button"
                onClick={() => {
                  triggerHaptic('tap');
                  setSelectedVenue(opt.title);
                }}
                className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                  selectedVenue === opt.title
                    ? 'bg-[#2e2736] border-[#ff5e62] shadow-md'
                    : 'bg-[#1a1421] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#ebdef2] font-syne">{opt.title}</span>
                  <span className="text-[10px] font-bold text-[#ffb599] bg-[#ff5e62]/20 px-2 py-0.5 rounded-full">
                    {opt.tag}
                  </span>
                </div>
                <p className="text-[11px] text-[#e1bebd] mt-1 leading-snug">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#e1bebd] uppercase tracking-wider">
            2. Choose Cadence &amp; Time
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  triggerHaptic('tap');
                  setSelectedSlot(slot);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[12px] font-medium transition-all border cursor-pointer ${
                  selectedSlot === slot
                    ? 'bg-[#582a9f]/40 border-[#d4bbff] text-[#ebdcff] font-bold'
                    : 'bg-[#1a1421] border-white/5 text-[#e1bebd]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ffb599]" />
                  <span>{slot}</span>
                </div>
                {selectedSlot === slot && <Check className="w-4 h-4 text-[#d4bbff]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Note */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-bold text-[#e1bebd] uppercase tracking-wider">
            3. Thought / Icebreaker Note
          </span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. First round of cortados is on me! Let's check out that skylight..."
            className="w-full h-11 px-3.5 rounded-xl bg-[#120b19] text-[#ebdef2] text-[13px] placeholder-[#e1bebd]/40 outline-none border border-white/10 focus:border-[#ff5e62]"
          />
        </div>

        {/* Send Action */}
        <button
          type="button"
          onClick={handleDispatch}
          className="w-full h-12 mt-1 rounded-full bg-gradient-to-r from-[#ff5e62] to-[#ffb599] text-[#64000f] font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Send Date Invitation to {profile.name} ✨</span>
        </button>
      </div>
    </div>
  );
};
