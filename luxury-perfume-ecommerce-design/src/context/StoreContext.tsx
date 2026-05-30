import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "../data/products";

export interface CartItem {
  id: string;
  size: number;
  qty: number;
  price: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  theme: "dark" | "light";
  toast: string | null;
  addToCart: (id: string, size: number, price: number, qty?: number) => void;
  removeFromCart: (id: string, size: number) => void;
  updateQty: (id: string, size: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  toggleTheme: () => void;
  cartCount: number;
  cartTotal: number;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("aw_cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("aw_wish", []));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() =>
    load("aw_recent", [])
  );
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    load("aw_theme", "dark")
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => localStorage.setItem("aw_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("aw_wish", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("aw_recent", JSON.stringify(recentlyViewed)), [recentlyViewed]);
  useEffect(() => {
    localStorage.setItem("aw_theme", JSON.stringify(theme));
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  const addToCart = (id: string, size: number, price: number, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === id && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id, size, qty, price }];
    });
    const p = products.find((x) => x.id === id);
    showToast(`${p?.name ?? "Item"} added to your cart`);
  };

  const removeFromCart = (id: string, size: number) =>
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));

  const updateQty = (id: string, size: number, qty: number) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i
      )
    );

  const clearCart = () => setCart([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      const p = products.find((x) => x.id === id);
      showToast(has ? `Removed from wishlist` : `${p?.name ?? "Item"} saved to wishlist`);
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const addRecentlyViewed = (id: string) =>
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        theme,
        toast,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        addRecentlyViewed,
        toggleTheme,
        cartCount,
        cartTotal,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export type { Product };
