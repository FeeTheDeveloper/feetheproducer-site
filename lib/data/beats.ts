export type Beat = {
  id: string;
  title: string;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  priceLease: number;
  priceExclusive: number;
  duration: string;
  tags: string[];
  featured?: boolean;
};

export const BEATS: Beat[] = [
  {
    id: "throne-room",
    title: "Throne Room",
    genre: "Trap",
    mood: "Dark · Cinematic",
    bpm: 142,
    key: "F# Minor",
    priceLease: 49,
    priceExclusive: 599,
    duration: "3:21",
    tags: ["Trap", "Dark", "Cinematic"],
    featured: true
  },
  {
    id: "midnight-king",
    title: "Midnight King",
    genre: "Hip-Hop",
    mood: "Moody · Hard-hitting",
    bpm: 88,
    key: "C# Minor",
    priceLease: 39,
    priceExclusive: 499,
    duration: "2:54",
    tags: ["Hip-Hop", "Moody"],
    featured: true
  },
  {
    id: "gold-chain",
    title: "Gold Chain",
    genre: "Trap Soul",
    mood: "Smooth · Confident",
    bpm: 76,
    key: "A Minor",
    priceLease: 49,
    priceExclusive: 549,
    duration: "3:08",
    tags: ["Trap Soul", "Smooth"],
    featured: true
  },
  {
    id: "battlefield",
    title: "Battlefield",
    genre: "Drill",
    mood: "Aggressive · Heavy",
    bpm: 145,
    key: "G Minor",
    priceLease: 49,
    priceExclusive: 599,
    duration: "2:48",
    tags: ["Drill", "Aggressive"]
  },
  {
    id: "smoke-signals",
    title: "Smoke Signals",
    genre: "Trap",
    mood: "Hazy · Atmospheric",
    bpm: 138,
    key: "D Minor",
    priceLease: 39,
    priceExclusive: 449,
    duration: "3:12",
    tags: ["Trap", "Atmospheric"]
  },
  {
    id: "veterans-anthem",
    title: "Veteran's Anthem",
    genre: "Boom Bap",
    mood: "Triumphant · Powerful",
    bpm: 92,
    key: "E Minor",
    priceLease: 59,
    priceExclusive: 699,
    duration: "3:34",
    tags: ["Boom Bap", "Triumphant"],
    featured: true
  },
  {
    id: "after-hours",
    title: "After Hours",
    genre: "R&B",
    mood: "Sensual · Late Night",
    bpm: 72,
    key: "B Minor",
    priceLease: 49,
    priceExclusive: 549,
    duration: "3:02",
    tags: ["R&B", "Late Night"]
  },
  {
    id: "no-mercy",
    title: "No Mercy",
    genre: "Trap",
    mood: "Hard · Menacing",
    bpm: 150,
    key: "F Minor",
    priceLease: 49,
    priceExclusive: 599,
    duration: "2:41",
    tags: ["Trap", "Hard"]
  },
  {
    id: "crown-jewel",
    title: "Crown Jewel",
    genre: "Trap Soul",
    mood: "Luxurious · Reflective",
    bpm: 84,
    key: "G# Minor",
    priceLease: 59,
    priceExclusive: 649,
    duration: "3:25",
    tags: ["Trap Soul", "Luxurious"]
  }
];

export function getFeaturedBeats(limit = 3): Beat[] {
  return BEATS.filter((beat) => beat.featured).slice(0, limit);
}
