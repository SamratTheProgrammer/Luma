import { CuratedProfile, CalibrationState, SparkItem } from '../types';

export const LUMA_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1V0BRuUQss917BwSpFMUhmM0fHnIqjAwqerhp2L1i0ZCYfnwHgn0DrkKIvkZsmXugah8JB3pDzctelwzIgfJrO3ZW9vaG7FdQiVO4G-0p1CpKOWiH31kN7q7hoAO0yvJhmZJgwSKFQ9EwVwpOAqUuEmyxbAhJEwF4aFCHMV5l15Hi9f7c9_eAKiFzkTLcDJsT997eQVqKM0ctv0gosm3GgThk_BzwKmONGQpNxRYaIEuWRQpTGQ-PMhOUU',
  userAvatar: 'https://lh3.googleusercontent.com/aida/AEtjO1V0BRuUQss917BwSpFMUhmM0fHnIqjAwqerhp2L1i0ZCYfnwHgn0DrkKIvkZsmXugah8JB3pDzctelwzIgfJrO3ZW9vaG7FdQiVO4G-0p1CpKOWiH31kN7q7hoAO0yvJhmZJgwSKFQ9EwVwpOAqUuEmyxbAhJEwF4aFCHMV5l15Hi9f7c9_eAKiFzkTLcDJsT997eQVqKM0ctv0gosm3GgThk_BzwKmONGQpNxRYaIEuWRQpTGQ-PMhOUU',
  // Portrait of man in coffee shop
  avatarLeft: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp-ZmZAczrsVxg5nFeBx-tQUJuhBRigruTR5ufL4WOakU_4t2mjj7f6Jj4nSFhFG6en72FSte977KkDoBVJXQVl51Ry90IsrEUL3bdpD2qqPl1_729CClGAQzv55-fjEGeRQ7-X-j9JtqA99ocZNUccHa2mrtzP_QMjolH7GVb49SeHP5VO4_wP4QFYXb8rNySpN7aGt0r3SHaKLEWXVblvA7p9mwdctrIbyHtjat809T_t7WaDUQS',
  // Portrait of Elena with glasses on rooftop
  avatarRight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV8K_iHYlGfiCvR_lurw-tyrbLGB-KUIZFxWaYnblKYULQAbed28etDRUTsUk4g6HKiovRcPVsg-uhed-Voz2-vLmZXw0pIiv0Ie54fuWVDbm5KxIWMmjAau8rfEFKJ5tCpDUK6s2vmuxV7f__QdhFi_C3iGS_yK3hW3ZjCDiCWi0QHJ3S40p-R3QnvGRadKHE7yQORNYq6K-SVwyIST02pz5K-2M4SjRxnwGgL72ep_7E9aUa8xAD',
  // Portrait of woman with bun smiling in golden light
  avatarCenter: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP_1OxF4vjDB7nWPTjahlNlgnha8QFYsBpSSEW2nPDHccR7GQnynFpEgjVs41lRkTrZBJv2XXYG7eYqJNuNxbE05joclxT_V0hqrh4ADAdxJdLPSQUM5eQ9glIkhn9UzO60HqnqsslgkbvIvGF4wz2tZn87Y4pxvaOvUdi2mCzg_HxuMCbAuxWxI0MU0uXv_4Rget0tWVcGrayop2qk_lduhiQ3nGLxh-ngRrQLwkOXd1RZ5d2s0HD',
  // Elena detail portrait
  elenaDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABA6zSzmhPCKyWKgVdCLAXX3naaia4nucKWjV98e0sXG9L4mo605MBoTacGQvAgsOT0phJT3nh5szkRV3YTThVMnEUstLOOe1vkkmo9B0js5KBSQ7La3EV0T0-wP-Q5JircyiqzzgBbegMqJn8yc1APNbBUcWsowEVJPvd94hdn6qDhiNcXiUlDQKIme8Mmbo26mk4-W60hMX089fUjopqCNzAcjUtQ_JSKI-ZjCU_FkXgFYivKYnQ',
  // Rooftop terrace photo for algorithmic date recommendation
  rooftopDate: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUqciW75myt1IXntu458JiHzN7J8Y00u5vpfLA0neoOyMzDos0mpUcz1EEuB8GOFYM8hZFdRBNPFPQeJ0CXz2O4kj6_s91dVKMxTgUGhzelkDbNcHW8YcPWr29ezjRkGxCUbpWIG817AVQStZQUdn-a6I8yJmHBh31IHtB9cf2wfINm306XM3dMsWqqo28K8mIO7PrBjQi26-QhjIitoS6rN_lEa494D6ZVc2MDSpCBjYLYi1F85FJ'
};

export const PROFILES: CuratedProfile[] = [
  {
    id: 'elena-27',
    name: 'Elena',
    age: 27,
    occupation: 'Lead Architect',
    distance: '2 miles away',
    matchDnaScore: 94,
    overlapScore: 92,
    archetype: 'Soulful Conversationalist',
    avatarUrl: LUMA_ASSETS.avatarRight,
    detailPhotoUrl: LUMA_ASSETS.elenaDetail,
    bio: 'Architecture designer by day, natural wine sleuth by night. Looking for someone to get lost in old bookstores and debate modern art with.',
    whyClickHeadline: 'You both thrive on spontaneous road trips, Sunday matcha rituals, and indie cinema.',
    whyClickDetail: 'High overlap in leisure cadence and weekend rhythms',
    affinities: [
      { label: 'Personality', score: 96, iconName: 'Brain' },
      { label: 'Lifestyle', score: 92, iconName: 'Activity' },
      { label: 'Humor', score: 95, iconName: 'Smile' },
      { label: 'Music', score: 89, iconName: 'Headphones' },
    ],
    interests: [
      'Architecture',
      'Rooftop Cafes',
      '35mm Film',
      'Vinyl Records',
      'Spontaneous Trips'
    ],
    weekendPrompt: 'Best independent bookshop in NYC for a rainy afternoon?',
    voicePrompt: {
      promptQuestion: 'The architectural detail or theory I can debate for hours...',
      durationSeconds: 18,
      waveform: [35, 60, 85, 45, 90, 75, 40, 65, 80, 50, 95, 70, 45, 60, 75, 85, 40, 55]
    },
    dateSuggestion: {
      title: 'Plan the Spark: Architecture Walk & Rooftop Cortado',
      description: 'Curated for your mutual architectural curiosity and espresso rituals.',
      imageUrl: LUMA_ASSETS.rooftopDate,
      tags: ['Coffee', 'Art', 'Afternoon']
    },
    pillars: [
      {
        title: 'Personality Resonance',
        score: 95,
        description: 'Both thoughtful ambiverts with calm warmth',
        iconName: 'Brain',
        gradient: 'from-[#ff5e62] to-[#ffb3b0]'
      },
      {
        title: 'Lifestyle & Rhythm',
        score: 88,
        description: 'Shared weekend pace & active social energy',
        iconName: 'Clock',
        gradient: 'from-[#582a9f] to-[#d4bbff]'
      },
      {
        title: 'Interests & Passions',
        score: 94,
        description: 'Mutual obsession with art, music & design',
        iconName: 'Palette',
        gradient: 'from-[#d67f5b] to-[#ffb599]'
      },
      {
        title: 'Conversation Chemistry',
        score: 91,
        description: 'Deep banter, curious questioning',
        iconName: 'MessageSquare',
        gradient: 'from-[#ff5e62] via-[#ffb3b0] to-[#d4bbff]'
      },
      {
        title: 'Relationship Intentions',
        score: 89,
        description: 'Both looking for something long-term and genuine',
        iconName: 'Heart',
        gradient: 'from-[#582a9f] to-[#ff5e62]'
      }
    ],
    resonancePoints: '50,16 82,41 68,78 30,73 19,45'
  },
  {
    id: 'maya-26',
    name: 'Maya',
    age: 26,
    occupation: 'Documentary Filmmaker',
    distance: '3.4 miles away',
    matchDnaScore: 91,
    overlapScore: 89,
    archetype: 'Intuitive Creator',
    avatarUrl: LUMA_ASSETS.avatarCenter,
    detailPhotoUrl: LUMA_ASSETS.avatarCenter,
    bio: 'Capturing stories between quiet glances. Always searching for obscure vinyl records and late-night noodle spots.',
    whyClickHeadline: 'You both prioritize deep introspection, analog cameras, and nocturnal coffee talks.',
    whyClickDetail: 'High affinity in aesthetic appreciation and artistic philosophy',
    affinities: [
      { label: 'Personality', score: 93, iconName: 'Brain' },
      { label: 'Lifestyle', score: 87, iconName: 'Activity' },
      { label: 'Humor', score: 92, iconName: 'Smile' },
      { label: 'Music', score: 96, iconName: 'Headphones' },
    ],
    interests: [
      'Documentary',
      'Analog Photography',
      'Cello',
      'Night Drives',
      'Vintage Flea Markets'
    ],
    weekendPrompt: 'The single album that changed your perspective on life?',
    voicePrompt: {
      promptQuestion: 'The most immersive sound I ever captured on documentary location...',
      durationSeconds: 22,
      waveform: [40, 75, 55, 90, 65, 80, 45, 85, 95, 60, 40, 70, 85, 50, 65, 75, 90, 60]
    },
    dateSuggestion: {
      title: 'Plan the Spark: Sunset Ferry & Jazz Speakeasy',
      description: 'An unhurried journey through dusk water views into acoustic brass.',
      imageUrl: LUMA_ASSETS.rooftopDate,
      tags: ['Music', 'Film', 'Night']
    },
    pillars: [
      {
        title: 'Personality Resonance',
        score: 92,
        description: 'Calm creatives with high sensory awareness',
        iconName: 'Brain',
        gradient: 'from-[#ff5e62] to-[#ffb3b0]'
      },
      {
        title: 'Lifestyle & Rhythm',
        score: 87,
        description: 'Nocturnal rhythm and flexible unscripted weekends',
        iconName: 'Clock',
        gradient: 'from-[#582a9f] to-[#d4bbff]'
      },
      {
        title: 'Interests & Passions',
        score: 96,
        description: 'Profound overlap in analog arts and sonic textures',
        iconName: 'Palette',
        gradient: 'from-[#d67f5b] to-[#ffb599]'
      },
      {
        title: 'Conversation Chemistry',
        score: 89,
        description: 'Vulnerable stories and comfortable silences',
        iconName: 'MessageSquare',
        gradient: 'from-[#ff5e62] via-[#ffb3b0] to-[#d4bbff]'
      },
      {
        title: 'Relationship Intentions',
        score: 86,
        description: 'Organic intimacy rooted in mutual admiration',
        iconName: 'Heart',
        gradient: 'from-[#582a9f] to-[#ff5e62]'
      }
    ],
    resonancePoints: '50,14 84,36 71,80 28,76 16,42'
  },
  {
    id: 'julian-28',
    name: 'Julian',
    age: 28,
    occupation: 'Acoustic Sound Designer',
    distance: '1.8 miles away',
    matchDnaScore: 89,
    overlapScore: 88,
    archetype: 'Analog Alchemist',
    avatarUrl: LUMA_ASSETS.avatarLeft,
    detailPhotoUrl: LUMA_ASSETS.avatarLeft,
    bio: 'Crafting spatial audio by day, baking sourdough on weekends. Big believer that the right playlist can heal anything.',
    whyClickHeadline: 'You both love early morning light, artisanal bakeries, and acoustic indie sessions.',
    whyClickDetail: 'Harmonious domestic cadence and shared appreciation for quiet craftsmanship',
    affinities: [
      { label: 'Personality', score: 90, iconName: 'Brain' },
      { label: 'Lifestyle', score: 94, iconName: 'Activity' },
      { label: 'Humor', score: 88, iconName: 'Smile' },
      { label: 'Music', score: 98, iconName: 'Headphones' },
    ],
    interests: [
      'Field Recording',
      'Artisanal Bread',
      'Synthesizers',
      'Hiking Trails',
      'Modern Ceramics'
    ],
    weekendPrompt: 'What does your ideal Sunday breakfast sound like?',
    voicePrompt: {
      promptQuestion: 'What acoustic resonance actually means in everyday conversation...',
      durationSeconds: 19,
      waveform: [50, 40, 80, 95, 70, 60, 85, 45, 65, 90, 75, 55, 80, 70, 60, 45, 85, 60]
    },
    dateSuggestion: {
      title: 'Plan the Spark: Farmers Market & Record Listening Room',
      description: 'Morning botanical foraging followed by Japanese vinyl hi-fi bar.',
      imageUrl: LUMA_ASSETS.rooftopDate,
      tags: ['Hi-Fi', 'Coffee', 'Market']
    },
    pillars: [
      {
        title: 'Personality Resonance',
        score: 90,
        description: 'Warm grounding presence with playful wit',
        iconName: 'Brain',
        gradient: 'from-[#ff5e62] to-[#ffb3b0]'
      },
      {
        title: 'Lifestyle & Rhythm',
        score: 94,
        description: 'Morning risers with intentional afternoon flow',
        iconName: 'Clock',
        gradient: 'from-[#582a9f] to-[#d4bbff]'
      },
      {
        title: 'Interests & Passions',
        score: 98,
        description: 'Shared fascination with soundscapes and tangible crafts',
        iconName: 'Palette',
        gradient: 'from-[#d67f5b] to-[#ffb599]'
      },
      {
        title: 'Conversation Chemistry',
        score: 87,
        description: 'Playful curiosity with philosophical detours',
        iconName: 'MessageSquare',
        gradient: 'from-[#ff5e62] via-[#ffb3b0] to-[#d4bbff]'
      },
      {
        title: 'Relationship Intentions',
        score: 91,
        description: 'Building an intentional, calm, supportive partnership',
        iconName: 'Heart',
        gradient: 'from-[#582a9f] to-[#ff5e62]'
      }
    ],
    resonancePoints: '50,20 78,44 64,74 34,70 22,48'
  }
];

export const INITIAL_CALIBRATION: CalibrationState = {
  step: 2,
  totalSteps: 4,
  percentage: 65,
  intent: 'serious',
  weekend: 'coffee',
  socialEnergy: 'ambi',
  values: ['Humor & Wit', 'Unspoken Kindness'],
  resonance: 88,
  archetype: 'Soulful Conversationalist'
};

export const INITIAL_SPARKS: SparkItem[] = [
  {
    id: 'spark-1',
    profileId: 'elena-27',
    name: 'Elena',
    avatarUrl: LUMA_ASSETS.avatarRight,
    timestamp: '12m ago',
    preview: 'Replied to weekend prompt: "Housing Works Bookstore in Soho! The spiral staircases are pure magic..."',
    matchScore: 94,
    status: 'mutual'
  },
  {
    id: 'spark-2',
    profileId: 'maya-26',
    name: 'Maya',
    avatarUrl: LUMA_ASSETS.avatarCenter,
    timestamp: '2h ago',
    preview: 'Sent you a Spark on your 35mm film passion 📸',
    matchScore: 91,
    status: 'received'
  },
  {
    id: 'spark-3',
    profileId: 'julian-28',
    name: 'Julian',
    avatarUrl: LUMA_ASSETS.avatarLeft,
    timestamp: 'Yesterday',
    preview: 'Saved your date suggestion: Architecture Walk & Rooftop Cortado',
    matchScore: 89,
    status: 'sent'
  }
];
