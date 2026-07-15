export interface CreditLink {
  label: string;
  url: string;
}

export interface PerformanceCredit {
  slug: string;
  role: string; // instrument/role badge, e.g. "Drums"
  title: string; // show / episode title
  artist: string; // artist the performance backs
  platform: string; // platform key, e.g. "tubi"
  platformLabel: string; // badge copy, e.g. "Streaming on Tubi"
  year: number;
  description: string;
  episodeUrl: string; // external watch link (no embed player on Tubi)
  ctaLabel: string;
  socialProof?: CreditLink[];
}

export const credits: PerformanceCredit[] = [
  {
    slug: "center-circle-payroll-giovanni",
    role: "Drums",
    title: "Center Circle — S1:E1",
    artist: "Payroll Giovanni",
    platform: "tubi",
    platformLabel: "Streaming on Tubi",
    year: 2023, // TODO: confirm the episode's listed release year on Tubi
    description:
      "Live drums behind Payroll Giovanni's full-band Center Circle set — a nationally streaming TV performance carried by a live rhythm section.",
    episodeUrl: "https://tubitv.com/tv-shows/200042598/s01-e01-payroll-giovanni",
    ctaLabel: "Watch on Tubi",
    socialProof: [
      {
        label: "Payroll Giovanni on Tubi",
        url: "https://tubitv.com/person/a65d03/payroll-giovanni"
      }
    ]
  }
];
