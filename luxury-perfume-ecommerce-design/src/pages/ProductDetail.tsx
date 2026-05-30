import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProduct, products, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";
import { QuickView } from "../components/QuickView";
import { Stars, GoldButton, OutlineButton, MeterBar, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

const tabs = ["Description", "Notes", "Ingredients", "Usage", "Delivery", "Reviews"];

const reviews = [
  { name: "Sophia L.", rating: 5, date: "2 weeks ago", text: "Absolutely divine. The longevity is incredible — I can still smell it the next morning." },
  { name: "Marcus T.", rating: 5, date: "1 month ago", text: "Sophisticated and unique. Compliments everywhere I go. Worth every penny." },
  { name: "Yuki N.", rating: 4, date: "1 month ago", text: "Beautiful scent, very elegant. Sillage could be slightly stronger for my taste." },
];

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id || "");
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed, recentlyViewed } = useStore();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Description");
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) addRecentlyViewed(product.id);
    setSizeIdx(0);
    setQty(1);
    setTab("Description");
    setActiveImg(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="font-serif text-3xl">Fragrance not found</p>
        <Link to="/shop"><GoldButton>Back to Boutique</GoldButton></Link>
      </div>
    );
  }

  const images = [product.image, product.image2, product.image];
  const saved = wishlist.includes(product.id);
  const chosen = product.sizes[sizeIdx];
  const recs = products.filter((p) => p.id !== product.id && p.family === product.family).slice(0, 4);
  const youMayLike = products.filter((p) => p.id !== product.id).slice(0, 4);
  const layerWith = products.filter((p) => p.id !== product.id && p.gender !== product.gender).slice(0, 3);
  const recent = recentlyViewed.map(getProduct).filter((p): p is Product => !!p && p.id !== product.id);

  return (
    <div className="pt-24">
      {/* breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 py-4 text-xs text-silver">
        <Link to="/" className="hover:text-champagne">Home</Link> / <Link to="/shop" className="hover:text-champagne">Boutique</Link> / <span className="text-ivory">{product.name}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-2">
        {/* GALLERY */}
        <div>
          <div
            className={cn("group relative aspect-[4/5] overflow-hidden rounded-3xl bg-coal", zoom && "cursor-zoom-out")}
            onClick={() => setZoom((z) => !z)}
          >
            <img
              src={images[activeImg]}
              alt={product.name}
              className={cn(
                "h-full w-full object-cover transition-all duration-700",
                zoom ? "scale-150" : "scale-100",
                rotate && "animate-[spin360_4s_linear_infinite]"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/40 to-transparent" />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-noir/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-champagne backdrop-blur">{product.badge}</span>
            )}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setRotate((r) => !r); }}
                className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-noir/70 text-xs backdrop-blur", rotate && "text-champagne")}
                title="360° view"
              >
                360°
              </button>
              <span className="flex h-10 items-center rounded-full bg-noir/70 px-3 text-[10px] uppercase tracking-wider backdrop-blur">Click to zoom</span>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            {images.map((im, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn("h-24 w-20 overflow-hidden rounded-xl border-2 transition-colors", activeImg === i ? "border-champagne" : "border-transparent opacity-60")}
              >
                <img src={im} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">{product.collection}</p>
          <h1 className="mt-2 font-serif text-5xl font-light">{product.name}</h1>
          <p className="mt-1 text-lg italic text-silver">{product.subtitle}</p>
          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm text-silver">{product.rating} · {product.reviews} reviews</span>
          </div>

          <p className="mt-6 leading-relaxed text-silver">{product.description}</p>

          {/* meta */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "Family", v: product.family },
              { k: "Concentration", v: product.concentration },
              { k: "Gender", v: product.gender },
              { k: "Season", v: product.season.join(", ") },
            ].map((m) => (
              <div key={m.k} className="glass rounded-xl p-3">
                <p className="text-[9px] uppercase tracking-[0.2em] text-champagne">{m.k}</p>
                <p className="mt-1 text-xs text-ivory">{m.v}</p>
              </div>
            ))}
          </div>

          {/* longevity/sillage */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <MeterBar label={`Longevity · ${product.longevity}/5`} value={product.longevity} />
            <MeterBar label={`Sillage · ${product.sillage}/5`} value={product.sillage} />
          </div>

          {/* sizes */}
          <div className="mt-7">
            <p className="text-xs uppercase tracking-[0.2em] text-silver">Select Size</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.sizes.map((s, i) => (
                <button
                  key={s.ml}
                  onClick={() => setSizeIdx(i)}
                  className={cn(
                    "rounded-xl border px-5 py-3 text-sm transition-colors",
                    sizeIdx === i ? "border-champagne bg-champagne/10 text-champagne" : "border-white/15 text-silver hover:border-champagne/50"
                  )}
                >
                  <span className="block font-medium">{s.ml}ml</span>
                  <span className="text-xs">${s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* stock */}
          <p className={cn("mt-5 text-xs uppercase tracking-[0.2em]", product.stock < 10 ? "text-burgundy" : "text-emerald")}>
            {product.stock < 10 ? `● Only ${product.stock} left in stock` : "● In Stock"}
          </p>

          {/* qty + cta */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-white/15">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg">−</button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-lg">+</button>
            </div>
            <GoldButton onClick={() => addToCart(product.id, chosen.ml, chosen.price, qty)} className="flex-1">
              Add to Cart · ${chosen.price * qty}
            </GoldButton>
          </div>
          <div className="mt-3 flex gap-3">
            <OutlineButton
              onClick={() => { addToCart(product.id, chosen.ml, chosen.price, qty); navigate("/checkout"); }}
              className="flex-1"
            >
              Buy Now
            </OutlineButton>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-champagne/40 transition-colors hover:bg-champagne/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#cda869" : "none"} stroke="#cda869" strokeWidth="1.6">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-[10px] uppercase tracking-wider text-silver">
            <span>✦ Complimentary samples</span>
            <span>✦ Free shipping over $150</span>
            <span>✦ Gift wrapping available</span>
          </div>
        </div>
      </div>

      {/* SCENT PYRAMID */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="glass rounded-3xl p-8 md:p-12">
          <h2 className="text-center font-serif text-4xl font-light">The <span className="italic gold-text">Scent Pyramid</span></h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {([
              { label: "Top Notes", notes: product.notes.top, desc: "The first impression — bright and fleeting." },
              { label: "Heart Notes", notes: product.notes.heart, desc: "The soul of the fragrance, blooming over time." },
              { label: "Base Notes", notes: product.notes.base, desc: "The lasting memory left on the skin." },
            ]).map((layer, i) => (
              <Reveal key={layer.label} delay={i * 120}>
                <div className="text-center">
                  <div
                    className="mx-auto flex items-center justify-center rounded-full border border-champagne/30"
                    style={{ width: 110 + i * 30, height: 110 + i * 30, background: `radial-gradient(circle, ${product.color}33, transparent)` }}
                  >
                    <span className="text-3xl">{["✦", "❀", "◆"][i]}</span>
                  </div>
                  <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-champagne">{layer.label}</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {layer.notes.map((n) => (
                      <span key={n} className="rounded-full border border-white/15 px-3 py-1 text-xs text-ivory">{n}</span>
                    ))}
                  </div>
                  <p className="mx-auto mt-3 max-w-xs text-xs text-silver">{layer.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-white/10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "whitespace-nowrap px-5 py-3 text-xs uppercase tracking-[0.2em] transition-colors",
                tab === t ? "border-b-2 border-champagne text-champagne" : "text-silver hover:text-ivory"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-8 text-sm leading-relaxed text-silver">
          {tab === "Description" && <p>{product.story}</p>}
          {tab === "Notes" && (
            <div className="space-y-2">
              <p><span className="text-champagne">Top:</span> {product.notes.top.join(", ")}</p>
              <p><span className="text-champagne">Heart:</span> {product.notes.heart.join(", ")}</p>
              <p><span className="text-champagne">Base:</span> {product.notes.base.join(", ")}</p>
            </div>
          )}
          {tab === "Ingredients" && <p>{product.ingredients}</p>}
          {tab === "Usage" && <p>Apply to pulse points — wrists, neck, and behind the ears — on moisturized skin for optimal longevity. Avoid rubbing, which fractures the molecular structure of the fragrance. For a softer trail, mist into the air and walk through.</p>}
          {tab === "Delivery" && <p>Complimentary express shipping on orders over $150. Standard delivery 2–4 business days. Each order arrives in our signature lacquered box with hand-tied ribbon and two complimentary samples. Returns accepted within 30 days.</p>}
          {tab === "Reviews" && (
            <div className="space-y-5">
              {reviews.map((r) => (
                <div key={r.name} className="glass rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ivory">{r.name}</p>
                    <span className="text-xs">{r.date}</span>
                  </div>
                  <div className="mt-1"><Stars rating={r.rating} size={12} /></div>
                  <p className="mt-2">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI RECOMMENDATIONS */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="glass rounded-3xl p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">✨ AI Perfumer suggests</p>
          <h2 className="mt-2 font-serif text-3xl font-light">Layer With</h2>
          <p className="mt-2 text-sm text-silver">Build a bespoke accord by combining {product.name} with these complementary scents.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {layerWith.map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)}
          </div>
        </div>
      </section>

      <RecRow title="You May Also Like" items={youMayLike} onQuick={setQuick} />
      {recs.length > 0 && <RecRow title={`More from ${product.family}`} items={recs} onQuick={setQuick} />}
      {recent.length > 0 && <RecRow title="Recently Viewed" items={recent.slice(0, 4)} onQuick={setQuick} />}

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

function RecRow({ title, items, onQuick }: { title: string; items: Product[]; onQuick: (p: Product) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <h2 className="mb-8 font-serif text-3xl font-light">{title}</h2>
      <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4">
        {items.map((p) => (
          <div key={p.id} className="w-64 flex-shrink-0">
            <ProductCard product={p} onQuickView={onQuick} />
          </div>
        ))}
      </div>
    </section>
  );
}
