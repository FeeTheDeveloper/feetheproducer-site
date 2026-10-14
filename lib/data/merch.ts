/** Public descriptions and the exact products approved for this collection. */
export const merch = [
  {
    slug: "core-washed-tee", name: "Core Washed Tee", category: "Everyday / 01",
    stripeProductId: "prod_VRR3ZXTfRUEQBS", printfulProductId: 481582880, catalogProductId: 880,
    image: "/images/merch/core-washed-tee-front.png",
    color: "Washed black", decoration: "Front print",
    description: "The signature, worn in. A relaxed garment-dyed tee with the ivory-and-gold Fee The Producer wordmark.",
    details: ["Bella + Canvas 4810GD", "100% cotton; garment-dyed finish", "Relaxed, oversized fit", "Printed artwork; colors may vary slightly from the mockup"],
  },
  {
    slug: "core-hoodie", name: "Core Hoodie", category: "Studio layers / 02",
    stripeProductId: "prod_VRR3mj6DjpudPO", printfulProductId: 481603763, catalogProductId: 1577,
    image: "/images/merch/core-hoodie.png",
    color: "Black", decoration: "Front print",
    description: "An easy studio layer. The signature wordmark sits on a relaxed black pullover with a clean, drawcord-free hood.",
    details: ["Stanley/Stella Chaser SASU038 / STSU077", "Relaxed mid-weight pullover", "Kangaroo pocket and ribbed cuffs", "Printed ivory-and-gold artwork"],
  },
  {
    slug: "monogram-joggers", name: "Monogram Joggers", category: "Off the clock / 03",
    stripeProductId: "prod_VRR3NyjgQWwsu2", printfulProductId: 481625354, catalogProductId: 1660,
    image: "/images/merch/monogram-joggers.png",
    color: "Black", decoration: "FP embroidery",
    description: "Heavyweight fleece, a relaxed rhythm. A small gold FP monogram keeps the finish understated.",
    details: ["Stanley/Stella SABU006 / STBU185", "80% organic cotton, 20% recycled polyester", "Brushed fleece; elastic waist and ribbed cuffs", "Old-gold embroidered monogram"],
  },
  {
    slug: "signature-snapback", name: "Signature Snapback", category: "The finishing touch / 04",
    stripeProductId: "prod_VRR3LjQf6sIiSI", printfulProductId: 481625393, catalogProductId: 99,
    image: "/images/merch/signature-snapback.png",
    color: "Black / red", decoration: "Front + side embroidery",
    description: "Black crown. Red brim. An embroidered Fee The Producer wordmark up front, with the FP monogram at the side.",
    details: ["Yupoong 6089M classic snapback", "80% acrylic, 20% wool", "Structured high-profile crown; adjustable snap closure", "Flat embroidery in white and old gold"],
  },
  {
    slug: "waveform-long-sleeve", name: "Waveform Long Sleeve", category: "Sound in motion / 05",
    stripeProductId: "prod_VRR33REwSOznKg", printfulProductId: 481625385, catalogProductId: 753,
    image: "/images/merch/waveform-long-sleeve.png",
    color: "Black", decoration: "Front + both sleeves",
    description: "A heavyweight long sleeve with a musical detail: gold waveform artwork runs down both arms beneath the signature chest print.",
    details: ["Comfort Colors 6014", "100% ring-spun cotton; 6.1 oz/yd²", "Garment-dyed, relaxed fit with ribbed cuffs", "Three print placements: chest and both sleeves"],
  },
  {
    slug: "studio-letterman", name: "Studio Letterman", category: "The outer layer / 06",
    stripeProductId: "prod_VRR3n36nA7ByN7", printfulProductId: 481625424, catalogProductId: 1465,
    image: "/images/merch/studio-letterman.png",
    color: "Jet black / arctic white", decoration: "Chest + sleeve print",
    description: "A classic varsity shape in black and white. The chest wordmark and sleeve monogram carry the signature into a heavier layer.",
    details: ["AWDis JH043 heavyweight letterman", "Cotton-poly fabric with a brushed fleece interior", "Contrast fabric sleeves, snap buttons and striped ribbing", "Printed chest and sleeve artwork; fabric sleeves, not leather"],
  },
] as const;

export type MerchProduct = (typeof merch)[number];
export function findMerch(slug: string) { return merch.find((product) => product.slug === slug); }
