export type ProductStatus = 'available' | 'limited' | 'out_of_stock';

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  slug: string;                    // URL-safe unique identifier
  name: string;
  shortDescription: string;        // Used in cards (max 120 chars)
  description: string;             // Full markdown-compatible description
  price: number;
  currency: string;                // e.g. "MGA", "USD", "EUR"
  images: ProductImage[];
  categorySlug: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  status: ProductStatus;
  createdAt: string;               // ISO date string
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount?: number;           // Populated at build time
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  phone: string;                   // WhatsApp number in international format (no +)
  messengerUsername: string;       // Facebook page username
  email: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram?: string;
    whatsapp: string;
  };
}
