import { useStore } from "../context/StoreContext";

export function Toast() {
  const { toast } = useStore();
  return (
    <div
      className={`fixed left-1/2 top-24 z-[200] -translate-x-1/2 transition-all duration-300 ${
        toast ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      {toast && (
        <div className="glass flex items-center gap-3 rounded-full px-6 py-3.5 shadow-2xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-champagne text-xs text-noir">✓</span>
          <span className="text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
}
