"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Order, Product, SiteSettings } from "./types";
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from "./data";

interface ShopState {
  products: Product[];
  setProducts: (p: Product[]) => void;
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
  cart: CartItem[];
  addToCart: (p: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQty: (id: string, size: string, d: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  orders: Order[];
  placeOrder: (o: Omit<Order, "id" | "date" | "items" | "total">) => Order;
  resetAll: () => void;
}

const Ctx = createContext<ShopState | null>(null);

const load = <T,>(k: string, fb: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fb;
  } catch {
    return fb;
  }
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProductsState] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [settings, setSettingsState] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // migrate catalog: drop deleted items, merge in new defaults, keep admin edits
    const REMOVED = ["p1", "p4"];
    const savedProducts = load<Product[]>("rs_products", DEFAULT_PRODUCTS);
    const map = new Map(
      savedProducts.filter((p) => !REMOVED.includes(p.id)).map((p) => [p.id, p] as const)
    );
    DEFAULT_PRODUCTS.forEach((p) => {
      if (!map.has(p.id)) map.set(p.id, p);
    });
    setProductsState([...map.values()]);
    const saved = load<Partial<SiteSettings>>("rs_settings", {});
    // migrate renamed/rotated defaults (only when user still has the old default value)
    const OLD_BRANDS = ["Zara", "H&M", "Shein", "LC Waikiki", "Nike", "Adidas", "Bershka", "Pull&Bear"];
    const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
    const merged: SiteSettings = {
      ...DEFAULT_SETTINGS,
      ...saved,
      backgrounds: { ...DEFAULT_SETTINGS.backgrounds, ...(saved.backgrounds || {}) },
      brands: saved.brands || DEFAULT_SETTINGS.brands,
    };
    if (saved.tagline_fr === "L'élégance marocaine, livrée chez vous")
      merged.tagline_fr = DEFAULT_SETTINGS.tagline_fr;
    if (saved.tagline_ar === "الأناقة المغربية حتى لباب دارك")
      merged.tagline_ar = DEFAULT_SETTINGS.tagline_ar;
    if (saved.brands && same(saved.brands, OLD_BRANDS)) merged.brands = DEFAULT_SETTINGS.brands;
    if (saved.hero_video?.includes("6794223")) merged.hero_video = DEFAULT_SETTINGS.hero_video;
    if (saved.hero_video2?.includes("5927936")) merged.hero_video2 = DEFAULT_SETTINGS.hero_video2;
    // first-generation dead/rotated clips → current verified men's video
    const DEAD = ["mixkit", "7677252", "5309381", "9732434", "9732072"];
    if (saved.hero_video && DEAD.some((d) => saved.hero_video!.includes(d))) {
      merged.hero_video = DEFAULT_SETTINGS.hero_video;
      merged.hero_video2 = DEFAULT_SETTINGS.hero_video2;
    }
    if (saved.hero_poster?.includes("photo-1441986300917")) merged.hero_poster = DEFAULT_SETTINGS.hero_poster;
    if (saved.backgrounds?.cart?.includes("photo-1483985988355"))
      merged.backgrounds.cart = DEFAULT_SETTINGS.backgrounds.cart;
    setSettingsState(merged);
    setCart(load("rs_cart", []));
    setOrders(load("rs_orders", []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("rs_products", JSON.stringify(products));
  }, [products, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("rs_settings", JSON.stringify(settings));
  }, [settings, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("rs_cart", JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("rs_orders", JSON.stringify(orders));
  }, [orders, ready]);

  // apply primary color live
  useEffect(() => {
    document.documentElement.style.setProperty("--rs-primary", settings.primary);
  }, [settings.primary]);

  const setProducts = (p: Product[]) => setProductsState(p);
  const setSettings = (s: SiteSettings) => setSettingsState(s);

  const addToCart = (p: Product, size: string) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.product.id === p.id && x.size === size);
      if (i >= 0) {
        const n = [...c];
        n[i] = { ...n[i], qty: n[i].qty + 1 };
        return n;
      }
      return [...c, { product: p, size, qty: 1 }];
    });
  };
  const removeFromCart = (id: string, size: string) =>
    setCart((c) => c.filter((x) => !(x.product.id === id && x.size === size)));
  const updateQty = (id: string, size: string, d: number) =>
    setCart((c) =>
      c
        .map((x) =>
          x.product.id === id && x.size === size
            ? { ...x, qty: Math.max(0, x.qty + d) }
            : x
        )
        .filter((x) => x.qty > 0)
    );
  const clearCart = () => setCart([]);

  const placeOrder = (o: Omit<Order, "id" | "date" | "items" | "total">) => {
    const total = cart.reduce((s, x) => s + x.product.price * x.qty, 0);
    const order: Order = {
      ...o,
      id: "CMD-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      items: cart,
      total,
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  const resetAll = () => {
    setProductsState(DEFAULT_PRODUCTS);
    setSettingsState(DEFAULT_SETTINGS);
    setCart([]);
  };

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = cart.reduce((s, x) => s + x.product.price * x.qty, 0);

  return (
    <Ctx.Provider
      value={{
        products,
        setProducts,
        settings,
        setSettings,
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        orders,
        placeOrder,
        resetAll,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useShop = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShop outside provider");
  return v;
};
