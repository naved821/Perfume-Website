import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { getProduct } from "../data/products";
import { GoldButton, OutlineButton } from "../components/ui";
import { cn } from "../utils/cn";

const steps = ["Shipping", "Delivery", "Payment", "Review"];

function Field({ label, type = "text", full = false, value, onChange }: { label: string; type?: string; full?: boolean; value?: string; onChange?: (v: string) => void }) {
  return (
    <div className={cn("relative", full && "sm:col-span-2")}>
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="peer w-full rounded-xl border border-white/15 bg-transparent px-4 pb-2.5 pt-5 text-sm outline-none transition-colors focus:border-champagne"
      />
      <label className="pointer-events-none absolute left-4 top-3.5 text-sm text-silver transition-all peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </label>
    </div>
  );
}

export function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState("express");
  const [payment, setPayment] = useState("card");
  const [done, setDone] = useState(false);

  const shipping = delivery === "express" ? (cartTotal > 150 ? 0 : 18) : 0;
  const total = cartTotal + shipping;

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 pt-24 text-center">
        <div className="flex h-24 w-24 animate-[rise_0.8s_ease] items-center justify-center rounded-full bg-gradient-to-br from-champagne to-emerald text-4xl text-noir">✓</div>
        <h1 className="font-serif text-5xl font-light">Order <span className="italic gold-text">Confirmed</span></h1>
        <p className="max-w-md text-silver">
          Thank you for your purchase. Your fragrances are being hand-wrapped in our atelier. A confirmation has been sent to your email.
        </p>
        <div className="glass rounded-2xl p-6 text-sm">
          <p className="text-silver">Order <span className="text-champagne">#ML-{Math.floor(Math.random() * 90000 + 10000)}</span></p>
          <p className="mt-2 text-silver">Estimated delivery: <span className="text-ivory">2–4 business days</span></p>
        </div>
        <Link to="/shop"><GoldButton>Continue Shopping</GoldButton></Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 pt-24">
        <p className="font-serif text-3xl">Your cart is empty</p>
        <Link to="/shop"><GoldButton>Explore the Boutique</GoldButton></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-28">
      <h1 className="text-center font-serif text-5xl font-light">Secure <span className="italic gold-text">Checkout</span></h1>

      {/* progress */}
      <div className="mx-auto mt-10 flex max-w-2xl items-center justify-between">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors", i <= step ? "border-champagne bg-champagne text-noir" : "border-white/20 text-silver")}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={cn("mt-2 text-[10px] uppercase tracking-wider", i <= step ? "text-champagne" : "text-silver")}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={cn("mx-2 h-px flex-1", i < step ? "bg-champagne" : "bg-white/15")} />}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="glass rounded-2xl p-7">
              <h2 className="font-serif text-2xl">Shipping Address</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="First Name" />
                <Field label="Last Name" />
                <Field label="Email Address" type="email" full />
                <Field label="Phone Number" type="tel" full />
                <Field label="Street Address" full />
                <Field label="City" />
                <Field label="Postal Code" />
                <Field label="Country" full />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="glass rounded-2xl p-7">
              <h2 className="font-serif text-2xl">Delivery Method</h2>
              <div className="mt-6 space-y-3">
                {[
                  { id: "express", name: "Express Delivery", desc: "2–4 business days · Hand-wrapped", price: cartTotal > 150 ? "Free" : "$18" },
                  { id: "standard", name: "Standard Delivery", desc: "5–7 business days", price: "Free" },
                  { id: "boutique", name: "Boutique Pickup", desc: "Collect from your nearest Maison", price: "Free" },
                ].map((d) => (
                  <label key={d.id} className={cn("flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors", delivery === d.id ? "border-champagne bg-champagne/5" : "border-white/15")}>
                    <input type="radio" checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="accent-[#cda869]" />
                    <div className="flex-1">
                      <p className="text-sm">{d.name}</p>
                      <p className="text-xs text-silver">{d.desc}</p>
                    </div>
                    <span className="text-champagne">{d.price}</span>
                  </label>
                ))}
              </div>
              <h2 className="mt-8 font-serif text-2xl">Gift Wrapping</h2>
              <label className="mt-4 flex cursor-pointer items-center justify-between rounded-xl border border-white/15 p-4">
                <span className="text-sm">🎁 Signature lacquered box with hand-tied ribbon (+$15)</span>
                <input type="checkbox" className="accent-[#cda869]" />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="glass rounded-2xl p-7">
              <h2 className="font-serif text-2xl">Payment</h2>
              <div className="mt-6 flex gap-3">
                {[
                  { id: "card", label: "Card" },
                  { id: "paypal", label: "PayPal" },
                  { id: "apple", label: "Apple Pay" },
                ].map((m) => (
                  <button key={m.id} onClick={() => setPayment(m.id)} className={cn("flex-1 rounded-xl border py-3 text-sm transition-colors", payment === m.id ? "border-champagne bg-champagne/10 text-champagne" : "border-white/15 text-silver")}>
                    {m.label}
                  </button>
                ))}
              </div>
              {payment === "card" && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label="Card Number" full />
                  <Field label="Name on Card" full />
                  <Field label="Expiry (MM/YY)" />
                  <Field label="CVV" />
                </div>
              )}
              {payment !== "card" && <p className="mt-6 text-sm text-silver">You'll be redirected to complete payment securely.</p>}
              <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-wider text-silver">
                🔒 Encrypted & secure · We never store your card details
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="glass rounded-2xl p-7">
              <h2 className="font-serif text-2xl">Review Your Order</h2>
              <div className="mt-5 space-y-4">
                {cart.map((item) => {
                  const p = getProduct(item.id);
                  if (!p) return null;
                  return (
                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="h-16 w-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-serif text-lg">{p.name}</p>
                        <p className="text-xs text-silver">{item.size}ml × {item.qty}</p>
                      </div>
                      <span className="text-champagne">${item.price * item.qty}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-sm text-silver">✦ 2 complimentary samples included with your order.</p>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 0 ? (
              <OutlineButton onClick={() => setStep((s) => s - 1)}>← Back</OutlineButton>
            ) : (
              <Link to="/cart"><OutlineButton>← Back to Cart</OutlineButton></Link>
            )}
            {step < 3 ? (
              <GoldButton onClick={() => setStep((s) => s + 1)}>Continue →</GoldButton>
            ) : (
              <GoldButton onClick={() => { clearCart(); setDone(true); }}>Place Order</GoldButton>
            )}
          </div>
        </div>

        {/* summary */}
        <div>
          <div className="glass sticky top-28 rounded-2xl p-7">
            <h3 className="font-serif text-2xl">Summary</h3>
            <div className="mt-5 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-silver">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-silver">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-3 font-serif text-2xl"><span>Total</span><span className="text-champagne">${total.toFixed(2)}</span></div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-[9px] uppercase tracking-wider text-silver">
              <span className="rounded border border-white/15 px-2 py-1">VISA</span>
              <span className="rounded border border-white/15 px-2 py-1">MASTERCARD</span>
              <span className="rounded border border-white/15 px-2 py-1">AMEX</span>
              <span className="rounded border border-white/15 px-2 py-1">PAYPAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
