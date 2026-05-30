import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoldButton } from "../components/ui";
import { Particles } from "../components/ui";

const families = ["Floral", "Woody", "Oriental", "Citrus", "Gourmand", "Aromatic", "Chypre", "Amber"];

export function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPw, setShowPw] = useState(false);
  const [stage, setStage] = useState<"form" | "otp" | "prefs">("form");
  const [prefs, setPrefs] = useState<string[]>([]);
  const navigate = useNavigate();

  const togglePref = (f: string) =>
    setPrefs((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <img src="/images/campaign.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/20" />
        <Particles count={16} />
        <div className="absolute inset-0 flex flex-col justify-end p-14">
          <Link to="/" className="absolute left-14 top-14 font-serif text-2xl tracking-[0.2em] gold-text">MAISON LUMIÈRE</Link>
          <h2 className="font-serif text-5xl font-light leading-tight">Your scent <span className="italic gold-text">awaits</span></h2>
          <p className="mt-4 max-w-md text-silver">Join our private circle for early access to exclusive editions, personalized recommendations, and atelier experiences.</p>
        </div>
      </div>

      {/* form side */}
      <div className="relative flex items-center justify-center px-5 py-24">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 block text-center font-serif text-xl tracking-[0.2em] gold-text lg:hidden">MAISON LUMIÈRE</Link>

          {stage === "form" && (
            <>
              <div className="mb-8 flex rounded-full border border-white/15 p-1">
                {(["signin", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 rounded-full py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${mode === m ? "bg-champagne text-noir" : "text-silver"}`}
                  >
                    {m === "signin" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              <h1 className="font-serif text-4xl font-light">{mode === "signin" ? "Welcome back" : "Create account"}</h1>
              <p className="mt-2 text-sm text-silver">{mode === "signin" ? "Enter the maison once more." : "Begin your olfactory journey."}</p>

              <form
                onSubmit={(e) => { e.preventDefault(); mode === "signup" ? setStage("otp") : navigate("/dashboard"); }}
                className="mt-7 space-y-4"
              >
                {mode === "signup" && <Input label="Full Name" />}
                <Input label="Email Address" type="email" />
                <div className="relative">
                  <Input label="Password" type={showPw ? "text" : "password"} />
                  <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-4 top-4 text-xs text-silver hover:text-champagne">
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
                {mode === "signin" && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-champagne hover:underline">Forgot password?</button>
                  </div>
                )}
                <GoldButton type="submit" className="w-full">{mode === "signin" ? "Sign In" : "Continue"}</GoldButton>
              </form>

              <div className="my-6 flex items-center gap-4 text-xs text-silver">
                <span className="h-px flex-1 bg-white/10" /> or continue with <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Google", "Apple", "Facebook"].map((s) => (
                  <button key={s} className="rounded-xl border border-white/15 py-3 text-xs text-silver transition-colors hover:border-champagne hover:text-champagne">{s}</button>
                ))}
              </div>
            </>
          )}

          {stage === "otp" && (
            <div className="text-center">
              <h1 className="font-serif text-4xl font-light">Verify your email</h1>
              <p className="mt-3 text-sm text-silver">We've sent a 6-digit code to your inbox.</p>
              <div className="mt-8 flex justify-center gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input key={i} maxLength={1} className="h-14 w-12 rounded-xl border border-white/15 bg-transparent text-center text-2xl outline-none focus:border-champagne" />
                ))}
              </div>
              <GoldButton onClick={() => setStage("prefs")} className="mt-8 w-full">Verify</GoldButton>
              <button className="mt-4 text-xs text-silver hover:text-champagne">Resend code</button>
            </div>
          )}

          {stage === "prefs" && (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-champagne">Personalize</p>
              <h1 className="mt-2 font-serif text-4xl font-light">Your scent profile</h1>
              <p className="mt-2 text-sm text-silver">Select the fragrance families you love so we can curate for you.</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {families.map((f) => (
                  <button
                    key={f}
                    onClick={() => togglePref(f)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${prefs.includes(f) ? "border-champagne bg-champagne/15 text-champagne" : "border-white/15 text-silver hover:border-champagne/50"}`}
                  >
                    {prefs.includes(f) ? "✓ " : ""}{f}
                  </button>
                ))}
              </div>
              <GoldButton onClick={() => navigate("/dashboard")} className="mt-8 w-full">Enter the Maison</GoldButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div className="relative">
      <input type={type} placeholder=" " className="peer w-full rounded-xl border border-white/15 bg-transparent px-4 pb-2.5 pt-5 text-sm outline-none transition-colors focus:border-champagne" />
      <label className="pointer-events-none absolute left-4 top-3.5 text-sm text-silver transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]">{label}</label>
    </div>
  );
}
