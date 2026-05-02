export const SITE = {
  name: "Fee The Producer",
  legalName: "Fee The Producer LLC",
  tagline: "Beats. Releases. Licensing. Built loud, built premium.",
  description:
    "Official home of Fee The Producer — veteran-owned music production brand for premium beats, original releases, and music licensing.",
  url: "https://feetheproducer.com",
  email: "booking@feetheproducer.com",
  social: {
    instagram: "https://instagram.com/feetheproducer",
    youtube: "https://youtube.com/@feetheproducer",
    spotify: "https://open.spotify.com/artist/feetheproducer",
    apple: "https://music.apple.com/artist/feetheproducer",
    soundcloud: "https://soundcloud.com/feetheproducer",
    tiktok: "https://tiktok.com/@feetheproducer"
  }
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/beats", label: "Beats" },
  { href: "/releases", label: "Releases" },
  { href: "/licensing", label: "Licensing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;
