import { useState } from "react";
import { products, type Product } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { GoldButton, Particles } from "../components/ui";
import { cn } from "../utils/cn";

const questions = [
  {
    q: "What time of day feels most like you?",
    opts: [
      { label: "Golden morning light", tag: "Citrus Aromatic" },
      { label: "Bright midday energy", tag: "Green Aromatic" },
      { label: "Romantic dusk", tag: "Amber Floral" },
      { label: "Mysterious midnight", tag: "Oriental Woody" },
    ],
  },
  {
    q: "Choose a setting that calls to you.",
    opts: [
      { label: "A coastal Mediterranean villa", tag: "Citrus Aromatic" },
      { label: "A rain-soaked forest", tag: "Green Aromatic" },
      { label: "A candlelit Parisian salon", tag: "Amber Oriental" },
      { label: "A velvet-draped opera house", tag: "Gourmand Oriental" },
    ],
  },
  {
    q: "Which sensation do you crave?",
    opts: [
      { label: "Fresh & invigorating", tag: "Citrus Aromatic" },
      { label: "Soft & comforting", tag: "Woody Musk" },
      { label: "Bold & magnetic", tag: "Oriental Woody" },
      { label: "Sweet & seductive", tag: "Gourmand Oriental" },
    ],
  },
  {
    q: "Pick a precious material.",
    opts: [
      { label: "Sun-warmed citrus", tag: "Citrus Aromatic" },
      { label: "Blooming rose", tag: "Floral Chypre" },
      { label: "Smoky oud", tag: "Oriental Woody" },
      { label: "Liquid amber", tag: "Amber Oriental" },
    ],
  },
  {
    q: "How should your scent be remembered?",
    opts: [
      { label: "A whisper, intimate", tag: "Woody Musk" },
      { label: "An elegant trail", tag: "Amber Floral" },
      { label: "An unforgettable statement", tag: "Oriental Woody" },
      { label: "A sweet temptation", tag: "Gourmand Oriental" },
    ],
  },
];

export function FragranceFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Product[] | null>(null);

  const choose = (tag: string) => {
    const next = [...answers, tag];
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // tally
      const counts: Record<string, number> = {};
      next.forEach((t) => (counts[t] = (counts[t] || 0) + 1));
      const matches = products
        .map((p) => ({ p, score: counts[p.family] || 0 }))
        .sort((a, b) => b.score - a.score);
      const top = matches.filter((m) => m.score > 0).map((m) => m.p);
      setResult((top.length ? top : products).slice(0, 3));
    }
  };

  const restart = () => { setStep(0); setAnswers([]); setResult(null); };

  return (
    <div className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/20 via-noir to-noir" />
      <Particles count={20} />
      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-20">
        {!result ? (
          <>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-champagne">Fragrance Finder · AI Perfumer</p>
              <h1 className="mt-3 font-serif text-5xl font-light">Discover your <span className="italic gold-text">signature</span></h1>
            </div>

            {/* progress dots */}
            <div className="mt-10 flex justify-center gap-2">
              {questions.map((_, i) => (
                <span key={i} className={cn("h-1.5 rounded-full transition-all", i === step ? "w-8 bg-champagne" : i < step ? "w-4 bg-champagne/50" : "w-4 bg-white/15")} />
              ))}
            </div>

            <div key={step} className="glass mt-10 animate-[rise_0.5s_ease] rounded-3xl p-8 md:p-12">
              <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Question {step + 1} of {questions.length}</p>
              <h2 className="mt-3 font-serif text-3xl font-light">{questions[step].q}</h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {questions[step].opts.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => choose(o.tag)}
                    className="group rounded-2xl border border-white/15 p-6 text-left transition-all hover:border-champagne hover:bg-champagne/5"
                  >
                    <span className="font-serif text-xl transition-colors group-hover:text-champagne">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-champagne">Your Olfactory Match</p>
            <h1 className="mt-3 font-serif text-5xl font-light">Written in your <span className="italic gold-text">character</span></h1>
            <p className="mx-auto mt-4 max-w-md text-silver">Based on your answers, our AI perfumer has composed your perfect matches.</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {result.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <button onClick={restart} className="mt-10"><GoldButton>Retake the Quiz</GoldButton></button>
          </div>
        )}
      </div>
    </div>
  );
}
