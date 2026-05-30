import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { getProduct, products, type Product } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { GoldButton, SectionHeading, Reveal, Stars } from "../components/ui";
import { useState } from "react";

export function Wishlist() {
  const { wishlist, addToCart, toggleWishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is Product => !!p);
  const [compare, setCompare] = useState(false);
  const recs = products.filter((p) => !wishlist.includes(p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 pt-24 text-center">
        <span className="text-6xl">♡</span>
        <h1 className="font-serif text-4xl font-light">Your wishlist awaits</h1>
        <p className="max-w-md text-silver">Save the fragrances that speak to you and return to them whenever inspiration strikes.</p>
        <Link to="/shop"><GoldButton>Discover Fragrances</GoldButton></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-5xl font-light">My <span className="italic gold-text">Wishlist</span></h1>
          <p className="mt-2 text-sm text-silver">{items.length} saved fragrance{items.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setCompare((c) => !c)} className="rounded-full border border-white/15 px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors hover:border-champagne hover:text-champagne">
            {compare ? "Card View" : "Compare"}
          </button>
          <button onClick={() => navigator.share?.({ title: "My Maison Lumière Wishlist" }).catch(() => {})} className="rounded-full border border-white/15 px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors hover:border-champagne hover:text-champagne">
            Share
          </button>
        </div>
      </div>

      {compare ? (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-champagne">
                <th className="p-3">Fragrance</th>
                <th className="p-3">Family</th>
                <th className="p-3">Concentration</th>
                <th className="p-3">Longevity</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Price</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-white/5">
                  <td className="p-3">
                    <Link to={`/product/${p.id}`} className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-14 w-12 rounded-lg object-cover" />
                      <span className="font-serif text-lg">{p.name}</span>
                    </Link>
                  </td>
                  <td className="p-3 text-silver">{p.family}</td>
                  <td className="p-3 text-silver">{p.concentration}</td>
                  <td className="p-3 text-silver">{p.longevity}/5</td>
                  <td className="p-3"><Stars rating={p.rating} size={11} /></td>
                  <td className="p-3 font-serif text-champagne">${p.price}</td>
                  <td className="p-3">
                    <button onClick={() => addToCart(p.id, p.sizes[0].ml, p.sizes[0].price)} className="rounded-full bg-champagne px-4 py-1.5 text-[10px] uppercase tracking-wider text-noir">Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
              <div className="mt-2 flex gap-2">
                <button onClick={() => addToCart(p.id, p.sizes[0].ml, p.sizes[0].price)} className="flex-1 rounded-full bg-champagne py-2 text-[10px] uppercase tracking-[0.2em] text-noir transition-colors hover:bg-champagne-light">
                  Move to Cart
                </button>
                <button onClick={() => toggleWishlist(p.id)} className="rounded-full border border-white/15 px-3 text-silver transition-colors hover:border-burgundy hover:text-burgundy">✕</button>
              </div>
              {p.stock < 10 && <p className="mt-2 text-center text-[10px] uppercase tracking-wider text-burgundy">● Low stock — {p.stock} left</p>}
            </div>
          ))}
        </div>
      )}

      <section className="mt-20">
        <Reveal><SectionHeading overline="✨ Curated for you" title={<>You might also <span className="italic gold-text">love</span></>} /></Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recs.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
