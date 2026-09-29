"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import ArchCard from "@/components/ArchCard";
import { useShop } from "@/lib/store";
import { Category } from "@/lib/types";

const CATS: ("Tous" | Category)[] = ["Tous", "Homme", "Enfants", "Accessoires"];

function ClothesInner() {
  const { settings, products } = useShop();
  const params = useSearchParams();
  const initial = (params.get("cat") as Category) || "Tous";
  const [cat, setCat] = useState<string>(initial);
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Tous" || p.category === cat) &&
          (q === "" ||
            p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.name_ar?.includes(q))
      ),
    [products, cat, q]
  );

  return (
    <div className="relative">
      <PageBackground image={settings.backgrounds.clothes}>
        <div className="h-full flex flex-col justify-end mx-auto max-w-6xl px-5 pb-8">
          <p className="text-xs tracking-[0.3em] text-[#c9a86a]">BOUTIQUE</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">
            Nos <span className="gold-text italic">vêtements</span>
          </h1>
          <p className="text-white/70 mt-2" dir="rtl">
            اختاري الستايل ديالك — التوصيل بالمجان
          </p>
        </div>
      </PageBackground>
      <section className="relative z-10 mx-auto max-w-6xl px-5 pt-6 pb-10">

        <div className="glass pill flex items-center gap-2 px-5 py-3 mt-6 max-w-md">
          <Search size={18} className="text-[#c9a86a]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher… قلب على لبسة"
            className="bg-transparent outline-none flex-1 text-sm placeholder:text-white/40"
          />
        </div>

        <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar pb-1">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`pill px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-all ${
                cat === c
                  ? "bg-[#c9a86a] text-black shadow-lg"
                  : "glass text-white/80 hover:border-[#c9a86a]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 mt-10">
          {list.map((p, i) => (
            <ArchCard key={p.id} product={p} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-white/60 mt-16">
            Aucun article trouvé — جربي كلمة أخرى
          </p>
        )}
      </section>
    </div>
  );
}

export default function ClothesPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Chargement…</div>}>
      <ClothesInner />
    </Suspense>
  );
}
