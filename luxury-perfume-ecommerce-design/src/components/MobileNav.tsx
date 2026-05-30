import { Link, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { cn } from "../utils/cn";

const items = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/shop", label: "Shop", icon: "grid" },
  { to: "/wishlist", label: "Saved", icon: "heart" },
  { to: "/cart", label: "Cart", icon: "bag" },
  { to: "/dashboard", label: "Account", icon: "user" },
];

export function MobileNav() {
  const loc = useLocation();
  const { cartCount, wishlist } = useStore();
  return (
    <nav className="glass fixed inset-x-0 bottom-0 z-[80] flex items-center justify-around border-t border-white/10 px-2 py-2 lg:hidden">
      {items.map((it) => {
        const active = loc.pathname === it.to;
        const count = it.to === "/cart" ? cartCount : it.to === "/wishlist" ? wishlist.length : 0;
        return (
          <Link
            key={it.to}
            to={it.to}
            className={cn(
              "relative flex flex-col items-center gap-1 px-3 py-1 text-[9px] uppercase tracking-wider transition-colors",
              active ? "text-champagne" : "text-silver"
            )}
          >
            <Icon name={it.icon} active={active} />
            {count > 0 && (
              <span className="absolute right-1 top-0 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-champagne px-1 text-[8px] font-bold text-noir">
                {count}
              </span>
            )}
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Icon({ name }: { name: string; active: boolean }) {
  const c = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
  switch (name) {
    case "home": return <svg {...c}><path d="M3 11l9-8 9 8M5 10v10h14V10" /></svg>;
    case "grid": return <svg {...c}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
    case "heart": return <svg {...c}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>;
    case "bag": return <svg {...c}><path d="M6 8h12l-1 13H7L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
    case "user": return <svg {...c}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
    default: return null;
  }
}
