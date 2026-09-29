"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Shirt, Info, ShoppingBag } from "lucide-react";
import { useShop } from "@/lib/store";

const LINKS = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/clothes", label: "Vêtements", icon: Shirt },
  { href: "/cart", label: "Panier", icon: ShoppingBag, center: true },
  { href: "/about", label: "À propos", icon: Info },
];

export function NavbarTop() {
  const { settings, cartCount } = useShop();
  const path = usePathname();
  return (
    <header className="fixed top-0 inset-x-0 z-40 hidden md:block">
      <div className="bg-[#121210]/90 backdrop-blur border-b border-white/10">
        <p className="text-center text-[12px] tracking-wide py-1.5 text-[#e3c893]">
          {settings.announcement_fr} — {settings.announcement_ar}
        </p>
      </div>
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={settings.logo}
            alt="logo"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-[#c9a86a]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/brand/logo.svg";
            }}
          />
          <div className="leading-tight">
            <p className="font-display text-2xl gold-text font-bold">
              {settings.brand_name}
            </p>
            <p className="text-[11px] text-white/60">{settings.tagline_fr}</p>
          </div>
        </Link>
        <div className="flex items-center gap-1 glass pill px-2 py-1.5">
          {[
            { href: "/", label: "Home" },
            { href: "/clothes", label: "Vêtements" },
            { href: "/about", label: "About Us" },
            { href: "/cart", label: `MyShops (${cartCount})` },
          ].map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className={`px-5 py-2 pill text-sm transition-all ${
                path === l.href
                  ? "bg-[#c9a86a] text-black font-semibold"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <a
          href={settings.tiktok}
          target="_blank"
          className="pill bg-white text-black text-sm font-semibold px-5 py-2.5 hover:bg-[#c9a86a] transition"
        >
          TikTok ↗
        </a>
      </nav>
    </header>
  );
}

export function NavbarMobileTop() {
  const { settings } = useShop();
  return (
    <header className="fixed top-0 inset-x-0 z-40 md:hidden">
      <div className="glass mx-3 mt-3 pill flex items-center justify-between px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={settings.logo}
            alt="logo"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-[#c9a86a]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/brand/logo.svg";
            }}
          />
          <span className="font-display text-xl gold-text font-bold">
            {settings.brand_name}
          </span>
        </Link>
        <a
          href={settings.tiktok}
          target="_blank"
          className="text-xs bg-[#c9a86a] text-black font-bold pill px-3 py-1.5"
        >
          TikTok
        </a>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { cartCount } = useShop();
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <div className="mx-3 mb-3 pb-safe">
        <div className="glass pill flex items-center justify-around px-2 py-2 shadow-2xl shadow-black/60">
          {LINKS.map((l) => {
            const active = path === l.href;
            const Icon = l.icon;
            if (l.center) {
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="relative -mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#e3c893] to-[#8a6d3b] text-black shadow-xl shadow-black/50 ring-4 ring-[#121210]"
                >
                  <Icon size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 pill text-[11px] ${
                  active ? "text-[#e3c893]" : "text-white/60"
                }`}
              >
                <Icon size={20} />
                {l.label}
                {active && (
                  <span className="h-1 w-6 rounded-full bg-[#c9a86a]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
