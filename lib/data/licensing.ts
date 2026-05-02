export type LicenseTier = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  format: string;
  highlight?: boolean;
  features: string[];
  rights: string[];
};

export const LICENSE_TIERS: LicenseTier[] = [
  {
    id: "basic",
    name: "Basic Lease",
    price: 49,
    tagline: "Perfect for demos, freestyles, and getting started.",
    format: "MP3",
    features: [
      "MP3 file delivery",
      "Untagged version",
      "Use for 1 commercial release",
      "Distribution up to 2,500 streams",
      "Up to 1 music video",
      "Non-exclusive rights"
    ],
    rights: [
      "Must credit: Prod. Fee The Producer",
      "Cannot transfer or resell the license",
      "Beat remains available to other licensees"
    ]
  },
  {
    id: "premium",
    name: "Premium Lease",
    price: 149,
    tagline: "For serious artists ready to push a record.",
    format: "MP3 + WAV + Trackouts",
    highlight: true,
    features: [
      "MP3, WAV, and trackout/stem delivery",
      "Untagged & mix-ready files",
      "Use for 1 commercial release",
      "Distribution up to 100,000 streams",
      "Unlimited music videos",
      "Monetization on YouTube enabled",
      "Performance & radio rights included",
      "Non-exclusive rights"
    ],
    rights: [
      "Must credit: Prod. Fee The Producer",
      "Cannot transfer or resell the license",
      "Beat remains available to other licensees",
      "Producer retains 50% of writer's share"
    ]
  },
  {
    id: "exclusive",
    name: "Exclusive Rights",
    price: 999,
    tagline: "Own the beat. Lock the record. Build the moment.",
    format: "MP3 + WAV + Trackouts + Buyout",
    features: [
      "Full file delivery: MP3, WAV, and trackouts",
      "Beat permanently removed from store",
      "Unlimited commercial use & releases",
      "Unlimited streams and downloads",
      "Unlimited music videos",
      "Sync, film, TV, and brand placement allowed",
      "Full performance & radio rights",
      "Worldwide distribution"
    ],
    rights: [
      "Must credit: Prod. Fee The Producer",
      "Producer retains 50% of writer's share",
      "Producer keeps producer credit on all platforms",
      "Custom contracts available on request"
    ]
  }
];
