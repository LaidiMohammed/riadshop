import type { Metadata } from "next";
import { Playfair_Display, Tajawal } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/lib/store";
import { NavbarTop, NavbarMobileTop, BottomNav } from "@/components/Navbars";
import { Footer } from "@/components/Chrome";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const body = Tajawal({ subsets: ["arabic", "latin"], weight: ["300", "400", "500", "700", "800"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "RiadShop — Style Homme Luxe",
  description: "Vêtements homme premium Maroc — Livraison gratuite, paiement à la livraison. TikTok @riadshop0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* start fetching the hero video during HTML parse, before React hydrates */}
        <link rel="preload" href="/brand/hero.mp4?v=5" as="video" type="video/mp4" />
      </head>
      <body className="min-h-screen">
        <ShopProvider>
          <NavbarTop />
          <NavbarMobileTop />
          <main className="pt-20 md:pt-28 min-h-screen">{children}</main>
          <Footer />
          <BottomNav />
        </ShopProvider>
      </body>
    </html>
  );
}
