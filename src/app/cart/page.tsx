"use client";

import { useState } from "react";
import PageBackground from "@/components/PageBackground";
import { useShop } from "@/lib/store";
import { Trash2, Minus, Plus, CheckCircle } from "lucide-react";

export default function CartPage() {
  const { settings, cart, updateQty, removeFromCart, cartTotal, placeOrder } = useShop();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [done, setDone] = useState<string | null>(null);

  const submit = () => {
    if (!form.name || !form.phone || !form.city) {
      alert("Merci de remplir Nom + Télé + Ville / عمّر الاسم والتيليفون والمدينة");
      return;
    }
    if (cart.length === 0) return;
    const o = placeOrder(form);
    setDone(o.id);
    setForm({ name: "", phone: "", city: "", address: "" });
  };

  return (
    <div className="relative">
      <PageBackground image={settings.backgrounds.cart}>
        <div className="h-full flex flex-col justify-end mx-auto max-w-5xl px-5 pb-8">
          <p className="text-xs tracking-[0.3em] text-[#c9a86a]">MYSHOPS • PANIER</p>
          <h1 className="font-display text-5xl mt-2">
            Ton <span className="gold-text italic">panier</span>
          </h1>
        </div>
      </PageBackground>
      <section className="relative z-10 mx-auto max-w-5xl px-5 pt-6 pb-10">

        {done && (
          <div className="mt-6 rounded-[28px] bg-green-500/15 border border-green-400/40 p-6 flex items-center gap-4">
            <CheckCircle className="text-green-400" size={36} />
            <div>
              <p className="font-bold text-lg">Commande {done} confirmée ✓</p>
              <p className="text-sm text-white/70">
                On va t&apos;appeler pour confirmer — غادي نعيطو ليك للتأكيد.{" "}
                <a className="underline" target="_blank" href={settings.whatsapp}>Confirmer sur WhatsApp</a>
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-[1fr_360px] gap-6 mt-8">
          <div className="space-y-4">
            {cart.length === 0 && !done && (
              <div className="glass rounded-[28px] p-10 text-center">
                <p className="font-display text-2xl">Panier vide</p>
                <p className="text-white/60 text-sm mt-2">السلة خاوية — زيد شي لبسة من البوتيك</p>
                <a href="/clothes" className="inline-block mt-5 pill bg-[#c9a86a] text-black font-bold px-7 py-3 text-sm">
                  Voir les vêtements
                </a>
              </div>
            )}
            {cart.map((it) => (
              <div key={it.product.id + it.size} className="glass rounded-[28px] p-4 flex gap-4 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.product.image} alt="" className="h-24 w-20 object-cover rounded-[18px_40px_18px_40px]" />
                <div className="flex-1">
                  <p className="font-semibold">{it.product.name}</p>
                  <p className="text-xs text-white/60">Taille: {it.size} • {it.product.price} DH</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(it.product.id, it.size, -1)} className="pill border border-white/20 w-8 h-8 flex items-center justify-center"><Minus size={14} /></button>
                    <span className="font-bold w-6 text-center">{it.qty}</span>
                    <button onClick={() => updateQty(it.product.id, it.size, 1)} className="pill border border-white/20 w-8 h-8 flex items-center justify-center"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#e3c893]">{it.product.price * it.qty} DH</p>
                  <button onClick={() => removeFromCart(it.product.id, it.size)} className="text-white/40 hover:text-red-400 mt-2"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass rounded-[28px] p-6 h-fit md:sticky md:top-32">
            <p className="font-display text-2xl">Commander — COD</p>
            <p className="text-xs text-white/60" dir="rtl">الدفع عند الاستلام — التوصيل بالمجان</p>
            <div className="space-y-3 mt-5">
              {(
                [
                  ["name", "Nom complet • الاسم"],
                  ["phone", "Téléphone • الهاتف"],
                  ["city", "Ville • المدينة"],
                  ["address", "Adresse • العنوان"],
                ] as const
              ).map(([k, ph]) => (
                <input
                  key={k}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  placeholder={ph}
                  className="w-full rounded-2xl bg-white/8 border border-white/15 px-4 py-3 text-sm outline-none focus:border-[#c9a86a] placeholder:text-white/35"
                />
              ))}
            </div>
            <div className="flex justify-between mt-5 text-sm text-white/70">
              <span>Livraison</span><span className="text-green-400 font-bold">Gratuite</span>
            </div>
            <div className="flex justify-between mt-1 font-display text-2xl">
              <span>Total</span><span className="gold-text font-bold">{cartTotal} DH</span>
            </div>
            <button
              onClick={submit}
              className="mt-5 w-full pill bg-[#c9a86a] text-black font-bold py-4 hover:bg-white transition"
            >
              Commander • أكّد الطلب
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
