"use client";

import PageBackground from "@/components/PageBackground";
import { useShop } from "@/lib/store";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, HeartHandshake, Scissors, MapPin, Clock, Navigation } from "lucide-react";

export default function About() {
  const { settings } = useShop();
  const { map_lat, map_lng } = settings;
  const d = 0.02;
  const bbox = `${map_lng - d},${map_lat - d},${map_lng + d},${map_lat + d}`;
  const osm = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${map_lat},${map_lng}`;
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${map_lat},${map_lng}`;
  return (
    <div className="relative">
      <PageBackground image={settings.backgrounds.about}>
        <div className="h-full flex flex-col justify-end mx-auto max-w-5xl px-5 pb-8">
          <p className="text-xs tracking-[0.3em] text-[#c9a86a]">NOTRE HISTOIRE</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">
            About <span className="gold-text italic">RiadShop</span>
          </h1>
        </div>
      </PageBackground>
      <section className="relative z-10 mx-auto max-w-5xl px-5 pt-8">

        <div className="grid md:grid-cols-2 gap-6 mt-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="arch overflow-hidden relative min-h-[420px] ring-1 ring-[#c9a86a]/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
              alt="atelier"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 inset-x-6 glass pill px-5 py-3 text-center text-sm">
              Depuis TikTok @riadshop0 — la qualité d&apos;abord
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[36px] p-8"
          >
            <h2 className="font-display text-3xl">Une boutique née sur TikTok</h2>
            <p className="text-white/75 mt-4 leading-relaxed">
              RiadShop a commencé avec des vidéos simples: des looks réels pour
              hommes, des prix clairs, sans filtre. Aujourd&apos;hui on habille
              des milliers de clients partout au Maroc — du streetwear premium
              aux vestes cuir et chemises élégantes.
            </p>
            <p className="text-white/75 mt-3 leading-relaxed" dir="rtl">
              بدينا بفيديوهات حقيقية على تيك توك، واليوم كنوصلو لجميع المدن
              المغربية — الجودة والثمن المناسب هو الشعار ديالنا.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-6 text-center">
              {[
                ["+2500", "clientes"],
                ["4.9★", "avis"],
                ["24h", "expédition"],
              ].map(([n, l]) => (
                <div key={l} className="pill bg-white/5 border border-white/10 py-4">
                  <p className="font-display text-2xl text-[#e3c893]">{n}</p>
                  <p className="text-xs text-white/60">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { i: Truck, t: "Livraison gratuite", d: " لجميع المدن" },
            { i: ShieldCheck, t: "Paiement à la livraison", d: "خلص حتى توصلك" },
            { i: Scissors, t: "Qualité vérifiée", d: "سلعة مختارة بعناية" },
            { i: HeartHandshake, t: "Retour facile", d: "رضاك هو الأول" },
          ].map((c) => (
            <div key={c.t} className="glass rounded-[24px] p-5 text-center">
              <c.i className="mx-auto text-[#c9a86a]" size={26} />
              <p className="font-semibold mt-2 text-sm">{c.t}</p>
              <p className="text-xs text-white/60">{c.d}</p>
            </div>
          ))}
        </div>

        {/* LOCALISATION BOUTIQUE */}
        <div className="mt-8 overflow-hidden rounded-[36px] ring-1 ring-[#c9a86a]/30 glass">
          <div className="p-7 md:p-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#c9a86a]">NOTRE BOUTIQUE • المحل</p>
              <h2 className="font-display text-3xl mt-1 flex items-center gap-2">
                <MapPin className="text-[#c9a86a]" /> {settings.boutique_city}
              </h2>
              <p className="text-white/70 text-sm mt-2">{settings.boutique_address}</p>
              <p className="text-white/60 text-sm flex items-center gap-1.5 mt-1">
                <Clock size={14} className="text-[#c9a86a]" /> {settings.boutique_hours}
              </p>
            </div>
            <a
              href={gmaps}
              target="_blank"
              className="pill bg-[#c9a86a] text-black font-bold px-6 py-3 text-sm flex items-center gap-2 hover:bg-white transition"
            >
              <Navigation size={16} /> Itinéraire • الطريق
            </a>
          </div>
          <iframe
            title="Boutique map"
            src={osm}
            className="w-full h-[340px] border-0 grayscale-[35%] contrast-[1.05]"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
