import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { getProduct, products } from "../data/products";
import { GoldButton, OutlineButton } from "../components/ui";
import { ProductCard } from "../components/ProductCard";

const samples = ["Noir Absolu", "Or Impérial", "Émeraude Sauvage", "Rose de Minuit"];

export function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal, addToCart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const [gift, setGift] = useState(false);
  const [chosenSamples, setChosenSamples] = useState<string[]>([]);

  const discount = applied ? cartTotal * 0.1 : 0;
  const giftFee = gift ? 15 : 0;
  const shipping = cartTotal > 150 ? 0 : 12;
  const total = cartTotal - discount + giftFee + shipping;

  const toggleSample = (s: string) =>
    setChosenSamples((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < 2 ? [...prev, s] : prev
    );

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 pt-24 text-center">
        <span className="text-6xl">🛍</span>
        <h1 className="font-serif text-4xl font-light">Your cart is empty</h1>
        <p className="max-w-md text-silver">Discover our collection of rare fragrances and begin your olfactory journey.</p>
        <Link to="/shop"><GoldButton>Explore the Boutique</GoldButton></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-28">
      <h1 className="font-serif text-5xl font-light">Shopping <span className="italic gold-text">Cart</span></h1>
      <p className="mt-2 text-sm text-silver">{cart.length} item{cart.length > 1 ? "s" : ""} in your selection</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* ITEMS */}
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => {
            const p = getProduct(item.id);
            if (!p) return null;
            return (
              <div key={`${item.id}-${item.size}`} className="glass flex gap-4 rounded-2xl p-4 transition-all">
                <Link to={`/product/${p.id}`} className="h-32 w-28 flex-shrink-0 overflow-hidden rounded-xl">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-champagne">{p.collection}</p>
                      <Link to={`/product/${p.id}`}><h3 className="font-serif text-2xl">{p.name}</h3></Link>
                      <p className="text-xs text-silver">{item.size}ml · {p.concentration}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-silver transition-colors hover:text-burgundy">✕</button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-white/15">
                      <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} className="px-3 py-1.5">−</button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} className="px-3 py-1.5">+</button>
                    </div>
                    <p className="font-serif text-xl text-champagne">${item.price * item.qty}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Complimentary samples */}
          <div className="glass rounded-2xl p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Complimentary · Choose 2</p>
            <h3 className="mt-1 font-serif text-2xl">Add free samples</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {samples.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSample(s)}
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                    chosenSamples.includes(s) ? "border-champagne bg-champagne/15 text-champagne" : "border-white/15 text-silver hover:border-champagne/50"
                  }`}
                >
                  {chosenSamples.includes(s) ? "✓ " : ""}{s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-1">
          <div className="glass sticky top-28 rounded-2xl p-7">
            <h3 className="font-serif text-2xl">Order Summary</h3>

            <div className="mt-5 flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Promo code (try LUMIERE)"
                className="flex-1 rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-xs outline-none focus:border-champagne"
              />
              <button
                onClick={() => setApplied(coupon.toUpperCase() === "LUMIERE")}
                className="rounded-full bg-white/10 px-4 text-xs uppercase tracking-wider transition-colors hover:bg-white/20"
              >
                Apply
              </button>
            </div>
            {applied && <p className="mt-2 text-xs text-emerald">✓ 10% discount applied</p>}

            <label className="mt-5 flex cursor-pointer items-center justify-between rounded-xl border border-white/10 p-3">
              <span className="text-sm">🎁 Luxury gift wrapping</span>
              <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="accent-[#cda869]" />
            </label>

            <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm">
              <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
              {discount > 0 && <Row label="Discount" value={`−$${discount.toFixed(2)}`} accent />}
              {gift && <Row label="Gift wrapping" value="$15.00" />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping}`} />
              <div className="flex justify-between border-t border-white/10 pt-3 font-serif text-2xl">
                <span>Total</span>
                <span className="text-champagne">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="mt-6 block">
              <GoldButton className="w-full">Proceed to Checkout</GoldButton>
            </Link>
            <Link to="/shop" className="mt-3 block">
              <OutlineButton className="w-full">Continue Shopping</OutlineButton>
            </Link>

            <div className="mt-5 flex flex-wrap justify-center gap-3 text-[9px] uppercase tracking-wider text-silver">
              <span>🔒 Secure SSL</span><span>✦ 30-day returns</span><span>✦ Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* add-ons */}
      <section className="mt-16">
        <h2 className="mb-8 font-serif text-3xl font-light">Complete Your <span className="italic gold-text">Ritual</span></h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(4, 8).map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
              <button
                onClick={() => addToCart(p.id, p.sizes[0].ml, p.sizes[0].price)}
                className="mt-2 w-full rounded-full border border-white/15 py-2 text-[10px] uppercase tracking-[0.2em] text-silver transition-colors hover:border-champagne hover:text-champagne"
              >
                + Add to cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-silver">{label}</span>
      <span className={accent ? "text-emerald" : "text-ivory"}>{value}</span>
    </div>
  );
}
