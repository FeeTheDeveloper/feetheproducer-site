export const SITE = {
  name: "Fee The Producer",
  legalName: "Fee The Producer LLC",
  title: "Fee The Producer | Beats, Music & Licensing",
  tagline: "Beats, music, and licensing built loud and built premium.",
  description:
    "Premium beats, music releases, and licensing by Fee The Producer. Veteran-owned music brand.",
  url: "https://feetheproducer.com",
  domain: "feetheproducer.com",
  email: "contact@feetheproducer.com",
  social: {
    instagram: "https://instagram.com/feetheproducer",
    youtube: "https://youtube.com/@feetheproducer",
    spotify: "https://open.spotify.com/artist/feetheproducer",
    apple: "https://music.apple.com/artist/feetheproducer",
    soundcloud: "https://soundcloud.com/feetheproducer",
    tiktok: "https://tiktok.com/@feetheproducer"
  },
  images: {
    logo: "/brand/fee-the-producer-logo.png"
  }
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/beats", label: "Beats" },
  { href: "/releases", label: "Releases" },
  { href: "/licensing", label: "Licensing" },
  { href: "/contact", label: "Contact" }
] as const;
