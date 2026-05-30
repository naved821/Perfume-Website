import { useMemo, useState, useEffect } from "react";
import {
  products,
  families,
  concentrations,
  genders,
  collections,
  seasons,
  occasions,
  type Product,
} from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { QuickView } from "../components/QuickView";
import { Reveal } from "../components/ui";
import { cn } from "../utils/cn";

interface Filters {
  family: string[];
  concentration: string[];
  gender: string[];
  collection: string[];
  season: string[];
  occasion: string[];
  maxPrice: number;
}

const empty: Filters = {
  family: [],
  concentration: [],
  gender: [],
  collection: [],
  season: [],
  occasion: [],
  maxPrice: 600,
};

export function Shop() {
  const [filters, setFilters] = useState<Filters>(empty);
  const [sort, setSort] = useState("featured");
  const [quick, setQuick] = useState<Product | null>(null);
  const [visible, setVisible] = useState(6);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = (key: keyof Filters, val: string) => {
    setFilters((f) => {
      const arr = f[key] as string[];
      return {
        ...f,
        [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
    setVisible(6);
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.family.length && !filters.family.includes(p.family)) return false;
      if (filters.concentration.length && !filters.concentration.includes(p.concentration)) return false;
      if (filters.gender.length && !filters.gender.includes(p.gender)) return false;
      if (filters.collection.length && !filters.collection.includes(p.collection)) return false;
      if (filters.season.length && !p.season.some((s) => filters.season.includes(s))) return false;
      if (filters.occasion.length && !p.occasion.some((o) => filters.occasion.includes(o))) return false;
      if (p.price > filters.maxPrice) return false;
      return true;
    });
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, sort]);

  // infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
        setVisible((v) => (v < filtered.length ? v + 3 : v));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  const activeCount = Object.values(filters).flat().filter((v) => typeof v === "string").length;

  const FilterPanel = (
    <div className="space-y-7">
      <FilterGroup title="Fragrance Family" options={families} selected={filters.family} onToggle={(v) => toggle("family", v)} />
      <FilterGroup title="Concentration" options={concentrations} selected={filters.concentration} onToggle={(v) => toggle("concentration", v)} />
      <FilterGroup title="Gender" options={genders} selected={filters.gender} onToggle={(v) => toggle("gender", v)} />
      <FilterGroup title="Collection" options={collections} selected={filters.collection} onToggle={(v) => toggle("collection", v)} />
      <FilterGroup title="Season" options={seasons} selected={filters.season} onToggle={(v) => toggle("season", v)} />
      <FilterGroup title="Occasion" options={occasions} selected={filters.occasion} onToggle={(v) => toggle("occasion", v)} />
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-champagne">Max Price</p>
        <input
          type="range"
          min={150}
          max={600}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: +e.target.value }))}
          className="w-full accent-[#cda869]"
        />
        <p className="mt-2 text-sm text-silver">Up to <span className="text-ivory">${filters.maxPrice}</span></p>
      </div>
      <button onClick={() => setFilters(empty)} className="w-full rounded-full border border-white/15 py-2.5 text-xs uppercase tracking-[0.2em] text-silver transition-colors hover:border-champagne hover:text-champagne">
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="pt-28">
      {/* header */}
      <div className="relative overflow-hidden border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-champagne">The Collection</p>
          <h1 className="mt-3 font-serif text-5xl font-light md:text-6xl">The <span className="italic gold-text">Boutique</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-silver">
            Explore our complete olfactory library. Filter by family, note, and mood to find your perfect match.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-10 px-5 py-12">
        {/* desktop sidebar */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-28">{FilterPanel}</div>
        </aside>

        <div className="flex-1">
          <div className="mb-8 flex items-center justify-between gap-4">
            <p className="text-sm text-silver">{filtered.length} fragrances</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.15em] lg:hidden">
                Filters {activeCount > 0 && <span className="text-champagne">({activeCount})</span>}
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-xs uppercase tracking-[0.15em] text-ivory outline-none [&>option]:bg-onyx"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl">No fragrances match your selection</p>
              <button onClick={() => setFilters(empty)} className="mt-4 text-sm text-champagne hover:underline">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.slice(0, visible).map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <ProductCard product={p} onQuickView={setQuick} />
                </Reveal>
              ))}
            </div>
          )}
          {visible < filtered.length && (
            <p className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-silver">Loading more…</p>
          )}
        </div>
      </div>

      {/* mobile filter drawer */}
      <div className={cn("fixed inset-0 z-[120] lg:hidden", drawerOpen ? "" : "pointer-events-none")}>
        <div className={cn("absolute inset-0 bg-noir/70 transition-opacity", drawerOpen ? "opacity-100" : "opacity-0")} onClick={() => setDrawerOpen(false)} />
        <div className={cn("glass absolute left-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto p-7 transition-transform", drawerOpen ? "translate-x-0" : "-translate-x-full")}>
          <div className="mb-6 flex items-center justify-between">
            <p className="font-serif text-2xl">Filters</p>
            <button onClick={() => setDrawerOpen(false)} className="text-silver">✕</button>
          </div>
          {FilterPanel}
        </div>
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/10 pb-5">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-champagne">{title}</span>
        <span className="text-silver transition-transform" style={{ transform: open ? "rotate(180deg)" : "" }}>⌄</span>
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {options.map((o) => (
            <label key={o} onClick={() => onToggle(o)} className="flex cursor-pointer items-center gap-3 text-sm text-silver transition-colors hover:text-ivory">
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded border transition-colors",
                  selected.includes(o) ? "border-champagne bg-champagne text-noir" : "border-white/25"
                )}
              >
                {selected.includes(o) && <span className="text-[10px]">✓</span>}
              </span>
              {o}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
