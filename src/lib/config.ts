import type { BusinessConfig } from '@/types';

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
export function generateWhatsAppLink(productName: string): string {
  const message = encodeURIComponent(
    `Hello! I am interested in this product: *${productName}*. Could you provide more information?`
  );
  return `https://wa.me/${businessConfig.phone}?text=${message}`;
}

export function generateMessengerLink(productName: string): string {
  const message = encodeURIComponent(
    `Hello! I am interested in this product: ${productName}. Could you provide more information?`
  );
  return `https://m.me/${businessConfig.messengerUsername}?text=${message}`;
}
