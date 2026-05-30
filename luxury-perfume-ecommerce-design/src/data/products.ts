export interface Product {
  id: string;
  name: string;
  subtitle: string;
  collection: string;
  family: string;
  gender: "Feminine" | "Masculine" | "Unisex";
  concentration: string;
  season: string[];
  occasion: string[];
  longevity: number; // 1-5
  sillage: number; // 1-5
  price: number;
  sizes: { ml: number; price: number }[];
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  image2: string;
  tags: ("new" | "best" | "exclusive" | "trending")[];
  notes: { top: string[]; heart: string[]; base: string[] };
  description: string;
  story: string;
  ingredients: string;
  stock: number;
  color: string;
}

const img = (n: number) =>
  `https://images.pexels.com/photos/${n}/pexels-photo-${n}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800`;

export const products: Product[] = [
  {
    id: "noir-absolu",
    name: "Noir Absolu",
    subtitle: "An ode to midnight",
    collection: "Les Exclusifs",
    family: "Oriental Woody",
    gender: "Unisex",
    concentration: "Extrait de Parfum",
    season: ["Autumn", "Winter"],
    occasion: ["Evening", "Special"],
    longevity: 5,
    sillage: 5,
    price: 320,
    sizes: [
      { ml: 50, price: 320 },
      { ml: 75, price: 420 },
      { ml: 100, price: 510 },
    ],
    rating: 4.9,
    reviews: 412,
    badge: "Exclusive",
    image: img(7850600),
    image2: img(11216321),
    tags: ["exclusive", "best"],
    notes: {
      top: ["Black Pepper", "Bergamot", "Saffron"],
      heart: ["Bulgarian Rose", "Oud", "Patchouli"],
      base: ["Amber", "Vanilla", "Sandalwood"],
    },
    description:
      "A nocturnal symphony of smoldering oud and velvet rose, Noir Absolu unfolds like a secret whispered in the dark — opulent, magnetic, unforgettable.",
    story:
      "Composed over three years in our Grasse atelier, Noir Absolu captures the hush of midnight in an old-world palazzo. Rare Laotian oud is married to Bulgarian rose harvested at dawn.",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Coumarin.",
    stock: 8,
    color: "#1b1b1f",
  },
  {
    id: "or-imperial",
    name: "Or Impérial",
    subtitle: "Liquid gold",
    collection: "Haute Parfumerie",
    family: "Amber Floral",
    gender: "Feminine",
    concentration: "Eau de Parfum",
    season: ["Autumn", "Spring"],
    occasion: ["Evening", "Daytime"],
    longevity: 4,
    sillage: 4,
    price: 245,
    sizes: [
      { ml: 30, price: 165 },
      { ml: 50, price: 245 },
      { ml: 100, price: 380 },
    ],
    rating: 4.8,
    reviews: 689,
    badge: "Best Seller",
    image: img(32645070),
    image2: img(14402569),
    tags: ["best", "trending"],
    notes: {
      top: ["Mandarin", "Pink Pepper", "Pear"],
      heart: ["Jasmine Sambac", "Orange Blossom", "Tuberose"],
      base: ["Amber", "Benzoin", "Musk"],
    },
    description:
      "A radiant cascade of white florals dipped in warm amber, Or Impérial glows like champagne caught in candlelight.",
    story:
      "Inspired by the gilded salons of the Belle Époque, this composition celebrates the golden hour — that fleeting moment when light turns liquid.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Benzyl Salicylate, Citronellol, Geraniol.",
    stock: 24,
    color: "#cda869",
  },
  {
    id: "emeraude-sauvage",
    name: "Émeraude Sauvage",
    subtitle: "The wild green heart",
    collection: "Les Naturels",
    family: "Green Aromatic",
    gender: "Masculine",
    concentration: "Eau de Parfum",
    season: ["Spring", "Summer"],
    occasion: ["Daytime", "Office"],
    longevity: 4,
    sillage: 3,
    price: 210,
    sizes: [
      { ml: 50, price: 210 },
      { ml: 100, price: 320 },
    ],
    rating: 4.7,
    reviews: 523,
    badge: "New",
    image: img(33295344),
    image2: img(7270670),
    tags: ["new", "trending"],
    notes: {
      top: ["Galbanum", "Bergamot", "Violet Leaf"],
      heart: ["Vetiver", "Geranium", "Cardamom"],
      base: ["Cedarwood", "Oakmoss", "Ambroxan"],
    },
    description:
      "A bracing rush of crushed green leaves and cool vetiver, Émeraude Sauvage is the scent of a forest after rain — vivid, untamed, alive.",
    story:
      "Sourced from sustainable vetiver fields in Haiti, this fragrance is a tribute to the wild — bottled freshness with a sophisticated emerald soul.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Eugenol.",
    stock: 31,
    color: "#1c6b56",
  },
  {
    id: "rose-de-minuit",
    name: "Rose de Minuit",
    subtitle: "Midnight in bloom",
    collection: "Les Exclusifs",
    family: "Floral Chypre",
    gender: "Feminine",
    concentration: "Extrait de Parfum",
    season: ["Autumn", "Winter"],
    occasion: ["Evening", "Special"],
    longevity: 5,
    sillage: 4,
    price: 295,
    sizes: [
      { ml: 50, price: 295 },
      { ml: 100, price: 460 },
    ],
    rating: 4.9,
    reviews: 301,
    badge: "Limited",
    image: img(15190739),
    image2: img(31771395),
    tags: ["exclusive", "trending"],
    notes: {
      top: ["Raspberry", "Saffron", "Bergamot"],
      heart: ["Turkish Rose", "Peony", "Lychee"],
      base: ["Patchouli", "Vanilla", "White Musk"],
    },
    description:
      "A decadent rose veiled in dark fruits and patchouli, Rose de Minuit is sensual, brooding, and impossibly romantic.",
    story:
      "A limited edition of 1,000 numbered flacons, each sealed by hand. The rose absolute is distilled from petals gathered only under moonlight.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Citronellol, Geraniol, Coumarin.",
    stock: 5,
    color: "#5c1a2b",
  },
  {
    id: "bois-de-nuage",
    name: "Bois de Nuage",
    subtitle: "Woods in the clouds",
    collection: "Haute Parfumerie",
    family: "Woody Musk",
    gender: "Unisex",
    concentration: "Eau de Parfum",
    season: ["All Seasons"],
    occasion: ["Daytime", "Office", "Evening"],
    longevity: 4,
    sillage: 3,
    price: 230,
    sizes: [
      { ml: 50, price: 230 },
      { ml: 100, price: 350 },
    ],
    rating: 4.6,
    reviews: 444,
    image: img(7814730),
    image2: img(15190739),
    tags: ["best", "new"],
    notes: {
      top: ["Pink Pepper", "Elemi", "Mandarin"],
      heart: ["Iris", "Cashmere Wood", "Violet"],
      base: ["Sandalwood", "White Musk", "Tonka"],
    },
    description:
      "Soft, powdery woods wrapped in cashmeran and luminous musk — Bois de Nuage is a second skin, intimate and endlessly comforting.",
    story:
      "An exercise in restraint and elegance, blending creamy sandalwood with airy iris for a fragrance that feels like cashmere against skin.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Linalool, Hexyl Cinnamal, Coumarin.",
    stock: 42,
    color: "#b7b3ac",
  },
  {
    id: "ambre-royal",
    name: "Ambre Royal",
    subtitle: "Warmth of empires",
    collection: "Les Exclusifs",
    family: "Amber Oriental",
    gender: "Unisex",
    concentration: "Extrait de Parfum",
    season: ["Winter", "Autumn"],
    occasion: ["Evening", "Special"],
    longevity: 5,
    sillage: 5,
    price: 340,
    sizes: [
      { ml: 50, price: 340 },
      { ml: 100, price: 540 },
    ],
    rating: 4.8,
    reviews: 268,
    badge: "Exclusive",
    image: img(11216321),
    image2: img(7850600),
    tags: ["exclusive"],
    notes: {
      top: ["Cinnamon", "Bergamot", "Cardamom"],
      heart: ["Amber", "Labdanum", "Honey"],
      base: ["Vanilla", "Tonka Bean", "Benzoin"],
    },
    description:
      "A golden embrace of amber, honey and vanilla — Ambre Royal is liquid candlelight, regal and intoxicating.",
    story:
      "Built around a precious amber accord aged for twelve months, this fragrance evokes the treasure rooms of forgotten dynasties.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Coumarin, Benzyl Benzoate, Linalool.",
    stock: 11,
    color: "#cda869",
  },
  {
    id: "azur-eclat",
    name: "Azur Éclat",
    subtitle: "Mediterranean light",
    collection: "Les Naturels",
    family: "Citrus Aromatic",
    gender: "Masculine",
    concentration: "Eau de Toilette",
    season: ["Summer", "Spring"],
    occasion: ["Daytime", "Sport"],
    longevity: 3,
    sillage: 3,
    price: 175,
    sizes: [
      { ml: 50, price: 175 },
      { ml: 100, price: 260 },
    ],
    rating: 4.5,
    reviews: 612,
    badge: "Best Seller",
    image: img(15190739),
    image2: img(33295344),
    tags: ["best", "trending"],
    notes: {
      top: ["Sicilian Lemon", "Sea Salt", "Mint"],
      heart: ["Rosemary", "Lavender", "Marine Accord"],
      base: ["Driftwood", "Ambergris", "Musk"],
    },
    description:
      "A sparkling burst of citrus and sea spray, Azur Éclat is sunlight on the Riviera — effortless, fresh, eternally chic.",
    story:
      "Capturing the cobalt coastline of the Côte d'Azur, this aromatic citrus is the essence of summer freedom.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Citral.",
    stock: 58,
    color: "#0d1b34",
  },
  {
    id: "velours-noir",
    name: "Velours Noir",
    subtitle: "Sensual shadows",
    collection: "Haute Parfumerie",
    family: "Gourmand Oriental",
    gender: "Feminine",
    concentration: "Eau de Parfum",
    season: ["Winter", "Autumn"],
    occasion: ["Evening", "Special"],
    longevity: 5,
    sillage: 4,
    price: 265,
    sizes: [
      { ml: 50, price: 265 },
      { ml: 100, price: 410 },
    ],
    rating: 4.7,
    reviews: 377,
    badge: "Trending",
    image: img(31771395),
    image2: img(32645070),
    tags: ["trending", "best"],
    notes: {
      top: ["Black Cherry", "Bitter Almond", "Pink Pepper"],
      heart: ["Tuberose", "Coffee", "Orris"],
      base: ["Tonka", "Praline", "Cashmere Wood"],
    },
    description:
      "Decadent cherry and roasted coffee melt into creamy tonka — Velours Noir is dessert for the senses, dark and irresistible.",
    story:
      "A modern gourmand for the bold, balancing edible warmth with smoky sophistication. Velvet in a bottle.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Benzaldehyde, Coumarin, Linalool.",
    stock: 19,
    color: "#5c1a2b",
  },
];

export const families = [
  "Oriental Woody", "Amber Floral", "Green Aromatic", "Floral Chypre",
  "Woody Musk", "Amber Oriental", "Citrus Aromatic", "Gourmand Oriental",
];
export const concentrations = ["Extrait de Parfum", "Eau de Parfum", "Eau de Toilette"];
export const genders = ["Feminine", "Masculine", "Unisex"];
export const collections = ["Les Exclusifs", "Haute Parfumerie", "Les Naturels"];
export const seasons = ["Spring", "Summer", "Autumn", "Winter", "All Seasons"];
export const occasions = ["Daytime", "Evening", "Office", "Special", "Sport"];

export const getProduct = (id: string) => products.find((p) => p.id === id);
