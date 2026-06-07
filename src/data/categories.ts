import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat_iphones',
    slug: 'iphones',
    name: 'iPhones',
    description: 'Sélection d\'iPhones Apple de dernière génération, neufs et reconditionnés de qualité.',
    imageUrl: 'https://picsum.photos/seed/cat_iphones/800/600',
  },
  {
    id: 'cat_android',
    slug: 'android',
    name: 'Téléphones Android',
    description: 'Smartphones Android de grandes marques (Samsung, Xiaomi, Pixel) pour tous les budgets.',
    imageUrl: 'https://picsum.photos/seed/cat_android/800/600',
  },
  {
    id: 'cat_electronics',
    slug: 'electronics',
    name: 'Accessoires',
    description: 'High-quality chargers, cables, audio accessories, and smart devices.',
    imageUrl: 'https://picsum.photos/seed/cat_electronics/800/600',
  },
  {
    id: 'cat_fashion',
    slug: 'fashion',
    name: 'Fashion & Clothing',
    description: 'Trendy wear and accessories to match your unique everyday style.',
    imageUrl: 'https://picsum.photos/seed/cat_fashion/800/600',
  },
  {
    id: 'cat_home',
    slug: 'home',
    name: 'Home & Living',
    description: 'Essential kitchenware, cozy decorations, and tools for your household.',
    imageUrl: 'https://picsum.photos/seed/cat_home/800/600',
  },
  {
    id: 'cat_beauty',
    slug: 'beauty',
    name: 'Beauty & Personal Care',
    description: 'Nourishing skincare, cosmetics, and self-care essentials for everyone.',
    imageUrl: 'https://picsum.photos/seed/cat_beauty/800/600',
  },
];
