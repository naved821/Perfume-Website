import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------- Scroll reveal ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}

/* ---------- Floating gold particles ---------- */
export function Particles({ count = 18 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const size = 2 + Math.random() * 4;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-champagne/60"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              bottom: "-10px",
              filter: "blur(0.5px)",
              boxShadow: "0 0 6px rgba(205,168,105,0.8)",
              animation: `particleFloat ${12 + Math.random() * 16}s linear ${
                Math.random() * 10
              }s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  overline,
  title,
  subtitle,
  center = true,
}: {
  overline?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {overline && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-champagne">
          {overline}
        </p>
      )}
      <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm leading-relaxed text-silver">{subtitle}</p>
      )}
    </div>
  );
}

/* ---------- Magnetic button ---------- */
export function GoldButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "magnetic group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-champagne to-champagne-light px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-noir transition-shadow hover:shadow-[0_0_40px_-6px_rgba(205,168,105,0.7)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
    </button>
  );
}

export function OutlineButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-champagne/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-ivory transition-all hover:border-champagne hover:bg-champagne/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------- Star rating ---------- */
export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={i <= Math.round(rating) ? "text-champagne" : "text-silver/30"}
          fill="currentColor"
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.3 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </div>
  );
}

/* ---------- Note pyramid bar ---------- */
export function MeterBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-silver">
        <span>{label}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald to-champagne"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}
