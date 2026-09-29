# RiadShop — Style Homme Luxe 🇲🇦

Boutique vêtements homme — Next.js + Tailwind, 100% frontend (localStorage, prêt pour Supabase).

## Pages
- `/` — Home : vidéo men-fashion en header, marques (LV • Gucci • Dior), marché, catégories
- `/clothes` — Boutique : filtres Homme / Enfants / Accessoires + recherche
- `/about` — Histoire + localisation boutique sur carte (OpenStreetMap)
- `/cart` — MyShops : panier + commande COD (Nom/Télé/Ville/Adresse) + WhatsApp
- `/riad-admin` — **Admin caché** (code `1234`) : produits, vidéo hero, fonds, commandes, couleurs, liens TikTok/Instagram/WhatsApp

## Lancer
```bash
npm install
npm run dev   # → http://localhost:3003 (si 3000 pris, Next propose 3001…)
npm run build
```

## Changer la vidéo / logo (sans coder)
1. Dépose `hero.mp4` + `logo.png` dans `public/brand/`
2. Ouvre `/riad-admin` → Réglages → mets `/brand/hero.mp4` et `/brand/logo.png`

## TikTok
[@riadshop0](https://www.tiktok.com/@riadshop0) — lié dans navbar, hero, footer et page cart.
