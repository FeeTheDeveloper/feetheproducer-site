export const SITE = {
  name: "Fee The Producer",
  legalName: "Fee The Producer LLC",
  title: "Fee The Producer | New Music, Videos & Custom Production",
  tagline: "New music, official videos, and custom production.",
  description:
    "Fee The Producer is a Philadelphia-born musician, composer, writer, drummer, and keys player. New singles, official videos, and custom production.",
  url: "https://feetheproducer.com",
  domain: "feetheproducer.com",
  email: "contact@feetheproducer.com",
  social: {
    instagram: "https://instagram.com/feetheproducer",
    youtube: "https://youtube.com/@feetheproducer",
    spotify:
      "https://open.spotify.com/artist/6eFd541mqXgVpKOiCHJq2y?si=qYBlUAg3QXW8T6UtVSszUw",
    apple: "https://music.apple.com/us/song/l-r-a/6769877047",
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
