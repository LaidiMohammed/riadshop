"use client";

import { useShop } from "@/lib/store";

export function Marquee() {
  const { settings } = useShop();
  const items = Array(8).fill(`${settings.announcement_fr} ✦ ${settings.announcement_ar} ✦ `);
  return (
    <div className="relative z-10 overflow-hidden bg-[#c9a86a] text-black py-2.5 -rotate-1 scale-[1.02] shadow-xl">
      <div className="flex whitespace-nowrap animate-marquee gap-0 w-max">
        {[0, 1].map((half) => (
          <span key={half} className="text-sm font-bold tracking-wide">
            {items.join(" ")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const { settings } = useShop();
  return (
    <footer className="relative z-10 mt-20 pb-28 md:pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="glass rounded-[32px] p-8 md:p-10 grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-3xl gold-text font-bold">{settings.brand_name}</p>
            <p className="text-white/70 text-sm mt-2">{settings.tagline_fr}</p>
            <p className="text-white/60 text-sm" dir="rtl">{settings.tagline_ar}</p>
            <div className="flex gap-2 mt-4">
              <a href={settings.tiktok} target="_blank" className="pill bg-white text-black text-xs font-bold px-4 py-2 hover:bg-[#c9a86a]">TikTok</a>
              <a href={settings.instagram} target="_blank" className="pill border border-white/25 text-xs font-bold px-4 py-2 hover:bg-white hover:text-black">Instagram</a>
              <a href={settings.whatsapp} target="_blank" className="pill border border-white/25 text-xs font-bold px-4 py-2 hover:bg-green-500 hover:border-green-500 hover:text-white">WhatsApp</a>
            </div>
          </div>
          <div className="text-sm text-white/70 space-y-2">
            <p className="text-[#e3c893] font-bold tracking-widest text-xs">LIENS</p>
            <a href="/" className="block hover:text-white">Home</a>
            <a href="/clothes" className="block hover:text-white">Vêtements</a>
            <a href="/about" className="block hover:text-white">About Us</a>
            <a href="/cart" className="block hover:text-white">MyShops (Panier)</a>
          </div>
          <div className="text-sm text-white/70">
            <p className="text-[#e3c893] font-bold tracking-widest text-xs">CONTACT</p>
            <p className="mt-2">Livraison partout au Maroc 🚚</p>
            <p>Paiement à la livraison 💵</p>
            <p className="mt-2 text-xs text-white/40">© 2026 {settings.brand_name} — Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
