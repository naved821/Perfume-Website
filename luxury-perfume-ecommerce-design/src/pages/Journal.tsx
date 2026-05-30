import { useEffect, useState } from "react";
import { articles, journalCategories, type Article } from "../data/journal";
import { Reveal, SectionHeading, GoldButton } from "../components/ui";

export function Journal() {
  const [cat, setCat] = useState("All");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = articles.find((a) => a.featured) as Article;
  const rest = articles.filter((a) => !a.featured && (cat === "All" || a.category === cat));

  return (
    <div className="pt-24">
      {/* reading progress */}
      <div className="fixed left-0 top-0 z-[95] h-1 bg-gradient-to-r from-champagne to-emerald transition-all" style={{ width: `${progress}%` }} />

      <div className="mx-auto max-w-7xl px-5 py-10">
        <Reveal>
          <SectionHeading
            overline="The Journal"
            title={<>Fragrance <span className="italic gold-text">Stories</span></>}
            subtitle="Trends, guides, perfumer interviews, and the culture of scent — curated by the Maison."
          />
        </Reveal>

        {/* featured */}
        <Reveal>
          <article className="group relative mt-14 grid overflow-hidden rounded-3xl md:grid-cols-2">
            <div className="relative h-72 overflow-hidden md:h-auto">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="glass flex flex-col justify-center p-8 md:p-12">
              <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Featured · {featured.category}</p>
              <h2 className="mt-3 font-serif text-3xl font-light leading-tight md:text-4xl">{featured.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-silver">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-silver">
                <span>{featured.author}</span> · <span>{featured.date}</span> · <span>{featured.readTime} read</span>
              </div>
              <button className="mt-7 self-start"><GoldButton>Read Story</GoldButton></button>
            </div>
          </article>
        </Reveal>

        {/* category filter */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {journalCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${cat === c ? "border-champagne bg-champagne text-noir" : "border-white/15 text-silver hover:border-champagne/50"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 80}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img src={a.image} alt={a.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-noir/70 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-champagne backdrop-blur">{a.category}</span>
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-champagne">{a.title}</h3>
                  <p className="mt-2 text-sm text-silver">{a.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-silver">
                    <span>{a.author} · {a.date}</span>
                    <span>{a.readTime}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
