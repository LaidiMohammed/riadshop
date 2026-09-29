"use client";

import { useState } from "react";
import PageBackground from "@/components/PageBackground";
import { useShop } from "@/lib/store";
import { Product, Category } from "@/lib/types";
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from "@/lib/data";
import { Trash2, Plus, RotateCcw, Save, Eye } from "lucide-react";

const TABS = ["Dashboard", "Produits", "Accueil & Fonds", "Commandes", "Réglages"] as const;

export default function AdminPage() {
  const { products, setProducts, settings, setSettings, orders, resetAll, cartTotal } = useShop();
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Dashboard");

  if (!authed) {
    return (
      <div className="relative min-h-[70vh] flex items-center justify-center px-5">
        <PageBackground image={settings.backgrounds.home} />
        <div className="relative z-10 glass rounded-[32px] p-8 w-full max-w-sm text-center">
          <p className="font-display text-3xl gold-text font-bold">Admin caché</p>
          <p className="text-xs text-white/60 mt-1">Route secrète /riad-admin — code: 1234</p>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code d'accès"
            className="mt-5 w-full rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-center outline-none focus:border-[#c9a86a]"
          />
          <button
            onClick={() => (code === "1234" ? setAuthed(true) : alert("Code faux"))}
            className="mt-3 w-full pill bg-[#c9a86a] text-black font-bold py-3"
          >
            Entrer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageBackground image={settings.backgrounds.about} bandClass="h-[32vh] md:h-[38vh]">
        <div className="h-full flex flex-col justify-end mx-auto max-w-6xl px-5 pb-8">
          <p className="text-xs tracking-[0.3em] text-[#c9a86a]">HIDDEN ADMIN</p>
          <h1 className="font-display text-4xl">Contrôle <span className="gold-text italic">total</span></h1>
        </div>
      </PageBackground>
      <section className="relative z-10 mx-auto max-w-6xl px-5 pt-6 pb-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <a href="/" className="pill glass px-4 py-2 text-xs flex items-center gap-1"><Eye size={14}/> Voir site</a>
            <button onClick={() => { resetAll(); alert("Réinitialisé"); }} className="pill border border-red-400/40 text-red-300 px-4 py-2 text-xs flex items-center gap-1"><RotateCcw size={14}/> Reset</button>
          </div>
        </div>

        <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`pill px-5 py-2.5 text-sm whitespace-nowrap ${tab === t ? "bg-[#c9a86a] text-black font-bold" : "glass text-white/75"}`}>{t}</button>
          ))}
        </div>

        {tab === "Dashboard" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              ["Produits", String(products.length)],
              ["Commandes", String(orders.length)],
              ["CA estimé", orders.reduce((s, o) => s + o.total, 0) + " DH"],
              ["Panier live", cartTotal + " DH"],
            ].map(([l, v]) => (
              <div key={l} className="glass rounded-[24px] p-6 text-center">
                <p className="font-display text-3xl text-[#e3c893]">{v}</p>
                <p className="text-xs text-white/60 mt-1">{l}</p>
              </div>
            ))}
            <div className="col-span-2 md:col-span-4 glass rounded-[24px] p-6 text-sm text-white/70">
              <p className="font-bold text-white">Comment remplacer logo / vidéo / photos ?</p>
              <ol className="list-decimal ml-5 mt-2 space-y-1">
                <li>Dépose tes fichiers dans <code>public/brand/</code> (ex: logo.png, hero.mp4, bg-home.jpg)</li>
                <li>Dans l&apos;onglet Réglages, colle <code>/brand/logo.png</code> ou <code>/brand/hero.mp4</code></li>
                <li>Pour un produit: onglet Produits → colle l&apos;URL image ou <code>/brand/robe1.jpg</code></li>
                <li>Tout est sauvé en local + prêt pour Supabase (mêmes noms de champs).</li>
              </ol>
            </div>
          </div>
        )}

        {tab === "Produits" && (
          <ProductsEditor products={products} setProducts={setProducts} />
        )}

        {tab === "Accueil & Fonds" && (
          <div className="glass rounded-[28px] p-6 mt-6 space-y-4">
            <Field label="Vidéo hero (URL mp4 ou /brand/hero.mp4)" value={settings.hero_video} onChange={(v) => setSettings({ ...settings, hero_video: v })} />
            <Field label="Vidéo secours (si la 1ère ne charge pas)" value={settings.hero_video2 || ""} onChange={(v) => setSettings({ ...settings, hero_video2: v })} />
            <p className="text-xs text-white/50">Astuce: dépose ta vraie vidéo TikTok/boutique dans <code>public/brand/hero.mp4</code> — elle passe en priorité automatiquement.</p>
            <Field label="Poster hero (image)" value={settings.hero_poster} onChange={(v) => setSettings({ ...settings, hero_poster: v })} />
            {(["home", "clothes", "about", "cart"] as const).map((k) => (
              <Field key={k} label={`Fond page ${k}`} value={settings.backgrounds[k]} onChange={(v) => setSettings({ ...settings, backgrounds: { ...settings.backgrounds, [k]: v } })} />
            ))}
            <Field label="Annonce FR" value={settings.announcement_fr} onChange={(v) => setSettings({ ...settings, announcement_fr: v })} />
            <Field label="Annonce AR" value={settings.announcement_ar} onChange={(v) => setSettings({ ...settings, announcement_ar: v })} />
            <Field label="Marques (séparées par , )" value={(settings.brands || []).join(", ")} onChange={(v) => setSettings({ ...settings, brands: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
            <div className="pt-2 border-t border-white/10" />
            <p className="font-bold text-white text-sm">Boutique & Map</p>
            <Field label="Adresse boutique" value={settings.boutique_address} onChange={(v) => setSettings({ ...settings, boutique_address: v })} />
            <Field label="Ville" value={settings.boutique_city} onChange={(v) => setSettings({ ...settings, boutique_city: v })} />
            <Field label="Horaires" value={settings.boutique_hours} onChange={(v) => setSettings({ ...settings, boutique_hours: v })} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white/60">Latitude</label>
                <input type="number" step="any" value={settings.map_lat} onChange={(e) => setSettings({ ...settings, map_lat: Number(e.target.value) })} className="mt-1 w-full rounded-2xl bg-white/8 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-[#c9a86a]" />
              </div>
              <div>
                <label className="text-xs text-white/60">Longitude</label>
                <input type="number" step="any" value={settings.map_lng} onChange={(e) => setSettings({ ...settings, map_lng: Number(e.target.value) })} className="mt-1 w-full rounded-2xl bg-white/8 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-[#c9a86a]" />
              </div>
            </div>
          </div>
        )}

        {tab === "Commandes" && (
          <div className="space-y-3 mt-6">
            {orders.length === 0 && <p className="glass rounded-[24px] p-8 text-center text-white/60">Aucune commande pour l&apos;instant.</p>}
            {orders.map((o) => (
              <div key={o.id} className="glass rounded-[24px] p-5">
                <div className="flex justify-between flex-wrap gap-2">
                  <p className="font-bold">{o.id} — {o.name} ({o.phone})</p>
                  <p className="text-[#e3c893] font-bold">{o.total} DH</p>
                </div>
                <p className="text-xs text-white/60">{o.city} — {o.address} • {new Date(o.date).toLocaleString()}</p>
                <p className="text-sm mt-2">{o.items.map((i) => `${i.product.name} [${i.size}] x${i.qty}`).join(" • ")}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "Réglages" && (
          <div className="glass rounded-[28px] p-6 mt-6 space-y-4">
            <Field label="Nom boutique" value={settings.brand_name} onChange={(v) => setSettings({ ...settings, brand_name: v })} />
            <Field label="Logo (URL ou /brand/logo.svg)" value={settings.logo} onChange={(v) => setSettings({ ...settings, logo: v })} />
            <div>
              <label className="text-xs text-white/60">Couleur principale (du logo)</label>
              <div className="flex gap-3 items-center mt-1">
                <input type="color" value={settings.primary} onChange={(e) => setSettings({ ...settings, primary: e.target.value })} className="h-11 w-16 rounded-xl bg-transparent" />
                <span className="text-sm">{settings.primary}</span>
                <span className="pill px-4 py-2 text-xs font-bold" style={{ background: settings.primary, color: "#000" }}>Aperçu</span>
              </div>
            </div>
            <Field label="TikTok URL" value={settings.tiktok} onChange={(v) => setSettings({ ...settings, tiktok: v })} />
            <Field label="Instagram URL" value={settings.instagram} onChange={(v) => setSettings({ ...settings, instagram: v })} />
            <Field label="WhatsApp URL" value={settings.whatsapp} onChange={(v) => setSettings({ ...settings, whatsapp: v })} />
            <button onClick={() => { setSettings(DEFAULT_SETTINGS); setProducts(DEFAULT_PRODUCTS); }} className="pill border border-white/20 px-5 py-2.5 text-sm flex items-center gap-2"><Save size={15}/> Restaurer démo</button>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-2xl bg-white/8 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-[#c9a86a]" />
    </div>
  );
}

function ProductsEditor({ products, setProducts }: { products: Product[]; setProducts: (p: Product[]) => void }) {
  const [form, setForm] = useState({ name: "", price: "", category: "Homme" as Category, image: "" });

  const add = () => {
    if (!form.name || !form.price) return alert("Nom + prix requis");
    const p: Product = {
      id: "p" + Date.now(),
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      sizes: ["S", "M", "L", "XL"],
      featured: true,
    };
    setProducts([p, ...products]);
    setForm({ name: "", price: "", category: "Homme", image: "" });
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="glass rounded-[24px] p-5 grid md:grid-cols-5 gap-3">
        <input placeholder="Nom • الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-2xl bg-white/8 border border-white/15 px-4 py-2.5 text-sm outline-none" />
        <input placeholder="Prix DH" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-2xl bg-white/8 border border-white/15 px-4 py-2.5 text-sm outline-none" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })} className="rounded-2xl bg-white/10 border border-white/15 px-4 py-2.5 text-sm outline-none text-white">
          {(["Homme", "Enfants", "Accessoires"] as const).map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
        </select>
        <input placeholder="Image URL ou /brand/xxx.jpg" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="rounded-2xl bg-white/8 border border-white/15 px-4 py-2.5 text-sm outline-none md:col-span-1" />
        <button onClick={add} className="pill bg-[#c9a86a] text-black font-bold text-sm flex items-center justify-center gap-1"><Plus size={15}/> Ajouter</button>
      </div>
      {products.map((p) => (
        <div key={p.id} className="glass rounded-[24px] p-4 flex gap-4 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt="" className="h-16 w-14 object-cover rounded-2xl" />
          <div className="flex-1 grid md:grid-cols-4 gap-2">
            <input value={p.name} onChange={(e) => setProducts(products.map((x) => x.id === p.id ? { ...x, name: e.target.value } : x))} className="bg-transparent border-b border-white/10 outline-none text-sm" />
            <input value={p.image} onChange={(e) => setProducts(products.map((x) => x.id === p.id ? { ...x, image: e.target.value } : x))} className="bg-transparent border-b border-white/10 outline-none text-xs text-white/60 md:col-span-2" placeholder="image url" />
            <input value={p.price} type="number" onChange={(e) => setProducts(products.map((x) => x.id === p.id ? { ...x, price: Number(e.target.value) } : x))} className="bg-transparent border-b border-white/10 outline-none text-sm w-24" />
          </div>
          <label className="text-xs flex items-center gap-1"><input type="checkbox" checked={!!p.featured} onChange={(e) => setProducts(products.map((x) => x.id === p.id ? { ...x, featured: e.target.checked } : x))} /> Top</label>
          <button onClick={() => setProducts(products.filter((x) => x.id !== p.id))} className="text-red-300 hover:text-red-400"><Trash2 size={17} /></button>
        </div>
      ))}
    </div>
  );
}
