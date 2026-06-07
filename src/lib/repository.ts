import { products } from '@/data/products';
import { categories } from '@/data/categories';
import type { Product, Category } from '@/types';

export interface ProductFilterOptions {
  categorySlug?: string;
  search?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  status?: string;
  sortBy?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest';
}

/**
 * Simulates an async delay to mimic a real database query.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAllProducts(filters?: ProductFilterOptions): Promise<Product[]> {
  await delay(50); // Simulate network latency
  let result = [...products];

  if (filters) {
    if (filters.categorySlug) {
      result = result.filter((p) => p.categorySlug.toLowerCase() === filters.categorySlug?.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.isFeatured !== undefined) {
      result = result.filter((p) => p.isFeatured === filters.isFeatured);
    }

    if (filters.isNew !== undefined) {
      result = result.filter((p) => p.isNew === filters.isNew);
    }

    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name_asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'price_asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(50);
  const found = products.find((p) => p.slug === slug);
  return found || null;
}

export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  await delay(50);
  const featured = products.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
}

export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  await delay(50);
  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  return related.slice(0, limit);
}

export async function getAllCategories(): Promise<Category[]> {
  await delay(50);
  // Dynamically calculate the productCount for each category at load time
  return categories.map((cat) => {
    const productCount = products.filter((p) => p.categorySlug === cat.slug).length;
    return {
      ...cat,
      productCount,
    };
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await delay(50);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return null;
  const productCount = products.filter((p) => p.categorySlug === cat.slug).length;
  return {
    ...cat,
    productCount,
  };
}

export async function searchProducts(query: string): Promise<Product[]> {
  return getAllProducts({ search: query });
}
