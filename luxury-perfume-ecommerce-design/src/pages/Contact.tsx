import { useState } from "react";
import { Reveal, SectionHeading, GoldButton } from "../components/ui";
import { cn } from "../utils/cn";

const faqs = [
  { q: "How long do your fragrances last?", a: "Our Extrait de Parfum compositions last 8–12 hours, while Eau de Parfum offers 6–8 hours of wear. Longevity varies by skin type and climate." },
  { q: "Do you offer samples?", a: "Yes — every order includes two complimentary samples of your choice, and discovery sets are available in the boutique." },
  { q: "What is your return policy?", a: "We accept returns within 30 days of delivery for unopened items. Opened fragrances may be exchanged for store credit." },
  { q: "Are your products cruelty-free?", a: "Absolutely. Maison Lumière is certified cruelty-free and uses 100% ethically sourced ingredients." },
  { q: "Do you ship internationally?", a: "We ship to over 60 countries with carbon-neutral express delivery. Duties are calculated at checkout." },
];

const boutiques = [
  { city: "Paris", addr: "16 Rue Saint-Honoré, 75001", phone: "+33 1 42 60 00 00" },
  { city: "Milano", addr: "Via Montenapoleone 8, 20121", phone: "+39 02 7600 0000" },
  { city: "New York", addr: "712 Fifth Avenue, NY 10019", phone: "+1 212 555 0100" },
  { city: "Dubai", addr: "The Dubai Mall, Fashion Avenue", phone: "+971 4 555 0100" },
];

export function Contact() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const [chat, setChat] = useState(false);

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <Reveal>
          <SectionHeading overline="Get in touch" title={<>The <span className="italic gold-text">Concierge</span></>} subtitle="Our fragrance experts are here to guide you. Reach out, visit a boutique, or book a private consultation." />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* form */}
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <h2 className="font-serif text-3xl">Send a message</h2>
              {sent ? (
                <div className="mt-8 rounded-2xl bg-emerald/15 p-6 text-center">
                  <p className="text-2xl">✓</p>
                  <p className="mt-2 text-emerald">Thank you. Our concierge will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <CField label="First Name" />
                    <CField label="Last Name" />
                  </div>
                  <CField label="Email Address" type="email" />
                  <CField label="Subject" />
                  <div className="relative">
                    <textarea placeholder=" " rows={4} className="peer w-full resize-none rounded-xl border border-white/15 bg-transparent px-4 pb-2.5 pt-5 text-sm outline-none focus:border-champagne" />
                    <label className="pointer-events-none absolute left-4 top-3.5 text-sm text-silver transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]">Your Message</label>
                  </div>
                  <GoldButton type="submit" className="w-full">Send Message</GoldButton>
                </form>
              )}
            </div>
          </Reveal>

          {/* concierge + appointment */}
          <Reveal delay={120}>
            <div className="space-y-6">
              <div className="glass rounded-3xl p-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Luxury Concierge</p>
                <h3 className="mt-2 font-serif text-2xl">Private consultation</h3>
                <p className="mt-2 text-sm text-silver">Book a one-on-one session with a fragrance expert — in boutique or virtual.</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <CField label="Preferred Date" type="date" />
                  <select className="rounded-xl border border-white/15 bg-transparent px-4 py-3.5 text-sm text-silver outline-none focus:border-champagne [&>option]:bg-onyx">
                    <option>In Boutique</option>
                    <option>Virtual Session</option>
                  </select>
                </div>
                <button onClick={() => setSent(true)} className="mt-4 w-full"><GoldButton className="w-full">Book Appointment</GoldButton></button>
              </div>

              <div className="glass rounded-3xl p-8">
                <h3 className="font-serif text-2xl">Reach us</h3>
                <div className="mt-4 space-y-3 text-sm text-silver">
                  <p>✉ concierge@maisonlumiere.com</p>
                  <p>☎ +33 1 42 60 00 00</p>
                  <p>◷ Mon–Sat · 9am–8pm CET</p>
                </div>
                <div className="mt-5 flex gap-3">
                  {["Instagram", "Pinterest", "TikTok"].map((s) => (
                    <a key={s} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs text-silver transition-colors hover:border-champagne hover:text-champagne">{s[0]}</a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* map */}
        <Reveal>
          <div className="relative mt-14 h-72 overflow-hidden rounded-3xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-deep/40 via-noir to-midnight" />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(205,168,105,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(205,168,105,0.06) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="mx-auto flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-champagne text-noir">📍</div>
              <p className="mt-3 font-serif text-2xl">Flagship · Paris</p>
              <p className="text-sm text-silver">16 Rue Saint-Honoré, 75001</p>
            </div>
          </div>
        </Reveal>

        {/* boutiques */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {boutiques.map((b, i) => (
            <Reveal key={b.city} delay={i * 80}>
              <div className="glass rounded-2xl p-6">
                <p className="font-serif text-2xl">{b.city}</p>
                <p className="mt-2 text-sm text-silver">{b.addr}</p>
                <p className="mt-1 text-sm text-champagne">{b.phone}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <section className="mx-auto mt-20 max-w-3xl">
          <Reveal><SectionHeading overline="Questions" title={<>Frequently <span className="italic gold-text">Asked</span></>} /></Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="glass overflow-hidden rounded-2xl">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left">
                  <span className="font-serif text-lg">{f.q}</span>
                  <span className={cn("text-champagne transition-transform", open === i && "rotate-45")}>+</span>
                </button>
                <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-silver">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* floating chat */}
      <button onClick={() => setChat((c) => !c)} className="fixed bottom-24 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-champagne-light text-2xl text-noir shadow-[0_0_30px_-4px_rgba(205,168,105,0.7)] lg:bottom-8">
        {chat ? "✕" : "💬"}
      </button>
      {chat && (
        <div className="glass fixed bottom-40 right-5 z-[80] w-80 max-w-[85vw] rounded-2xl p-5 lg:bottom-24">
          <p className="font-serif text-xl">Live Concierge</p>
          <p className="mt-1 text-xs text-emerald">● Online now</p>
          <div className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-silver">Bonjour! How may I help you discover your signature scent today?</div>
          <input placeholder="Type a message..." className="mt-3 w-full rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-champagne" />
        </div>
      )}
    </div>
  );
}

function CField({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div className="relative">
      <input type={type} placeholder=" " className="peer w-full rounded-xl border border-white/15 bg-transparent px-4 pb-2.5 pt-5 text-sm outline-none focus:border-champagne" />
      <label className="pointer-events-none absolute left-4 top-3.5 text-sm text-silver transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]">{label}</label>
    </div>
  );
}
