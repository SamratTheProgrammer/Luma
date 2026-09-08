import React, { useState, useRef, useEffect } from 'react';
import { CuratedProfile, DateInvitation } from '../../types';
import { ArrowLeft, Send, Sparkles, Coffee, Calendar, CheckCheck, Clock, Check, X, Compass } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';
import { DateProposalModal } from '../DateProposalModal';
import confetti from 'canvas-confetti';

interface ChatScreenProps {
  profile: CuratedProfile;
  onBack: () => void;
  onViewMatchDetail: () => void;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
  dateInvite?: DateInvitation;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  profile,
  onBack,
  onViewMatchDetail
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'them',
      text: `Hey! I saw you loved 35mm film and slow coffee mornings too. That rooftop in Soho is actually right by my architecture studio!`,
      time: '10:42 PM'
    },
    {
      id: 'm2',
      sender: 'me',
      text: `No way! Do you ever grab cortados at that spot with the brass counter on Prince Street?`,
      time: '10:45 PM'
    },
    {
      id: 'm3',
      sender: 'them',
      text: `Yes!! That's practically my secondary desk. Best natural light in the whole neighborhood. Have you been there on Sunday afternoons?`,
      time: '10:48 PM'
    },
    {
      id: 'm4',
      sender: 'them',
      text: '',
      time: '10:49 PM',
      dateInvite: {
        title: 'Architecture Walk & Rooftop Cortado',
        venue: 'Prince St & Mercer • Soho',
        scheduledTime: 'Saturday 11:00 AM',
        status: 'pending',
        proposedBy: 'them'
      }
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const icebreakers = [
    `☕ Free for that Cortado this Saturday?`,
    `🎞️ 35mm film debate: color or black & white?`,
    `🏛️ Favorite secret architectural spot in the city?`
  ];

  const handleSend = (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    triggerHaptic('spark');
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: textToSend.trim(),
      time: 'Just now'
    };
    setMessages(prev => [...prev, newMsg]);
    if (!customText) setInputVal('');

    // Simulate realistic typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      triggerHaptic('tap');
      const replies = [
        "I love that idea! That skylight is unbeatable around 11am.",
        "Spot on! We definitely have an uncommon amount in common.",
        "Count me in. Let's make it happen!"
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'them',
          text: reply,
          time: 'Just now'
        }
      ]);
    }, 1500);
  };

  const handleAcceptDate = (inviteMsgId: string) => {
    triggerHaptic('super');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff5e62', '#d4bbff', '#ffb599', '#ffffff']
    });

    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === inviteMsgId && msg.dateInvite) {
          return {
            ...msg,
            dateInvite: {
              ...msg.dateInvite,
              status: 'accepted'
            }
          };
        }
        return msg;
      })
    );

    // Auto post confirmation message
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `msg-confirm-${Date.now()}`,
          sender: 'me',
          text: `It's a date! Can't wait for Saturday at 11:00 AM ✨`,
          time: 'Just now'
        }
      ]);
    }, 400);
  };

  const handleSendDateInviteFromModal = (invitation: DateInvitation) => {
    triggerHaptic('spark');
    const dateMsg: Message = {
      id: `msg-invite-${Date.now()}`,
      sender: 'me',
      text: '',
      time: 'Just now',
      dateInvite: invitation
    };
    setMessages(prev => [...prev, dateMsg]);

    // Simulate acceptance from match
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      triggerHaptic('super');
      setMessages(prev => [
        ...prev,
        {
          id: `msg-accept-${Date.now()}`,
          sender: 'them',
          text: `Yes! I would love that. Let's meet right outside the cafe entrance! ✨☕`,
          time: 'Just now'
        }
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-120px)] pb-24 px-4 sm:px-5 pt-2">
      {/* Chat Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => {
              triggerHaptic('tap');
              onBack();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#241d2b] text-[#ebdef2] hover:bg-[#2e2736] active:scale-95 transition-all border border-white/5 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div 
            onClick={() => {
              triggerHaptic('tap');
              onViewMatchDetail();
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#ff5e62]/50">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ff5e62] ring-2 ring-[#17111e]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] font-bold text-[#ebdef2] font-syne">{profile.name}</span>
                <span className="text-[11px] font-bold text-[#d4bbff] bg-[#582a9f]/40 px-2 py-0.5 rounded-full">
                  {profile.matchDnaScore}% DNA
                </span>
              </div>
              <span className="text-[11px] text-[#ffb3b0]">Active now • {profile.occupation}</span>
            </div>
          </div>
        </div>

        {/* Propose Date Button in Header */}
        <button
          type="button"
          onClick={() => {
            triggerHaptic('tap');
            setIsDateModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#241d2b] hover:bg-[#2e2736] text-[#ffb599] text-[11px] font-bold border border-[#ffb599]/20 shadow-sm active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#ff5e62]" />
          <span>Propose Date</span>
        </button>
      </div>

      {/* Suggested Date Anchor Banner */}
      <div 
        onClick={() => {
          triggerHaptic('tap');
          setIsDateModalOpen(true);
        }}
        className="p-3 rounded-2xl bg-gradient-to-r from-[#582a9f]/30 to-[#ff5e62]/20 border border-[#d4bbff]/20 flex items-center justify-between gap-2 mb-2 cursor-pointer shadow-sm hover:brightness-110 active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Coffee className="w-4 h-4 text-[#ffb599] flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-bold text-[#ebdef2] truncate">{profile.dateSuggestion.title}</span>
            <span className="text-[10px] text-[#d4bbff]">Curated Date Plan • {profile.overlapScore}% Overlap</span>
          </div>
        </div>
        <span className="text-[11px] text-[#ff5e62] font-semibold flex-shrink-0">Plan Now →</span>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 py-2 pr-1 scrollbar-none">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            {/* Standard Text Message */}
            {msg.text && (
              <div
                className={`p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-md ${
                  msg.sender === 'me'
                    ? 'bg-gradient-to-r from-[#ff5e62] to-[#d67f5b] text-[#64000f] font-medium rounded-tr-xs'
                    : 'bg-[#241d2b] text-[#ebdef2] rounded-tl-xs border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            )}

            {/* In-Stream Curated Date Card */}
            {msg.dateInvite && (
              <div className="w-full min-w-[260px] p-4 rounded-2xl bg-gradient-to-br from-[#2e2736] to-[#201927] border border-[#ff5e62]/40 shadow-xl flex flex-col gap-2.5 mt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#ffb599]">
                    <Calendar className="w-4 h-4 text-[#ff5e62]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {msg.dateInvite.proposedBy === 'me' ? 'Your Date Invitation' : `${profile.name} Invited You`}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    msg.dateInvite.status === 'accepted'
                      ? 'bg-[#582a9f] text-[#d4bbff]'
                      : 'bg-[#ff5e62]/20 text-[#ffb599]'
                  }`}>
                    {msg.dateInvite.status === 'accepted' ? 'Confirmed ✨' : 'Awaiting RSVP'}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h4 className="text-[15px] font-bold text-[#ebdef2] font-syne">
                    {msg.dateInvite.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#e1bebd]">
                    <Clock className="w-3.5 h-3.5 text-[#ffb599]" />
                    <span>{msg.dateInvite.scheduledTime}</span>
                  </div>
                </div>

                {/* RSVP Actions if pending and received */}
                {msg.dateInvite.status === 'pending' && msg.dateInvite.proposedBy === 'them' && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleAcceptDate(msg.id)}
                      className="flex-1 py-2 rounded-full bg-gradient-to-r from-[#ff5e62] to-[#ffb599] text-[#64000f] text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept Invitation ✨</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('tap');
                        setIsDateModalOpen(true);
                      }}
                      className="px-3 py-2 rounded-full bg-[#1a1421] text-[#e1bebd] text-[11px] font-medium border border-white/5 active:scale-95 transition-transform cursor-pointer"
                    >
                      Counter
                    </button>
                  </div>
                )}

                {msg.dateInvite.status === 'accepted' && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#d4bbff] font-medium bg-[#582a9f]/30 p-2 rounded-xl">
                    <Check className="w-3.5 h-3.5 text-[#ff5e62]" />
                    <span>Locked in! We'll remind you 2 hours prior.</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-1 mt-1 px-1">
              <span className="text-[10px] text-[#e1bebd]/60">{msg.time}</span>
              {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-[#ffb3b0]" />}
            </div>
          </div>
        ))}

        {/* Animated Typing Indicator */}
        {isTyping && (
          <div className="self-start flex items-center gap-1.5 p-3 rounded-2xl bg-[#241d2b] border border-white/5 w-16">
            <span className="w-2 h-2 rounded-full bg-[#ff5e62] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#ffb599] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#d4bbff] animate-bounce [animation-delay:0.4s]" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Smart Icebreaker Suggestions Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1.5 mb-1">
        {icebreakers.map(chip => (
          <button
            key={chip}
            type="button"
            onClick={() => handleSend(chip)}
            className="px-3 py-1.5 rounded-full bg-[#241d2b] text-[#ebdef2] hover:bg-[#2e2736] text-[11px] font-medium whitespace-nowrap border border-white/5 active:scale-95 transition-all flex-shrink-0 cursor-pointer"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div>
        <div className="relative flex items-center bg-[#201927] rounded-full border border-white/10 p-1.5 shadow-lg">
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${profile.name}...`}
            className="flex-1 bg-transparent px-4 text-[#ebdef2] placeholder-[#e1bebd]/50 text-[14px] outline-none"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            aria-label="Send message"
            className="w-10 h-10 rounded-full bg-[#ff5e62] text-[#64000f] flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Date Proposal Modal */}
      <DateProposalModal
        isOpen={isDateModalOpen}
        profile={profile}
        onClose={() => setIsDateModalOpen(false)}
        onSendDateInvite={handleSendDateInviteFromModal}
      />
    </div>
  );
};
