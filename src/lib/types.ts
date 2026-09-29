// Supabase-ready types (frontend-only for now, same shape as future tables)

export type Category = "Homme" | "Enfants" | "Accessoires";

export interface Product {
  id: string;
  name: string;
  name_ar?: string;
  price: number;
  old_price?: number;
  category: Category;
  image: string;
  badge?: string;
  sizes: string[];
  desc?: string;
  featured?: boolean;
}

export interface SiteSettings {
  brand_name: string;
  tagline_fr: string;
  tagline_ar: string;
  hero_video: string;
  hero_video2?: string;
  hero_poster: string;
  logo: string;
  primary: string;
  tiktok: string;
  instagram: string;
  whatsapp: string;
  announcement_fr: string;
  announcement_ar: string;
  brands: string[];
  boutique_address: string;
  boutique_city: string;
  boutique_hours: string;
  map_lat: number;
  map_lng: number;
  backgrounds: {
    home: string;
    clothes: string;
    about: string;
    cart: string;
  };
}

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
}
