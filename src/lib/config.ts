import type { BusinessConfig, Product } from '@/types';

export const businessConfig: BusinessConfig = {
  name: 'Store 261',
  tagline: 'Quality Products, Direct to You',
  phone: '261382304974',           // Real WhatsApp number
  messengerUsername: 'store261',
  email: 'contact@store261.mg',   // PLACEHOLDER
  address: 'Rue Ranarivelo, Antananarivo, Madagascar, 101',
  socialLinks: {
    facebook: 'https://www.facebook.com/store261',
    whatsapp: 'https://wa.me/261382304974',
  },
};

// Contact message generators
export function generateWhatsAppLink(product: Product): string {
  const message = encodeURIComponent(
    `Bonjour, je souhaite commander le produit : ${product.name} (${product.price} ${product.currency}). Ce produit est-il toujours disponible ?`
  );
  return `https://wa.me/${businessConfig.phone}?text=${message}`;
}

export function generateMessengerLink(product: Product): string {
  const message = encodeURIComponent(
    `Bonjour, je souhaite commander le produit : ${product.name} (${product.price} ${product.currency}). Ce produit est-il toujours disponible ?`
  );
  return `https://m.me/${businessConfig.messengerUsername}?text=${message}`;
}

