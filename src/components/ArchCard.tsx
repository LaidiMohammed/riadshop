"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { useShop } from "@/lib/store";
import { useState } from "react";

export default function ArchCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addToCart } = useShop();
  const [size, setSize] = useState(product.sizes[0] || "M");
  const [added, setAdded] = useState(false);

  const discount = product.old_price
    ? Math.round((1 - product.price / product.old_price) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.6 }}
      className="group relative w-[240px] md:w-[270px] shrink-0"
    >
      <div className="arch overflow-hidden relative bg-[#1c1b18] ring-1 ring-white/15 shadow-2xl shadow-black/50">
        <div className="relative h-[320px] md:h-[360px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
          {product.badge && (
            <span className="absolute top-4 left-1/2 -translate-x-1/2 pill bg-[#c9a86a] text-black text-[11px] font-bold px-3 py-1">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold rotate-12">
              -{discount}%
            </span>
          )}
          {/* price bubble */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 glass pill px-4 py-1.5 flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-[#e3c893]">{product.price} DH</span>
            {product.old_price && (
              <span className="text-xs text-white/50 line-through">
                {product.old_price} DH
              </span>
            )}
          </div>
        </div>
        <div className="px-5 pt-3 pb-5 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[#c9a86a] uppercase">
            {product.category}
          </p>
          <h3 className="font-display text-lg leading-tight mt-1">
            {product.name}
          </h3>
          {product.name_ar && (
            <p className="text-sm text-white/60" dir="rtl">
              {product.name_ar}
            </p>
          )}
          <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
            {product.sizes.slice(0, 5).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`pill px-2.5 py-1 text-[11px] border transition ${
                  size === s
                    ? "bg-[#c9a86a] text-black border-[#c9a86a] font-bold"
                    : "border-white/20 text-white/70"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              addToCart(product, size);
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`mt-3 w-full pill py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-white text-black hover:bg-[#c9a86a]"
            }`}
          >
            <Plus size={16} /> {added ? "Ajouté ✓" : "Ajouter • زيد"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function GridArchCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <div className={index % 2 === 1 ? "md:mt-10" : ""}>
      <ArchCard product={product} index={index} />
    </div>
  );
}
