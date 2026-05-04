export type Beat = {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  mood: string;
  priceBasic: number;
  pricePremium: number;
  priceExclusive: number;
  audioUrl: string;
  coverImage: string;
  featured: boolean;
};

const PLACEHOLDER_AUDIO_URL = "/audio/ftp-preview-placeholder.wav";
const DEFAULT_COVER_IMAGE = "/images/covers/fee_the_producer.png";

export const BEATS: Beat[] = [
  {
    id: "floating",
    title: "Floating",
    genre: "Hip-Hop / Trap",
    bpm: 0,
    mood: "Smooth / Atmospheric",
    priceBasic: 29,
    pricePremium: 79,
    priceExclusive: 299,
    audioUrl: "/audio/Floating.m4a",
    coverImage: "/images/covers/fee_the_producer.png",
    featured: true
  },
  {
    id: "rolling-feat-ray-nathan",
    title: "Rolling (feat. Ray Nathan)",
    genre: "Hip-Hop / Trap",
    bpm: 0,
    mood: "Melodic and reflective",
    priceBasic: 39,
    pricePremium: 119,
    priceExclusive: 699,
    audioUrl: "/audio/rolling-feat-ray-nathan.m4a",
    coverImage: DEFAULT_COVER_IMAGE,
    featured: true
  },
  {
    id: "tony-braxton-feat-a-p",
    title: "Tony Braxton (feat. A.P)",
    genre: "R&B / Hip-Hop",
    bpm: 0,
    mood: "Smooth and late-night",
    priceBasic: 49,
    pricePremium: 149,
    priceExclusive: 749,
    audioUrl: "/audio/tony-braxton-feat-a-p.mp3",
    coverImage: DEFAULT_COVER_IMAGE,
    featured: true
  },
  {
    id: "velvet-static",
    title: "Velvet Static",
    genre: "R&B",
    bpm: 74,
    mood: "Late-night and moody",
    priceBasic: 35,
    pricePremium: 109,
    priceExclusive: 599,
    audioUrl: PLACEHOLDER_AUDIO_URL,
    coverImage: DEFAULT_COVER_IMAGE,
    featured: true
  },
  {
    id: "redline-season",
    title: "Redline Season",
    genre: "Trap",
    bpm: 150,
    mood: "High-pressure anthem",
    priceBasic: 45,
    pricePremium: 129,
    priceExclusive: 729,
    audioUrl: PLACEHOLDER_AUDIO_URL,
    coverImage: DEFAULT_COVER_IMAGE,
    featured: true
  },
  {
    id: "veteran-code",
    title: "Veteran Code",
    genre: "Boom Bap",
    bpm: 94,
    mood: "Focused and triumphant",
    priceBasic: 39,
    pricePremium: 119,
    priceExclusive: 649,
    audioUrl: PLACEHOLDER_AUDIO_URL,
    coverImage: DEFAULT_COVER_IMAGE,
    featured: false
  },
  {
    id: "skylight-run",
    title: "Skylight Run",
    genre: "Hip-Hop",
    bpm: 88,
    mood: "Confident and reflective",
    priceBasic: 35,
    pricePremium: 99,
    priceExclusive: 549,
    audioUrl: PLACEHOLDER_AUDIO_URL,
    coverImage: DEFAULT_COVER_IMAGE,
    featured: false
  },
  {
    id: "afterglow-bag",
    title: "Afterglow Bag",
    genre: "Trap Soul",
    bpm: 82,
    mood: "Luxury and introspection",
    priceBasic: 45,
    pricePremium: 139,
    priceExclusive: 699,
    audioUrl: PLACEHOLDER_AUDIO_URL,
    coverImage: DEFAULT_COVER_IMAGE,
    featured: false
  },
  {
    id: "night-shift",
    title: "Night Shift",
    genre: "Cinematic",
    bpm: 118,
    mood: "Tense and atmospheric",
    priceBasic: 49,
    pricePremium: 149,
    priceExclusive: 799,
    audioUrl: PLACEHOLDER_AUDIO_URL,
    coverImage: DEFAULT_COVER_IMAGE,
    featured: false
  }
];

export function getBeatById(id: string): Beat | undefined {
  return BEATS.find((beat) => beat.id === id);
}

export function getBeatGenres(): string[] {
  return Array.from(new Set(BEATS.map((beat) => beat.genre)));
}

export function getFeaturedBeats(limit = 3): Beat[] {
  return BEATS.filter((beat) => beat.featured).slice(0, limit);
}

export function getRelatedBeats(currentBeat: Beat, limit = 3): Beat[] {
  const priorityMatches = BEATS.filter(
    (beat) =>
      beat.id !== currentBeat.id &&
      (beat.genre === currentBeat.genre || beat.mood === currentBeat.mood)
  );

  const remaining = BEATS.filter(
    (beat) =>
      beat.id !== currentBeat.id &&
      !priorityMatches.some((match) => match.id === beat.id)
  );

  return [...priorityMatches, ...remaining].slice(0, limit);
}
