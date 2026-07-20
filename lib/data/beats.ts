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

export const BEATS: Beat[] = [];

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
