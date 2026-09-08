import React, { useState, useEffect, useRef } from 'react';
import { VoicePrompt } from '../types';
import { Play, Pause, Mic, Volume2 } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface VoicePromptCardProps {
  voicePrompt: VoicePrompt;
  name: string;
}

export const VoicePromptCard: React.FC<VoicePromptCardProps> = ({ voicePrompt, name }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Play a soft, warm ambient chord progression mimicking vocal warmth
      const ctx = audioCtxRef.current;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc1.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 1.2); // E4
      osc2.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc2.frequency.exponentialRampToValueAtTime(554.37, ctx.currentTime + 1.2); // C#5

      gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.7);
      osc2.stop(ctx.currentTime + 1.7);
    } catch {
      // Audio not supported or restricted by autoplay policy
    }
  };

  const togglePlay = () => {
    triggerHaptic('tap');
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      startTone();
      const startTime = Date.now() - (progress / 100) * voicePrompt.durationSeconds * 1000;
      intervalRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const pct = (elapsed / voicePrompt.durationSeconds) * 100;
        if (pct >= 100) {
          setProgress(0);
          setIsPlaying(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          setProgress(pct);
        }
      }, 50);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const currentSeconds = Math.floor((progress / 100) * voicePrompt.durationSeconds);
  const formattedTime = `0:${currentSeconds.toString().padStart(2, '0')}`;
  const totalTime = `0:${voicePrompt.durationSeconds.toString().padStart(2, '0')}`;

  return (
    <div className="p-4 rounded-2xl bg-[#241d2b] border border-white/10 shadow-md flex flex-col gap-3 relative overflow-hidden">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#582a9f]/50 text-[#d4bbff] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] font-bold text-[#d4bbff] uppercase tracking-wider">
            {name}'s Voice Spark
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#ffb599] font-medium">
          {isPlaying ? formattedTime : totalTime}
        </span>
      </div>

      <p className="text-[14px] text-[#ebdef2] font-medium leading-snug">
        "{voicePrompt.promptQuestion}"
      </p>

      {/* Waveform Player Bar */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause voice prompt' : 'Play voice prompt'}
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#ff5e62] to-[#ffb599] text-[#64000f] flex items-center justify-center flex-shrink-0 shadow-md active:scale-90 transition-transform cursor-pointer"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-[#64000f]" /> : <Play className="w-5 h-5 fill-[#64000f] ml-0.5" />}
        </button>

        {/* Animated Waveform Bars */}
        <div className="flex-1 flex items-center gap-[3px] h-9 px-2 rounded-xl bg-[#17111e]/60 border border-white/5 overflow-hidden">
          {voicePrompt.waveform.map((val, idx) => {
            const barProgress = (idx / voicePrompt.waveform.length) * 100;
            const isPlayed = barProgress <= progress;
            return (
              <div
                key={idx}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: isPlaying ? `${Math.max(20, Math.min(100, val + (Math.sin(idx + Date.now() / 100) * 20)))}%` : `${val}%`,
                  backgroundColor: isPlayed ? '#ff5e62' : '#3e3645'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
