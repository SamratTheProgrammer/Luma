export type ScreenType = 
  | 'welcome' 
  | 'calibration' 
  | 'discover' 
  | 'match-detail' 
  | 'explore' 
  | 'sparks' 
  | 'chats' 
  | 'profile';

export interface AffinityMetric {
  label: string;
  score: number;
  iconName: string;
}

export interface PillarMetric {
  title: string;
  score: number;
  description: string;
  iconName: string;
  gradient: string;
}

export interface VoicePrompt {
  promptQuestion: string;
  durationSeconds: number;
  waveform: number[];
}

export interface DateInvitation {
  title: string;
  venue: string;
  scheduledTime: string;
  status: 'pending' | 'accepted' | 'declined';
  proposedBy: 'me' | 'them';
}

export interface CuratedProfile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  distance: string;
  matchDnaScore: number;
  overlapScore: number;
  archetype: string;
  avatarUrl: string;
  detailPhotoUrl: string;
  bio: string;
  whyClickHeadline: string;
  whyClickDetail: string;
  affinities: AffinityMetric[];
  interests: string[];
  weekendPrompt: string;
  voicePrompt?: VoicePrompt;
  dateSuggestion: {
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
  };
  pillars: PillarMetric[];
  resonancePoints: string;
}

export interface CalibrationState {
  step: number;
  totalSteps: number;
  percentage: number;
  intent: string;
  weekend: string;
  socialEnergy: 'intro' | 'ambi' | 'extro';
  values: string[];
  resonance: number;
  archetype: string;
}

export interface SparkItem {
  id: string;
  profileId: string;
  name: string;
  avatarUrl: string;
  timestamp: string;
  preview: string;
  matchScore: number;
  status: 'sent' | 'received' | 'mutual';
  type?: 'spark' | 'date-invite' | 'prompt-reply';
}

