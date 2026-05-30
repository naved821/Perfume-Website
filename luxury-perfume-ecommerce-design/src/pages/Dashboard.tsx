import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { getProduct, products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const tabs = ["Overview", "Orders", "Wishlist", "Addresses", "Scent Profile", "Rewards", "Settings"];

const orders = [
  { id: "ML-48201", date: "Mar 8, 2026", status: "Delivered", total: 730, items: 2 },
  { id: "ML-47655", date: "Feb 21, 2026", status: "In Transit", total: 320, items: 1 },
  { id: "ML-46990", date: "Jan 30, 2026", status: "Delivered", total: 455, items: 2 },
];

export function Dashboard() {
  const [tab, setTab] = useState("Overview");
  const { wishlist, recentlyViewed } = useStore();
  const wished = wishlist.map(getProduct).filter(Boolean);
  const recent = recentlyViewed.map(getProduct).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-emerald font-serif text-3xl text-noir">A</div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Le Cercle · Gold Member</p>
          <h1 className="font-serif text-4xl font-light">Bonjour, Aria</h1>
          <p className="text-sm text-silver">aria@maisonlumiere.com</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-4">
        {/* sidebar tabs */}
        <aside className="lg:col-span-1">
          <div className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm transition-colors ${tab === t ? "bg-champagne/15 text-champagne" : "text-silver hover:bg-white/5"}`}
              >
                {t}
              </button>
            ))}
            <Link to="/login" className="whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm text-burgundy">Sign Out</Link>
          </div>
        </aside>

        {/* content */}
        <div className="lg:col-span-3">
          {tab === "Overview" && (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { k: "Total Orders", v: "12" },
                  { k: "Reward Points", v: "2,480" },
                  { k: "Wishlist", v: String(wishlist.length) },
                ].map((s) => (
                  <div key={s.k} className="glass rounded-2xl p-6">
                    <p className="font-serif text-4xl gold-text">{s.v}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-silver">{s.k}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-serif text-2xl">Recent Activity</h3>
                {orders.slice(0, 2).map((o) => (
                  <div key={o.id} className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                    <div><p className="text-champagne">{o.id}</p><p className="text-xs text-silver">{o.date}</p></div>
                    <span className="text-silver">{o.status}</span>
                    <span className="font-serif text-lg">${o.total}</span>
                  </div>
                ))}
              </div>
              {recent.length > 0 && (
                <div>
                  <h3 className="mb-5 font-serif text-2xl">Recently Viewed</h3>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {recent.slice(0, 3).map((p) => p && <ProductCard key={p.id} product={p} />)}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "Orders" && (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6">
                  <div>
                    <p className="font-serif text-xl text-champagne">{o.id}</p>
                    <p className="text-xs text-silver">{o.date} · {o.items} item(s)</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ${o.status === "Delivered" ? "bg-emerald/20 text-emerald" : "bg-champagne/20 text-champagne"}`}>{o.status}</span>
                  <p className="font-serif text-2xl">${o.total}</p>
                  <button className="text-xs uppercase tracking-wider text-silver hover:text-champagne">View Details</button>
                </div>
              ))}
            </div>
          )}

          {tab === "Wishlist" && (
            wished.length ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {wished.map((p) => p && <ProductCard key={p.id} product={p} />)}
              </div>
            ) : <Empty text="Your wishlist is empty." />
          )}

          {tab === "Addresses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Home", addr: "16 Rue Saint-Honoré, 75001 Paris, France", default: true },
                { label: "Office", addr: "42 Avenue Montaigne, 75008 Paris, France" },
              ].map((a) => (
                <div key={a.label} className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <p className="font-serif text-xl">{a.label}</p>
                    {a.default && <span className="rounded-full bg-champagne/20 px-2 py-0.5 text-[10px] text-champagne">Default</span>}
                  </div>
                  <p className="mt-2 text-sm text-silver">{a.addr}</p>
                  <div className="mt-4 flex gap-4 text-xs text-champagne">
                    <button className="hover:underline">Edit</button>
                    <button className="text-burgundy hover:underline">Remove</button>
                  </div>
                </div>
              ))}
              <button className="glass flex min-h-32 items-center justify-center rounded-2xl border-dashed text-sm text-silver hover:text-champagne">+ Add new address</button>
            </div>
          )}

          {tab === "Scent Profile" && (
            <div className="glass rounded-2xl p-7">
              <h3 className="font-serif text-2xl">Your Olfactory DNA</h3>
              <p className="mt-2 text-sm text-silver">Based on your purchases and ratings.</p>
              <div className="mt-6 space-y-4">
                {[["Oriental Woody", 85], ["Amber", 70], ["Floral", 55], ["Citrus", 30]].map(([k, v]) => (
                  <div key={k as string}>
                    <div className="flex justify-between text-xs text-silver"><span>{k}</span><span>{v}%</span></div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald to-champagne" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/fragrance-finder" className="mt-6 inline-block text-sm text-champagne hover:underline">Retake the fragrance finder →</Link>
            </div>
          )}

          {tab === "Rewards" && (
            <div className="space-y-6">
              <div className="glass rounded-3xl bg-gradient-to-br from-emerald-deep/50 to-noir p-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Le Cercle Rewards</p>
                <p className="mt-3 font-serif text-6xl gold-text">2,480</p>
                <p className="text-xs uppercase tracking-[0.2em] text-silver">Points · Gold Tier</p>
                <div className="mx-auto mt-5 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-champagne to-emerald" />
                </div>
                <p className="mt-2 text-xs text-silver">520 points to Platinum</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[["Free 10ml travel spray", "500 pts"], ["Exclusive sample set", "1,200 pts"], ["Atelier masterclass", "3,000 pts"]].map(([r, p]) => (
                  <div key={r} className="glass rounded-2xl p-5">
                    <p className="text-sm">{r}</p>
                    <p className="mt-2 text-champagne">{p}</p>
                    <button className="mt-3 w-full rounded-full border border-champagne/40 py-2 text-xs uppercase tracking-wider hover:bg-champagne/10">Redeem</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "Settings" && (
            <div className="space-y-6">
              <div className="glass rounded-2xl p-7">
                <h3 className="font-serif text-2xl">Notifications</h3>
                {["New arrivals & exclusives", "Order updates", "Restock alerts", "Le Cercle offers"].map((s, i) => (
                  <label key={s} className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                    {s}
                    <input type="checkbox" defaultChecked={i < 3} className="accent-[#cda869]" />
                  </label>
                ))}
              </div>
              <div className="glass rounded-2xl p-7">
                <h3 className="font-serif text-2xl">Subscriptions</h3>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <div><p>Monthly Discovery Box</p><p className="text-xs text-silver">Next delivery: Apr 1, 2026</p></div>
                  <span className="rounded-full bg-emerald/20 px-3 py-1 text-xs text-emerald">Active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {products.length === 0 && null}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="glass rounded-2xl py-16 text-center">
      <p className="text-silver">{text}</p>
      <Link to="/shop" className="mt-3 inline-block text-sm text-champagne hover:underline">Explore the boutique →</Link>
    </div>
  );
}
