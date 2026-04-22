import { useMemo, useState } from "react";
import CartItemCard from "../components/cart/CartItemCard";
import BottomNavBar from "../components/layout/BottomNavBar";
import TopAppBar from "../components/layout/TopAppBar";

const initialItems = [
  {
    id: "zen-garden-salad",
    title: "Zen Garden Salad",
    subtitle: "Extra Avocado, No Onions",
    price: 14.5,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAo2bm5QB5i3Hp6DPl0e03zstjIf_YyGHbhDtdVTGFLPjB6I-8Yc4OanyKIXvxQXVAQTUykm9pDS9p1_lQEEnJB6nQZIuFYXT8HI880fR8TLH4R2VqJbtLl1fTQ-XRvLk78Ep5BUwELNX6uE6n_qS8RgYDNeqc7KjyB-BDie6OQP7SkXKMW8ZIuVfucHd_kmK6P8ZYiv2Z4I7T1wpfOF2ZmxW1bFVQSaPYVxIidlY94CoT3VIzuuNvVU48bCKMReMM5ezy5soRt0Wey",
  },
  {
    id: "truffle-melt",
    title: "Truffle Melt",
    subtitle: "Sourdough Bread",
    price: 12,
    quantity: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLTHmwvAkjPsFTVCorK9XxzBadXDjrw7pBbOKucCs3ACTW4WJmfM6fkSD2fEw57B3CHxK91C78VCm8Wv7l6DUtjvmqQf_aQt1bq0OKWRHOD05QIa172f-vuE7JJhB3VFYv_pu2MoPugYlUUh9wkJq1eU9h7wfYkBW0wJRrU9w_DP5lxqK7iDdF3JQrgLiocIocJuiN7-yWkEMvS7uyrVYIw_i43d7tTKiY4-NoxcpMPifzxxnvjwB3dbRr9FOBH4qMrKy-oGzkLlAC",
  },
  {
    id: "emerald-glow-juice",
    title: "Emerald Glow Juice",
    subtitle: "Large, No Ice",
    price: 8,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAv9vCUave-uD8ud6dZRlR1o-LEMiF5W-3L9HOwYcI1bIfUdu3B0srkGFunYo0WgidvSohuyshK0v2QhH1Fg0lkFnR9a7YqNKXYHOlFQ1eWr6NMNz5aPYAjXxsNhTevP95iR1kd1WDnlJnjq1ZhowIcTeTfFNz3cRnbRviv3sJE84woJMom8G6yknic_VMKQoazNB_6itkvllROse_vx6WC3DZ5h5CXgMyPyQeHjacVwBaLFeF1S9n9a2_8PrZphG8Ek5h2Ki2GN7WT",
  },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );
  const deliveryFee = 2.99;
  const tax = 1.45;
  const total = subtotal + deliveryFee + tax;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen pb-32">
      <TopAppBar title="My Cart" />

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        <section className="space-y-4">
          <h2 className="font-headline text-on-surface font-bold text-xl tracking-tight">
            Delivery Address
          </h2>
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0_8px_24px_rgba(23,29,25,0.04)] flex items-center gap-4 transition-transform active:scale-[0.98]">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
            </div>
            <div className="flex-1">
              <p className="font-headline font-bold text-on-surface text-base">Home Delivery</p>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                4521 Emerald Valley, Green District, Eco City, 10293
              </p>
            </div>
            <button className="text-primary font-headline font-bold text-sm px-4 py-2 hover:bg-primary/5 rounded-full transition-colors">
              Edit
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-headline text-on-surface font-bold text-xl tracking-tight">
              Order Items
            </h2>
            <span className="font-label text-on-surface-variant text-sm">{totalItems} items</span>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrease={() => updateQuantity(item.id, 1)}
                onDecrease={() => updateQuantity(item.id, -1)}
              />
            ))}
          </div>
        </section>

        <section className="bg-surface-container-low rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-body text-on-surface-variant">Subtotal</span>
            <span className="font-headline font-bold text-on-surface">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-body text-on-surface-variant">Delivery Fee</span>
            <span className="font-headline font-bold text-on-surface">${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-body text-on-surface-variant">Tax</span>
            <span className="font-headline font-bold text-on-surface">${tax.toFixed(2)}</span>
          </div>
          <div className="h-px bg-outline-variant/20 my-2" />
          <div className="flex justify-between items-center">
            <span className="font-headline font-extrabold text-xl text-on-surface">Total</span>
            <span className="font-headline font-black text-2xl text-primary">${total.toFixed(2)}</span>
          </div>
        </section>

        <div className="fixed bottom-24 left-0 w-full px-6 z-40 max-w-2xl mx-auto left-1/2 -translate-x-1/2">
          <button className="w-full py-4 bg-gradient-to-br from-[#2D9B64] to-[#006a3f] text-on-primary font-headline font-extrabold text-lg rounded-full shadow-[0_12px_32px_rgba(0,106,63,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3">
            Place Order
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>

      <BottomNavBar active="cart" />
    </div>
  );
}
