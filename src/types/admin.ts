export type Tab = 'home' | 'pricing' | 'portfolio';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  category: string;
  storagePath?: string;
}

export interface HomeData {
  heroTitle: string;
  heroSubtitle: string;
  heroVideoUrl: string;
  heroImageUrl: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutImageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  storagePath?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  storagePath?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  storagePath?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  storagePath?: string;
}

export interface PricingPackage {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  prices: { label: string; price: string }[];
  features?: string[];
  order: number;
}
