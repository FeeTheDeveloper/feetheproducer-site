export const SITE = {
  name: "Fee The Producer",
  legalName: "Fee The Producer LLC",
  title: "Fee The Producer | Sound. Soul. Signature.",
  tagline: "Sound. Soul. Signature.",
  description:
    "Fee The Producer is a Philadelphia-born musician, composer, writer, drummer, and keys player. Listen on Apple Music, explore videos on YouTube, and discuss custom production.",
  url: "https://feetheproducer.com",
  domain: "feetheproducer.com",
  email: "contact@feetheproducer.com",
  social: {
    youtube: "https://www.youtube.com/channel/UC9UgxU4WyYxVZzhVYeLyc_Q",
    apple: "https://music.apple.com/us/artist/fee-the-producer/1896424385",
  },
  images: {
    logo: "/brand/fp-luxury-emblem.png",
    studio: "/images/studio/studio-character.png",
  },
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/streaming", label: "The music" },
  { href: "/#live-performance", label: "Live" },
  { href: "/beats", label: "The studio" },
  { href: "/about", label: "About Fee" },
] as const;
