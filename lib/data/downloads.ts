export interface DownloadTrack {
  slug: string;
  title: string;
  artist: string;
  featuring?: string[];
  coverArt: string;
  audioSrc: string; // path to file in /public/audio
  price: string; // fallback display label used until stripePriceId is live, e.g. "$1.29"
  stripePriceId?: string; // Stripe Price ID (price_...) — create the Product/Price in the
  // Stripe dashboard, paste the Price ID here, and set STRIPE_SECRET_KEY in the
  // environment. Once both are set, checkout activates and the displayed price
  // syncs live from Stripe — change the price in Stripe, not in this file.
}

export const downloads: DownloadTrack[] = [
  {
    slug: "koolin-it",
    title: "Koolin It",
    artist: "Fee The Producer",
    featuring: ["Don Twan", "Lab Spitta", "Luh Semi"],
    coverArt: "/images/covers/koolin-it-cover.png",
    audioSrc: "/audio/Koolin%20It.mp3",
    price: "$0.99",
    stripePriceId: "price_1TyixrAuTxmRmIVIqUjIkXQX"
  },
  {
    slug: "rolling",
    title: "Rolling",
    artist: "Fee The Producer",
    featuring: ["Ray Nathan"],
    coverArt: "/images/covers/rolling_cover.png",
    audioSrc: "/audio/rolling-feat-ray-nathan.m4a",
    price: "$0.99",
    stripePriceId: "price_1Tyj1UAuTxmRmIVIAkY8TJfw"
  },
  {
    slug: "im-gone",
    title: "I'm Gone",
    artist: "Fee The Producer",
    featuring: ["Luh Semi", "A.P 223"],
    coverArt: "/images/covers/im_gone_cover.png",
    audioSrc: "/audio/I%27m%20Gone%20%5Bedited%20%233%5D.m4a.m4a",
    price: "$0.99",
    stripePriceId: "price_1Tyj2mAuTxmRmIVIBRDeIvTH"
  },
  {
    slug: "lra",
    title: "L.R.A.",
    artist: "Fee The Producer",
    coverArt: "/images/covers/lra-cover.png",
    audioSrc: "/audio/L.R.A..m4a",
    price: "$0.99",
    stripePriceId: "price_1TyizhAuTxmRmIVIu4Sasftv"
  }
];

export function formatDownloadFeaturing(track: DownloadTrack): string | null {
  if (!track.featuring || track.featuring.length === 0) {
    return null;
  }

  if (track.featuring.length === 1) {
    return `feat. ${track.featuring[0]}`;
  }

  return `feat. ${track.featuring.slice(0, -1).join(", ")} & ${
    track.featuring[track.featuring.length - 1]
  }`;
}
