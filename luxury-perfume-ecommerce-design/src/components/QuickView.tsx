import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Stars, GoldButton } from "./ui";

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(0);
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;
  const saved = wishlist.includes(product.id);
  const chosen = product.sizes[size];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-noir/80 backdrop-blur-md" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass relative z-10 grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-3xl md:grid-cols-2"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-noir/60 text-ivory transition-colors hover:bg-noir"
        >
          ✕
        </button>
        <div className="relative aspect-square overflow-hidden md:aspect-auto">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent" />
        </div>
        <div className="flex flex-col p-7">
          <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">
            {product.collection}
          </p>
          <h3 className="mt-2 font-serif text-3xl">{product.name}</h3>
          <p className="mt-1 text-sm italic text-silver">{product.subtitle}</p>
          <div className="mt-3 flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-xs text-silver">{product.reviews} reviews</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-silver">{product.description}</p>

          <div className="mt-5 space-y-1 text-xs text-silver">
            <p><span className="text-champagne">Top:</span> {product.notes.top.join(", ")}</p>
            <p><span className="text-champagne">Heart:</span> {product.notes.heart.join(", ")}</p>
            <p><span className="text-champagne">Base:</span> {product.notes.base.join(", ")}</p>
          </div>

          <div className="mt-5 flex gap-2">
            {product.sizes.map((s, i) => (
              <button
                key={s.ml}
                onClick={() => setSize(i)}
                className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                  size === i
                    ? "border-champagne bg-champagne/15 text-champagne"
                    : "border-white/15 text-silver hover:border-champagne/50"
                }`}
              >
                {s.ml}ml · ${s.price}
              </button>
            ))}
          </div>

          <div className="mt-auto flex gap-3 pt-6">
            <GoldButton
              onClick={() => {
                addToCart(product.id, chosen.ml, chosen.price);
                onClose();
              }}
              className="flex-1"
            >
              Add · ${chosen.price}
            </GoldButton>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40 transition-colors hover:bg-champagne/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#cda869" : "none"} stroke="#cda869" strokeWidth="1.6">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
          </div>
          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-champagne hover:underline"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
}
