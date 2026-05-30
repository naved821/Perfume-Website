import { Link } from "react-router-dom";
import { GoldButton } from "./ui";

const columns = [
  {
    title: "Maison",
    links: [
      { label: "Our Heritage", to: "/about" },
      { label: "Craftsmanship", to: "/about" },
      { label: "Sustainability", to: "/about" },
      { label: "Journal", to: "/journal" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "All Fragrances", to: "/shop" },
      { label: "Les Exclusifs", to: "/shop" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Fragrance Finder", to: "/fragrance-finder" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "My Account", to: "/dashboard" },
      { label: "Shipping & Returns", to: "/contact" },
      { label: "Boutiques", to: "/contact" },
    ],
  },
];

const boutiques = ["Paris · 16 Rue Saint-Honoré", "Milano · Via Montenapoleone", "New York · 5th Avenue", "Dubai · The Dubai Mall"];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-onyx">
      <div className="mx-auto max-w-7xl px-5 py-16">
        {/* Newsletter */}
        <div className="glass mb-16 grid items-center gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Le Cercle</p>
            <h3 className="mt-2 font-serif text-3xl md:text-4xl">Join our private circle</h3>
            <p className="mt-3 text-sm text-silver">
              Early access to exclusive editions, ateliers, and the art of scent — delivered with intention.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 rounded-full border border-white/15 bg-transparent px-5 py-3.5 text-sm outline-none transition-colors focus:border-champagne"
            />
            <GoldButton type="submit">Subscribe</GoldButton>
          </form>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <span className="font-serif text-2xl tracking-[0.2em] gold-text">MAISON LUMIÈRE</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
              A Parisian house of haute parfumerie, composing rare olfactory stories since 1908. Each flacon is a portrait painted in scent.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "Pinterest", "TikTok", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[10px] uppercase tracking-wide text-silver transition-colors hover:border-champagne hover:text-champagne"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-champagne">{c.title}</p>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-silver transition-colors hover:text-ivory">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-champagne">Boutiques</p>
          <div className="grid gap-3 text-xs text-silver sm:grid-cols-2 lg:grid-cols-4">
            {boutiques.map((b) => <p key={b}>{b}</p>)}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-silver">© 2026 Maison Lumière. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-silver">
            <span>Secure Payment</span>
            {["VISA", "MC", "AMEX", "PAY"].map((p) => (
              <span key={p} className="rounded border border-white/15 px-2 py-1">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
