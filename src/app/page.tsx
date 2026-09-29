"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck, BadgeCheck, Sparkles, Play } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import ArchCard from "@/components/ArchCard";
import { Marquee } from "@/components/Chrome";
import { useShop } from "@/lib/store";

export default function Home() {
  const { settings, products } = useShop();
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="relative">
      <PageBackground
        video={settings.hero_video}
        video2={settings.hero_video2}
        image={settings.hero_poster}
        poster={settings.hero_poster}
        bandClass="h-[88vh] md:h-[94vh]"
      >

      {/* HERO */}
      <div className="h-full flex items-end md:items-center px-5 pb-10 md:pb-0">
        <div className="mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-8 items-end md:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 glass pill px-4 py-2 text-xs"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white/85">
                ● Showroom vidéo — Vu sur TikTok @riadshop0
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl leading-[1.02] mt-5 font-bold"
            >
              Homme
              <br />
              <span className="gold-text italic">luxe attitude</span>
            </motion.h1>
            <p className="mt-4 text-white/85 text-lg font-semibold tracking-wide">
              Esprit LV • Gucci • Dior — aux prix du Maroc
            </p>
            <p className="mt-4 text-white/75 text-lg max-w-md">
              {settings.tagline_fr}
            </p>
            <p className="text-[#e3c893] text-lg" dir="rtl">
              {settings.tagline_ar}
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                href="/clothes"
                className="pill bg-[#c9a86a] text-black font-bold px-8 py-4 flex items-center gap-2 hover:bg-white transition-all shadow-2xl"
              >
                Découvrir • اكتشف <ArrowRight size={18} />
              </Link>
              <a
                href={settings.tiktok}
                target="_blank"
                className="pill glass px-6 py-4 font-semibold flex items-center gap-2 hover:border-[#c9a86a]"
              >
                <Play size={16} /> Voir sur TikTok
              </a>
            </div>

            <div className="flex gap-6 mt-8 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Truck size={18} className="text-[#c9a86a]" /> Livraison gratuite
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[#c9a86a]" /> Paiement à la
                livraison
              </span>
            </div>
          </div>

          {/* floating arch preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="hidden md:flex justify-end"
          >
            <div className="relative">
              <div className="arch overflow-hidden w-[340px] h-[480px] ring-2 ring-[#c9a86a]/60 shadow-[0_40px_80px_rgba(0,0,0,0.6)] animate-floaty grain relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured[0]?.image || settings.hero_poster}
                  alt="look"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 glass pill px-5 py-2 text-sm whitespace-nowrap">
                  Nouveautés • <span className="font-bold text-[#e3c893]">dès 129 DH</span>
                </div>
              </div>
              <div className="absolute -left-10 top-8 glass pill px-4 py-2 text-xs rotate-[-8deg]">
                <Sparkles size={14} className="inline text-[#c9a86a]" /> Style homme premium
              </div>
              <div className="absolute -right-6 bottom-24 glass pill px-4 py-2 text-xs rotate-[6deg]">
                ⭐ 4.9 — avis clientes
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </PageBackground>

      <Marquee />

      {/* MARQUES */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 mt-12">
        <p className="text-center text-xs tracking-[0.35em] text-[#c9a86a]">
          NOS MARQUES • الماركات
        </p>
        <div className="mt-4 overflow-hidden glass pill py-3.5">
          <div className="flex whitespace-nowrap animate-marquee w-max items-center">
            {[0, 1].map((half) => (
              <span key={half} className="flex items-center">
                {settings.brands.map((b) => (
                  <span key={half + b} className="mx-5 font-display text-xl md:text-2xl text-white/90 italic">
                    {b} <span className="text-[#c9a86a] not-italic mx-3">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 mt-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#c9a86a]">NOUVELLE COLLECTION</p>
            <h2 className="font-display text-4xl md:text-5xl mt-2">
              Les pièces <span className="gold-text italic">qui partent vite</span>
            </h2>
          </div>
          <Link href="/clothes" className="hidden md:flex pill glass px-5 py-2.5 text-sm hover:border-[#c9a86a]">
            Tout voir <ArrowRight size={16} />
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar mt-8 pb-4 snap-x">
          {featured.map((p, i) => (
            <div key={p.id} className="snap-start">
              <ArchCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* MARKET — all clothes */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 mt-16">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] text-[#c9a86a]">LE MARCHÉ • السوق</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">
            Tout le <span className="gold-text italic">marché</span>
          </h2>
          <p className="text-white/60 text-sm mt-2">
            Les mêmes articles que sur TikTok — ici avec prix et tailles
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 mt-8">
          {products.slice(0, 8).map((p, i) => (
            <ArchCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
          <Link
            href="/clothes"
            className="pill bg-[#c9a86a] text-black font-bold px-8 py-3.5 text-sm text-center hover:bg-white transition"
          >
            Voir tout le marché
          </Link>
          <a
            href={settings.tiktok}
            target="_blank"
            className="pill glass px-8 py-3.5 text-sm font-semibold text-center hover:border-[#c9a86a]"
          >
            Produits réels sur TikTok @riadshop0 ↗
          </a>
        </div>
      </section>
      <section className="relative z-10 mx-auto max-w-6xl px-5 mt-16">
        <div className="glass rounded-[36px] p-7 md:p-10 grain relative overflow-hidden">
          <h3 className="font-display text-3xl text-center">
            Choisis ton <span className="gold-text italic">univers</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7">
            {(
              [
                { n: "Homme", img: "photo-1617137968427-85924c800a22", d: "هودي، جاكيت، t-shirt" },
                { n: "Enfants", img: "photo-1503919545889-aef636e10ad4", d: "لبسات صغار" },
                { n: "Accessoires", img: "photo-1584917865442-de89df76afd3", d: "صيكان وفولارات" },
              ] as const
            ).map((c) => (
              <Link
                key={c.n}
                href={`/clothes?cat=${c.n}`}
                className="group relative overflow-hidden leaf-card h-44 md:h-56"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://images.unsplash.com/${c.img}?q=80&w=600&auto=format&fit=crop`}
                  alt={c.n}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                <div className="absolute bottom-4 inset-x-0 text-center">
                  <p className="font-display text-xl">{c.n}</p>
                  <p className="text-xs text-white/70">{c.d}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 mt-16">
        <div className="grid md:grid-cols-2 gap-5">
          <a href={settings.tiktok} target="_blank" className="leaf-card-r overflow-hidden relative h-64 group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" alt="tiktok" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-display text-3xl">TikTok</p>
              <p className="text-sm text-white/75">@riadshop0 — looks réels</p>
              <span className="mt-3 pill bg-white text-black text-xs font-bold px-5 py-2">Suivre ↗</span>
            </div>
          </a>
          <a href={settings.instagram} target="_blank" className="leaf-card overflow-hidden relative h-64 group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop" alt="insta" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-display text-3xl">Instagram</p>
              <p className="text-sm text-white/75">Nouveautés chaque jour</p>
              <span className="mt-3 pill bg-[#c9a86a] text-black text-xs font-bold px-5 py-2">Voir ↗</span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
