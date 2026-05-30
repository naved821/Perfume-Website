import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0, ry = 0, x = 0, y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, input, label, select, textarea, [role=button]");
      if (ring.current) ring.current.style.opacity = interactive ? "1" : "0.5";
      if (ring.current) ring.current.style.width = ring.current.style.height = interactive ? "52px" : "32px";
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    loop();
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] hidden lg:block">
      <div ref={dot} className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne" />
      <div ref={ring} className="absolute h-8 w-8 rounded-full border border-champagne/60 transition-[width,height,opacity] duration-200" style={{ left: 0, top: 0 }} />
    </div>
  );
}
