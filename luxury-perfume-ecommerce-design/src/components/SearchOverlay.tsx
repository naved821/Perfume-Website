import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const trending = ["Noir Absolu", "Oud", "Rose", "Summer citrus", "Or Impérial"];

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setQ("");
  }, [open]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const t = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.family.toLowerCase().includes(t) ||
        p.collection.toLowerCase().includes(t) ||
        [...p.notes.top, ...p.notes.heart, ...p.notes.base].some((n) =>
          n.toLowerCase().includes(t)
        )
    );
  }, [q]);

  const voiceSearch = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) {
      setQ("oud");
      return;
    }
    const rec = new SR();
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e: any) => setQ(e.results[0][0].transcript);
    rec.start();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110]">
      <div className="absolute inset-0 bg-noir/85 backdrop-blur-xl" onClick={onClose} />
      <div className="relative mx-auto mt-24 w-full max-w-3xl px-5">
        <div className="glass rounded-2xl p-2">
          <div className="flex items-center gap-3 px-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cda869" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search fragrances, notes, collections..."
              className="w-full bg-transparent py-4 text-lg text-ivory outline-none placeholder:text-silver/60"
            />
            <button
              onClick={voiceSearch}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                listening ? "bg-burgundy text-ivory" : "text-champagne hover:bg-white/5"
              }`}
              aria-label="Voice search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </button>
            <button onClick={onClose} className="px-2 text-silver hover:text-ivory">✕</button>
          </div>
        </div>

        <div className="glass mt-3 max-h-[55vh] overflow-y-auto rounded-2xl p-5">
          {!q.trim() ? (
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Trending Searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {trending.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-silver transition-colors hover:border-champagne hover:text-champagne"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <Link
                to="/fragrance-finder"
                onClick={onClose}
                className="mt-6 flex items-center justify-between rounded-xl border border-champagne/30 bg-champagne/5 px-4 py-3 text-sm text-champagne transition-colors hover:bg-champagne/10"
              >
                <span>✨ Not sure? Take the Fragrance Finder Quiz</span>
                <span>→</span>
              </Link>
            </div>
          ) : results.length ? (
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">
                {results.length} results
              </p>
              {results.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                >
                  <img src={p.image} alt={p.name} className="h-16 w-14 rounded-lg object-cover" />
                  <div>
                    <p className="font-serif text-lg">{p.name}</p>
                    <p className="text-xs text-silver">{p.family} · {p.collection}</p>
                  </div>
                  <span className="ml-auto font-serif text-champagne">${p.price}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-silver">
              No fragrances match “{q}”. Try a scent note like “rose” or “oud”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
