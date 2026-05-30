import { Reveal, Particles, SectionHeading, GoldButton } from "../components/ui";
import { Link } from "react-router-dom";

const timeline = [
  { year: "1908", title: "The Founding", text: "Master perfumer Henri Lumière opens his first atelier in the heart of Paris." },
  { year: "1932", title: "Grasse Gardens", text: "The Maison establishes its own jasmine and rose fields in Grasse, France." },
  { year: "1967", title: "Noir Absolu", text: "Our most legendary fragrance is born, redefining modern Oriental perfumery." },
  { year: "1995", title: "Going Global", text: "Flagship boutiques open in Milano, New York, and Tokyo." },
  { year: "2018", title: "Sustainable Vow", text: "Maison Lumière commits to 100% ethically sourced ingredients." },
  { year: "2026", title: "The New Era", text: "AI-assisted personalization meets century-old craftsmanship." },
];

const pillars = [
  { icon: "🌿", title: "Ethical Sourcing", text: "Every essence is traced to its origin, harvested in partnership with local communities." },
  { icon: "⚗️", title: "Master Craft", text: "Each fragrance is aged and hand-finished by our perfumers over months, never rushed." },
  { icon: "♻️", title: "Sustainability", text: "Refillable crystal flacons and carbon-neutral shipping across the globe." },
];

export function About() {
  return (
    <div className="pt-20">
      {/* hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <img src="/images/atelier.jpg" alt="Our atelier" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/60 via-noir/40 to-noir" />
        <Particles count={18} />
        <div className="relative z-10 px-5 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-champagne">Our Heritage</p>
            <h1 className="mt-5 font-serif text-6xl font-light leading-tight md:text-8xl">A Century of <span className="italic gold-text">Scent</span></h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-silver">
              From a single Parisian atelier to a global house of haute parfumerie — the story of Maison Lumière is written in essence and emotion.
            </p>
          </Reveal>
        </div>
      </section>

      {/* founder quote */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <Reveal>
          <p className="font-serif text-3xl font-light italic leading-relaxed md:text-4xl">
            “A perfume is not a product. It is a memory you have not yet made — an invisible signature that lingers long after you've left the room.”
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-champagne">Henri Lumière · Founder</p>
        </Reveal>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-4xl px-5 py-12">
        <Reveal><SectionHeading overline="Our Journey" title={<>The <span className="italic gold-text">Timeline</span></>} /></Reveal>
        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-champagne via-emerald to-transparent md:left-1/2" />
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 80}>
              <div className={`relative mb-12 flex items-start gap-6 md:w-1/2 ${i % 2 ? "md:ml-auto md:flex-row" : "md:flex-row-reverse md:text-right"}`}>
                <div className="absolute left-4 mt-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-champagne md:left-0 md:translate-x-0" style={{ [i % 2 ? "left" : "right"]: "-6px" } as any} />
                <div className="ml-10 md:ml-0">
                  <p className="font-serif text-4xl gold-text">{t.year}</p>
                  <p className="mt-1 font-serif text-2xl">{t.title}</p>
                  <p className="mt-2 text-sm text-silver">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* split: craftsmanship */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-3xl">
            <img src="/images/campaign.jpg" alt="Craftsmanship" className="aspect-[4/5] w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-champagne">The Process</p>
            <h2 className="mt-4 font-serif text-4xl font-light md:text-5xl">From flower<br />to <span className="italic gold-text">flacon</span></h2>
            <div className="mt-8 space-y-6">
              {[
                ["01 · Harvest", "Petals gathered at dawn when their oils are most concentrated."],
                ["02 · Extraction", "Rare absolutes drawn through traditional enfleurage and distillation."],
                ["03 · Composition", "Our perfumers blend hundreds of materials into a single accord."],
                ["04 · Maturation", "Each batch ages for months, allowing the notes to marry perfectly."],
              ].map(([k, v]) => (
                <div key={k} className="border-l border-champagne/40 pl-5">
                  <p className="text-sm font-medium text-champagne">{k}</p>
                  <p className="mt-1 text-sm text-silver">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal><SectionHeading overline="Our Values" title={<>The Maison <span className="italic gold-text">Promise</span></>} /></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="glass h-full rounded-2xl p-8 text-center">
                <span className="text-4xl">{p.icon}</span>
                <h3 className="mt-4 font-serif text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl font-light">Experience the <span className="italic gold-text">Maison</span></h2>
          <p className="mt-4 text-silver">Book a private consultation at one of our boutiques.</p>
          <Link to="/contact" className="mt-7 inline-block"><GoldButton>Book an Appointment</GoldButton></Link>
        </Reveal>
      </section>
    </div>
  );
}
