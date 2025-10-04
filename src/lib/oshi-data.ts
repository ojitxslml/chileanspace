
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
        role: 'Comandante de Misión',
        dimensions: { variety: 0.8, balance: 0.7, circadian: 0.85, sensory: 0.9, motivation: 0.95, social: 0.8, meaningful: 0.9 },
        events: [
            { id: 'evt1', timestamp: '2h ago', type: 'system', message: 'Circadian rhythm aligned. Optimal light exposure achieved.' },
            { id: 'evt2', timestamp: '8h ago', type: 'user', message: 'Logged "Mission Planning" as meaningful activity.' },
        ]
    },
    {
        id: 'dr-lena',
        name: 'Dra. Lena Petrova',
        role: 'Oficial Científico',
        dimensions: { variety: 0.6, balance: 0.5, circadian: 0.7, sensory: 0.6, motivation: 0.8, social: 0.6, meaningful: 0.85 },
         events: [
            { id: 'evt1', timestamp: '30m ago', type: 'alert', message: 'Low activity balance detected for over 4 hours.' },
            { id: 'evt2', timestamp: '1h ago', type: 'suggestion', message: 'Consider a 10-minute break in the recreational area.' },
        ]
    },
    {
        id: 'ken-sato',
        name: 'Ken Sato',
        role: 'Ingeniero de Sistemas',
        dimensions: { variety: 0.4, balance: 0.4, circadian: 0.6, sensory: 0.5, motivation: 0.7, social: 0.5, meaningful: 0.6 },
        events: [
            { id: 'evt1', timestamp: '1h ago', type: 'alert', message: 'High sensory load detected in ECLSS. Exposure limit nearing.' },
            { id: 'evt2', timestamp: '4h ago', type: 'system', message: 'Maintained focus on "Diagnostic" task for 3.5 hours.' },
        ]
    },
    {
        id: 'maya-singh',
        name: 'Maya Singh',
        role: 'Especialista de Hábitat',
        dimensions: { variety: 0.9, balance: 0.8, circadian: 0.9, sensory: 0.8, motivation: 0.9, social: 0.85, meaningful: 0.95 },
        events: [
            { id: 'evt1', timestamp: '4h ago', type: 'user', message: 'Logged "Botanical Care" as a social and meaningful activity.' },
        ]
    },
    {
        id: 'javier-rodriguez',
        name: 'Javier Rodriguez',
        role: 'Geólogo',
        dimensions: { variety: 0.7, balance: 0.6, circadian: 0.75, sensory: 0.8, motivation: 0.85, social: 0.7, meaningful: 0.8 },
        events: [
            { id: 'evt1', timestamp: '5h ago', type: 'system', message: 'Completed geological survey of Sector Delta.' },
        ]
    },
    {
        id: 'chen-liang',
        name: 'Chen Liang',
        role: 'Médico',
        dimensions: { variety: 0.5, balance: 0.9, circadian: 0.9, sensory: 0.7, motivation: 0.9, social: 0.8, meaningful: 0.9 },
        events: [
            { id: 'evt1', timestamp: '1d ago', type: 'suggestion', message: 'Review weekly crew health reports.' },
        ]
    },
    {
        id: 'olivia-garcia',
        name: 'Olivia Garcia',
        role: 'Técnico de Robótica',
        dimensions: { variety: 0.6, balance: 0.5, circadian: 0.6, sensory: 0.8, motivation: 0.75, social: 0.6, meaningful: 0.7 },
        events: [
            { id: 'evt1', timestamp: '6h ago', type: 'alert', message: 'High torque detected on rover arm. Recommend inspection.' },
        ]
    },
    {
        id: 'ben-carter',
        name: 'Ben Carter',
        role: 'Piloto',
        dimensions: { variety: 0.8, balance: 0.8, circadian: 0.8, sensory: 0.9, motivation: 0.9, social: 0.8, meaningful: 0.85 },
        events: [
            { id: 'evt1', timestamp: '2d ago', type: 'system', message: 'Completed supply ship docking procedure.' },
        ]
    },
    {
        id: 'fatima-al-sayed',
        name: 'Fatima Al-Sayed',
        role: 'Botánica',
        dimensions: { variety: 0.9, balance: 0.7, circadian: 0.85, sensory: 0.8, motivation: 0.95, social: 0.9, meaningful: 0.95 },
        events: [
            { id: 'evt1', timestamp: '1d ago', type: 'user', message: 'Started new hydroponics experiment.' },
        ]
    },
    {
        id: 'ivan-dubov',
        name: 'Ivan Dubov',
        role: 'Ingeniero Estructural',
        dimensions: { variety: 0.3, balance: 0.4, circadian: 0.5, sensory: 0.6, motivation: 0.6, social: 0.4, meaningful: 0.5 },
        events: [
            { id: 'evt1', timestamp: '12h ago', type: 'alert', message: 'Stress sensor anomaly in greenhouse support structure.' },
            { id: 'evt2', timestamp: '13h ago', type: 'suggestion', message: 'Schedule a diagnostic for structural sensors.' },
        ]
    },
    {
        id: 'sophia-rossi',
        name: 'Sophia Rossi',
        role: 'Psicóloga',
        dimensions: { variety: 0.7, balance: 0.9, circadian: 0.9, sensory: 0.8, motivation: 0.9, social: 0.95, meaningful: 0.95 },
        events: [
            { id: 'evt1', timestamp: '3h ago', type: 'user', message: 'Conducted team cohesion session.' },
        ]
    },
    {
        id: 'leo-schmidt',
        name: 'Leo Schmidt',
        role: 'Técnico de Comunicaciones',
        dimensions: { variety: 0.5, balance: 0.6, circadian: 0.7, sensory: 0.8, motivation: 0.7, social: 0.6, meaningful: 0.7 },
        events: [
            { id: 'evt1', timestamp: '9h ago', type: 'system', message: 'Earth uplink signal strength optimal.' },
        ]
    },
    {
        id: 'emily-white',
        name: 'Emily White',
        role: 'Astrobióloga',
        dimensions: { variety: 0.8, balance: 0.7, circadian: 0.7, sensory: 0.7, motivation: 0.85, social: 0.7, meaningful: 0.9 },
        events: [
             { id: 'evt1', timestamp: '1d ago', type: 'user', message: 'Analyzed regolith samples for microbial life.' },
        ]
    },
    {
        id: 'david-chen',
        name: 'David Chen',
        role: 'Técnico de Soporte Vital',
        dimensions: { variety: 0.4, balance: 0.5, circadian: 0.5, sensory: 0.8, motivation: 0.6, social: 0.5, meaningful: 0.65 },
        events: [
             { id: 'evt1', timestamp: '1d ago', type: 'alert', message: 'CO2 levels slightly elevated in Science Lab.' },
        ]
    },
    {
        id: 'chloe-kim',
        name: 'Chloe Kim',
        role: 'Nutricionista',
        dimensions: { variety: 0.8, balance: 0.8, circadian: 0.9, sensory: 0.8, motivation: 0.9, social: 0.85, meaningful: 0.9 },
        events: [
            { id: 'evt1', timestamp: '1d ago', type: 'system', message: 'Finalized weekly meal plans.' },
        ]
    },
    {
        id: 'omar-badawi',
        name: 'Omar Badawi',
        role: 'Ingeniero de Software',
        dimensions: { variety: 0.6, balance: 0.3, circadian: 0.4, sensory: 0.6, motivation: 0.75, social: 0.5, meaningful: 0.8 },
        events: [
            { id: 'evt1', timestamp: '2h ago', type: 'user', message: 'Deployed patch for habitat control system.' },
            { id: 'evt2', timestamp: '2h ago', type: 'alert', message: 'Low balance score. High cognitive load for 5 hours.' },
        ]
    },
    {
        id: 'ana-silva',
        name: 'Ana Silva',
        role: 'Paramédico',
        dimensions: { variety: 0.7, balance: 0.8, circadian: 0.8, sensory: 0.7, motivation: 0.85, social: 0.8, meaningful: 0.9 },
        events: [
            { id: 'evt1', timestamp: '1d ago', type: 'system', message: 'Medical supply inventory check complete.' },
        ]
    },
    {
        id: 'daniel-jones',
        name: 'Daniel Jones',
        role: 'Técnico de Mantenimiento',
        dimensions: { variety: 0.8, balance: 0.6, circadian: 0.7, sensory: 0.9, motivation: 0.7, social: 0.7, meaningful: 0.75 },
        events: [
            { id: 'evt1', timestamp: '10h ago', type: 'system', message: 'Replaced air filter in Residential Module.' },
        ]
    },
    {
        id: 'sara-nilsson',
        name: 'Sara Nilsson',
        role: 'Investigadora',
        dimensions: { variety: 0.7, balance: 0.6, circadian: 0.6, sensory: 0.7, motivation: 0.9, social: 0.6, meaningful: 0.95 },
        events: [
            { id: 'evt1', timestamp: '2d ago', type: 'user', message: 'Published research paper on Martian geology.' },
        ]
    },
    {
        id: 'wei-zhang',
        name: 'Wei Zhang',
        role: 'Especialista Agrónomo',
        dimensions: { variety: 0.9, balance: 0.8, circadian: 0.85, sensory: 0.8, motivation: 0.9, social: 0.8, meaningful: 0.95 },
        events: [
            { id: 'evt1', timestamp: '1d ago', type: 'system', message: 'Pest control measures implemented in Greenhouse B.' },
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
