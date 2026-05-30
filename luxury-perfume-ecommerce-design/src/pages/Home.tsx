import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products, type Product } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { QuickView } from "../components/QuickView";
import {
  Reveal,
  Particles,
  SectionHeading,
  GoldButton,
  OutlineButton,
  Stars,
} from "../components/ui";

const testimonials = [
  { name: "Isabelle V.", city: "Paris", text: "Noir Absolu has become my second skin. Strangers stop me to ask what I'm wearing — every single day.", rating: 5 },
  { name: "Mateo R.", city: "Milano", text: "The craftsmanship is unmatched. Émeraude Sauvage feels alive, like walking through a forest after rain.", rating: 5 },
  { name: "Amara K.", city: "Dubai", text: "From the unboxing to the lasting trail, this is luxury defined. Or Impérial is pure liquid gold.", rating: 5 },
];

const gallery = [7850600, 11216321, 32645070, 33295344, 15190739, 31771395];

export function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY;
        heroRef.current.style.transform = `translateY(${y * 0.4}px) scale(${1 + y * 0.0004})`;
        heroRef.current.style.opacity = String(Math.max(0, 1 - y / 700));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const newArrivals = products.filter((p) => p.tags.includes("new"));
  const bestSellers = products.filter((p) => p.tags.includes("best"));
  const exclusives = products.filter((p) => p.tags.includes("exclusive"));
  const trending = products.filter((p) => p.tags.includes("trending"));

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <img src="/images/hero.jpg" alt="Maison Lumière" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-noir/30 to-noir" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir/60 via-transparent to-noir/30" />
        </div>
        <Particles count={24} />
        {/* mist */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-champagne/10 blur-3xl" />

        <div className="relative z-10 px-5 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-champagne">Maison Lumière · Est. 1908</p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="mt-6 font-serif text-6xl font-light leading-[0.95] md:text-8xl lg:text-9xl">
              The Scent of
              <br />
              <span className="gold-text italic">Eternity</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-silver md:text-lg">
              Rare olfactory stories composed by hand in Paris. Where every flacon
              becomes an extension of your soul.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/shop"><GoldButton>Explore Collection</GoldButton></Link>
              <Link to="/fragrance-finder"><OutlineButton>Find Your Scent</OutlineButton></Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-champagne">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-white/10 bg-onyx py-4">
        <div className="flex animate-[shimmer_none] gap-12 overflow-hidden whitespace-nowrap">
          <Marquee />
        </div>
      </div>

      {/* SIGNATURE COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <SectionHeading
            overline="Curated by our perfumers"
            title={<>Signature <span className="italic gold-text">Collections</span></>}
            subtitle="Three worlds of olfactory artistry, each composed to reveal a different facet of you."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { title: "Les Exclusifs", desc: "Rare, numbered editions", color: "from-burgundy/60", img: products[0].image },
            { title: "Haute Parfumerie", desc: "The pinnacle of the craft", color: "from-emerald-deep/70", img: products[1].image },
            { title: "Les Naturels", desc: "Sustainable & vivid", color: "from-midnight/70", img: products[2].image },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <Link to="/shop" className="group relative block h-[28rem] overflow-hidden rounded-2xl">
                <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${c.color} via-noir/40 to-transparent`} />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-serif text-3xl">{c.title}</p>
                  <p className="mt-1 text-sm text-silver">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-champagne opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Discover →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CAROUSELS */}
      <Carousel title="New Arrivals" overline="Fresh from the atelier" items={newArrivals} onQuick={setQuick} />
      <Carousel title="Best Sellers" overline="Adored worldwide" items={bestSellers} onQuick={setQuick} />

      {/* BRAND STORY SPLIT */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <img src="/images/atelier.jpg" alt="Our atelier" className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="glass absolute -bottom-6 -right-6 hidden rounded-2xl p-6 md:block">
                <p className="font-serif text-4xl gold-text">1908</p>
                <p className="text-xs uppercase tracking-[0.2em] text-silver">Year founded</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-champagne">Our Story</p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-5xl">
                A century of <span className="italic gold-text">scent-making</span> mastery
              </h2>
              <p className="mt-6 leading-relaxed text-silver">
                In a sunlit atelier overlooking the rooftops of Paris, our perfumers
                blend the rarest essences from across the world — Grasse jasmine,
                Laotian oud, Calabrian bergamot — into compositions that defy time.
              </p>
              <p className="mt-4 leading-relaxed text-silver">
                Every fragrance is aged, hand-finished, and bottled in crystal. This is
                not perfume. This is portraiture in scent.
              </p>
              <Link to="/about" className="mt-8 inline-block">
                <OutlineButton>Discover the Maison</OutlineButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Carousel title="Exclusive Editions" overline="Numbered & rare" items={exclusives} onQuick={setQuick} dark />
      <Carousel title="Trending Now" overline="The current obsession" items={trending} onQuick={setQuick} />

      {/* FRAGRANCE QUIZ TEASER */}
      <section className="relative mx-auto my-12 max-w-7xl overflow-hidden rounded-3xl px-5">
        <div className="relative overflow-hidden rounded-3xl">
          <img src="/images/campaign.jpg" alt="Fragrance finder" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/70 to-transparent" />
          <Particles count={12} />
          <div className="relative z-10 max-w-lg p-10 md:p-16">
            <p className="text-xs uppercase tracking-[0.4em] text-champagne">Discover your scent</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-5xl">
              The Fragrance <span className="italic gold-text">Finder</span>
            </h2>
            <p className="mt-5 leading-relaxed text-silver">
              Answer five intimate questions and let our AI perfumer reveal the
              fragrance written in your character.
            </p>
            <Link to="/fragrance-finder" className="mt-8 inline-block">
              <GoldButton>Begin the Quiz</GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CELEBRITY / CAMPAIGN */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal>
          <SectionHeading overline="In the spotlight" title={<>Campaigns & <span className="italic gold-text">Collaborations</span></>} />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "The Golden Hour", tag: "Feat. Aria Sol", img: gallery[2] },
            { name: "Midnight Muse", tag: "Feat. Noé Vance", img: gallery[1] },
            { name: "Wild Bloom", tag: "Feat. Lina Moreau", img: gallery[3] },
          ].map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <div className="group relative h-80 overflow-hidden rounded-2xl">
                <img src={`https://images.pexels.com/photos/${c.img}/pexels-photo-${c.img}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700`} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">{c.tag}</p>
                  <p className="font-serif text-2xl">{c.name}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal>
          <SectionHeading overline="Voices of the maison" title={<>What our <span className="italic gold-text">connoisseurs</span> say</>} />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="glass h-full rounded-2xl p-8">
                <Stars rating={t.rating} />
                <p className="mt-4 font-serif text-xl italic leading-relaxed text-ivory">“{t.text}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne/20 font-serif text-champagne">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-silver">{t.city}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSTAGRAM GALLERY */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <Reveal>
          <SectionHeading overline="@maisonlumiere" title={<>Follow the <span className="italic gold-text">trail</span></>} />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {gallery.map((g, i) => (
            <Reveal key={g} delay={i * 60}>
              <a href="#" className="group relative block aspect-square overflow-hidden rounded-xl">
                <img src={`https://images.pexels.com/photos/${g}/pexels-photo-${g}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500`} alt="Instagram" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center bg-noir/0 opacity-0 transition-all group-hover:bg-noir/40 group-hover:opacity-100">
                  <span className="text-champagne">♡</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

function Marquee() {
  const words = ["GRASSE JASMINE", "LAOTIAN OUD", "BERGAMOT", "BULGARIAN ROSE", "AMBER", "VETIVER", "SAFFRON", "SANDALWOOD"];
  return (
    <>
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center gap-12 text-sm uppercase tracking-[0.3em] text-silver">
          {w} <span className="text-champagne">✦</span>
        </span>
      ))}
    </>
  );
}

function Carousel({
  title,
  overline,
  items,
  onQuick,
  dark,
}: {
  title: string;
  overline: string;
  items: Product[];
  onQuick: (p: Product) => void;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };
  return (
    <section className={`py-16 ${dark ? "bg-onyx" : ""}`}>
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-champagne">{overline}</p>
              <h2 className="mt-2 font-serif text-4xl font-light md:text-5xl">{title}</h2>
            </div>
            <div className="hidden gap-2 md:flex">
              <button onClick={() => scroll(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-champagne hover:text-champagne">←</button>
              <button onClick={() => scroll(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-champagne hover:text-champagne">→</button>
            </div>
          </div>
        </Reveal>
        <div ref={ref} className="no-scrollbar mt-10 flex gap-6 overflow-x-auto pb-4">
          {items.map((p) => (
            <div key={p.id} className="w-72 flex-shrink-0">
              <ProductCard product={p} onQuickView={onQuick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
