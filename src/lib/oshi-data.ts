
export type OshiDimension = 'variety' | 'balance' | 'circadian' | 'sensory' | 'motivation' | 'social' | 'meaningful';

export interface OshiScores {
  variety: number;
  balance: number;
  circadian: number;
  sensory: number;
  motivation: number;
  social: number;
  meaningful: number;
}

export interface OshiEvent {
    id: string;
    timestamp: string;
    type: 'alert' | 'suggestion' | 'system' | 'user';
    message: string;
}

export interface CrewMemberOshi {
    id: string;
    name: string;
    role: string;
    oshiScore: number;
    status: 'Optimal' | 'Stable' | 'Concern';
    avatar: string;
    dimensions: OshiScores;
    oshiHistory: { date: string; score: number }[];
    events: OshiEvent[];
}

const generateOshiHistory = (baseScore: number): { date: string; score: number }[] => {
    const history = [];
    let currentScore = baseScore;
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        currentScore += (Math.random() - 0.5) * 8;
        currentScore = Math.max(20, Math.min(99, currentScore));
        history.push({
            date: date.toISOString().split('T')[0],
            score: Math.round(currentScore),
        });
    }
    return history;
};

const calculateOshi = (dimensions: OshiScores): number => {
  const weights = { variety: 0.1, balance: 0.2, circadian: 0.2, sensory: 0.15, motivation: 0.15, social: 0.1, meaningful: 0.1 };
  const score = Object.keys(dimensions).reduce((acc, key) => {
    return acc + dimensions[key as OshiDimension] * weights[key as OshiDimension];
  }, 0);
  return Math.round(score * 100);
}

const getOshiStatus = (score: number): 'Optimal' | 'Stable' | 'Concern' => {
  if (score >= 75) return 'Optimal';
  if (score >= 50) return 'Stable';
  return 'Concern';
}

const rawCrewData: {id: string, name: string, role: string, dimensions: OshiScores, events: OshiEvent[]}[] = [
    {
        id: 'cmdr-alex',
        name: 'Cmdr. Alex Reyes',
        role: 'Mission Commander',
        dimensions: { variety: 0.8, balance: 0.7, circadian: 0.85, sensory: 0.9, motivation: 0.95, social: 0.8, meaningful: 0.9 },
        events: [
            { id: 'evt1', timestamp: '2h ago', type: 'system', message: 'Circadian rhythm aligned. Optimal light exposure achieved.' },
            { id: 'evt2', timestamp: '8h ago', type: 'user', message: 'Logged "Mission Planning" as meaningful activity.' },
        ]
    },
    {
        id: 'dr-lena',
        name: 'Dr. Lena Petrova',
        role: 'Science Officer',
        dimensions: { variety: 0.6, balance: 0.5, circadian: 0.7, sensory: 0.6, motivation: 0.8, social: 0.6, meaningful: 0.85 },
         events: [
            { id: 'evt1', timestamp: '30m ago', type: 'alert', message: 'Low activity balance detected for over 4 hours.' },
            { id: 'evt2', timestamp: '1h ago', type: 'suggestion', message: 'Consider a 10-minute break in the recreational area.' },
        ]
    },
    {
        id: 'ken-sato',
        name: 'Ken Sato',
        role: 'Systems Engineer',
        dimensions: { variety: 0.4, balance: 0.4, circadian: 0.6, sensory: 0.5, motivation: 0.7, social: 0.5, meaningful: 0.6 },
        events: [
            { id: 'evt1', timestamp: '1h ago', type: 'alert', message: 'High sensory load detected in ECLSS. Exposure limit nearing.' },
            { id: 'evt2', timestamp: '4h ago', type: 'system', message: 'Maintained focus on "Diagnostic" task for 3.5 hours.' },
        ]
    },
    {
        id: 'maya-singh',
        name: 'Maya Singh',
        role: 'Habitat Specialist',
        dimensions: { variety: 0.9, balance: 0.8, circadian: 0.9, sensory: 0.8, motivation: 0.9, social: 0.85, meaningful: 0.95 },
        events: [
            { id: 'evt1', timestamp: '4h ago', type: 'user', message: 'Logged "Botanical Care" as a social and meaningful activity.' },
        ]
    },
];

export const oshiCrewData: CrewMemberOshi[] = rawCrewData.map(crew => {
    const oshiScore = calculateOshi(crew.dimensions);
    const status = getOshiStatus(oshiScore);
    return {
        ...crew,
        oshiScore,
        status,
        avatar: `https://picsum.photos/seed/${crew.id}/40/40`,
        oshiHistory: generateOshiHistory(oshiScore),
    }
});
