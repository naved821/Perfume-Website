export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const lifestyle = [12428350, 8217790, 8450331, 10536603, 8450539, 8450543];
const img = (n: number) =>
  `https://images.pexels.com/photos/${n}/pexels-photo-${n}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200`;

export const articles: Article[] = [
  {
    id: "art-of-layering",
    title: "The Art of Layering: Composing Your Signature",
    excerpt: "How to build a scent wardrobe and combine fragrances like a master perfumer — a guide to olfactory architecture.",
    category: "Guides",
    author: "Camille Roux",
    date: "Mar 12, 2026",
    readTime: "6 min",
    image: img(lifestyle[0]),
    featured: true,
  },
  {
    id: "oud-renaissance",
    title: "The Oud Renaissance in Modern Perfumery",
    excerpt: "Tracing liquid gold from the forests of Assam to the ateliers of Paris.",
    category: "Ingredients",
    author: "Jean-Luc Marais",
    date: "Mar 4, 2026",
    readTime: "8 min",
    image: img(lifestyle[1]),
  },
  {
    id: "spring-edit",
    title: "The Spring Edit: Fragrances to Bloom Into",
    excerpt: "Our perfumers select the green, floral and citrus notes defining the season.",
    category: "Seasonal",
    author: "Élise Fontaine",
    date: "Feb 26, 2026",
    readTime: "5 min",
    image: img(lifestyle[2]),
  },
  {
    id: "celebrity-scents",
    title: "Scent & Stardom: Icons and Their Signatures",
    excerpt: "The fragrances worn by cinema legends and how to capture their aura.",
    category: "Culture",
    author: "Camille Roux",
    date: "Feb 18, 2026",
    readTime: "7 min",
    image: img(lifestyle[3]),
  },
  {
    id: "perfumer-interview",
    title: "In Conversation with Our Master Perfumer",
    excerpt: "A rare glimpse into the mind behind Noir Absolu and the philosophy of patience.",
    category: "Interviews",
    author: "Maison Lumière",
    date: "Feb 9, 2026",
    readTime: "10 min",
    image: img(lifestyle[4]),
  },
  {
    id: "scent-memory",
    title: "Scent & Memory: The Science of Nostalgia",
    excerpt: "Why a single note can transport you decades into the past in an instant.",
    category: "Culture",
    author: "Dr. Hana Mori",
    date: "Jan 30, 2026",
    readTime: "6 min",
    image: img(lifestyle[5]),
  },
];

export const journalCategories = ["All", "Guides", "Ingredients", "Seasonal", "Culture", "Interviews"];
