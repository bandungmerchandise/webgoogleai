export type PageId = 'home' | 'katalog' | 'custom-studio' | 'kenapa-bdgmerch' | 'faq';

export interface SiteConfig {
  brand_name: string;
  tagline: string;
  logo_url?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  announcement_enabled?: boolean;
  announcement_badge?: string;
  announcement_text?: string;
  announcement_link_text?: string;
  announcement_link_url?: string;
  instagram_handle?: string;
  instagram_url?: string;
}

export interface ProductItem {
  id: string;
  category: 'apparel' | 'rubber' | 'accessories' | 'bags' | 'headwear' | 'packaging';
  categoryLabel: string;
  name: string;
  moq: string;
  leadTime?: string;
  priceRange?: string;
  price?: string | number;
  description: string;
  features?: string[];
  badge?: string;
  tagline?: string;
  image_url?: string;
}

export interface CategoryConfig {
  id: string;
  name: string;
  shortTitle: string;
  tag: string;
  description: string;
  iconName: 'Shirt' | 'Layers' | 'Award' | 'ShoppingBag' | 'CircleDot' | 'Package';
  specs: string[];
  sampleMoq: string;
  popularItems: string;
  images?: string[];
}

export interface ClientLogoItem {
  id: string;
  client_name: string;
  logo_url: string;
  display_order?: number;
  size_scale?: 'small' | 'medium' | 'large';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  display_order?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  caption?: string;
  client_name?: string;
  post_url?: string;
  display_order?: number;
  likes_count?: number | string;
}
