import { Link } from "react-router-dom";
import { useState } from "react";
import type { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Stars } from "./ui";
import { cn } from "../utils/cn";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [hover, setHover] = useState(false);
  const saved = wishlist.includes(product.id);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl bg-coal">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                hover ? "scale-110 opacity-0" : "scale-100 opacity-100"
              )}
            />
            <img
              src={product.image2}
              alt={product.name}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                hover ? "scale-105 opacity-100" : "scale-110 opacity-0"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
            {/* bottom reflection glow */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(ellipse at bottom, ${product.color}55, transparent 70%)`,
              }}
            />
          </div>
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-noir/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne backdrop-blur">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-noir/60 backdrop-blur transition-colors hover:bg-noir"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={saved ? "#cda869" : "none"}
            stroke={saved ? "#cda869" : "#f6f2ea"}
            strokeWidth="1.6"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>

        {/* hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addToCart(product.id, product.sizes[0].ml, product.sizes[0].price)}
            className="flex-1 rounded-full bg-champagne py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-noir transition-colors hover:bg-champagne-light"
          >
            Quick Add
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-noir/80 backdrop-blur transition-colors hover:bg-noir"
              aria-label="Quick view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f6f2ea" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-champagne">
            {product.collection}
          </p>
          <Stars rating={product.rating} size={11} />
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 font-serif text-xl leading-tight transition-colors hover:text-champagne">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-silver">{product.family}</p>
        <div className="mt-2 flex items-center gap-1.5">
          {product.notes.heart.slice(0, 3).map((n) => (
            <span
              key={n}
              className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wide text-silver"
            >
              {n}
            </span>
          ))}
        </div>
        <p className="mt-3 font-serif text-lg text-ivory">
          ${product.price}
          <span className="ml-1 text-xs text-silver">/ {product.sizes[0].ml}ml</span>
        </p>
      </div>
    </div>
  );
}
