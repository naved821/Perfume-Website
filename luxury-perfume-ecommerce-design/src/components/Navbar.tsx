import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { SearchOverlay } from "./SearchOverlay";
import { collections, families } from "../data/products";
import { cn } from "../utils/cn";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop", mega: true },
  { label: "Collections", to: "/shop" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist, theme, toggleTheme } = useStore();
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMega(false);
  }, [loc.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-500",
          scrolled
            ? "glass py-3 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
          {/* Left nav (desktop) */}
          <nav className="hidden flex-1 items-center gap-7 lg:flex">
            {navLinks.slice(0, 3).map((l) => (
              <div
                key={l.label}
                onMouseEnter={() => l.mega && setMega(true)}
                onMouseLeave={() => l.mega && setMega(false)}
              >
                <Link
                  to={l.to}
                  className="text-xs font-medium uppercase tracking-[0.2em] text-ivory/90 transition-colors hover:text-champagne"
                >
                  {l.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center lg:flex-1">
            <span className="font-serif text-2xl tracking-[0.2em] gold-text md:text-3xl">
              MAISON LUMIÈRE
            </span>
            <span className="text-[8px] uppercase tracking-[0.5em] text-silver">
              Haute Parfumerie · Paris
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
            <button onClick={() => setSearch(true)} aria-label="Search" className="text-ivory/90 transition-colors hover:text-champagne">
              <Icon name="search" />
            </button>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="hidden text-ivory/90 transition-colors hover:text-champagne sm:block">
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <Link to="/dashboard" aria-label="Account" className="hidden text-ivory/90 transition-colors hover:text-champagne sm:block">
              <Icon name="user" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative text-ivory/90 transition-colors hover:text-champagne">
              <Icon name="heart" />
              {wishlist.length > 0 && <Badge n={wishlist.length} />}
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative text-ivory/90 transition-colors hover:text-champagne">
              <Icon name="bag" />
              {cartCount > 0 && <Badge n={cartCount} />}
            </Link>
            <button onClick={() => setMobileOpen(true)} aria-label="Menu" className="text-ivory/90 lg:hidden">
              <Icon name="menu" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div
          onMouseEnter={() => setMega(true)}
          onMouseLeave={() => setMega(false)}
          className={cn(
            "absolute inset-x-0 top-full origin-top overflow-hidden transition-all duration-300",
            mega ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
          )}
        >
          <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-8">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-champagne">Collections</p>
                <ul className="space-y-2">
                  {collections.map((c) => (
                    <li key={c}>
                      <Link to="/shop" className="text-sm text-silver transition-colors hover:text-ivory">{c}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-champagne">Fragrance Families</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {families.slice(0, 6).map((f) => (
                    <li key={f}>
                      <Link to="/shop" className="text-sm text-silver transition-colors hover:text-ivory">{f}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/fragrance-finder" className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-deep to-noir p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Discover</p>
                <p className="mt-2 font-serif text-2xl">Find your signature scent</p>
                <p className="mt-2 text-xs text-silver">Take our fragrance finder quiz →</p>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-[120] lg:hidden", mobileOpen ? "" : "pointer-events-none")}>
        <div
          className={cn("absolute inset-0 bg-noir/70 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "glass absolute right-0 top-0 h-full w-80 max-w-[85vw] p-7 transition-transform duration-400",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl gold-text">MAISON LUMIÈRE</span>
            <button onClick={() => setMobileOpen(false)} className="text-silver">✕</button>
          </div>
          <nav className="mt-10 flex flex-col gap-5">
            {navLinks.map((l) => (
              <Link key={l.label} to={l.to} className="font-serif text-2xl transition-colors hover:text-champagne">
                {l.label}
              </Link>
            ))}
            <Link to="/fragrance-finder" className="font-serif text-2xl text-champagne">Fragrance Finder</Link>
            <Link to="/dashboard" className="font-serif text-2xl">My Account</Link>
            <Link to="/login" className="font-serif text-2xl">Sign In</Link>
          </nav>
          <button onClick={toggleTheme} className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-silver">
            <Icon name={theme === "dark" ? "sun" : "moon"} /> {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne px-1 text-[9px] font-bold text-noir">
      {n}
    </span>
  );
}

function Icon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  switch (name) {
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>;
    case "heart":
      return <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>;
    case "bag":
      return <svg {...common}><path d="M6 8h12l-1 13H7L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "sun":
      return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>;
    case "moon":
      return <svg {...common}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;
    default:
      return null;
  }
}
