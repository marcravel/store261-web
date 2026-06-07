/**
 * src/lib/repository.ts — All data access for Store261
 *
 * This is the ONLY file that calls `prisma`. UI components and page routes
 * must never import from @prisma/client or src/generated/ directly.
 *
 * All functions return the app's own TypeScript interfaces (Product, Category),
 * NOT raw Prisma model types. The private `mapProduct` and `mapCategory`
 * helpers perform the conversion at the boundary.
 */

import type { Product, Category, ProductStatus } from '@/types';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

// ── Internal query helpers for type inference ──────────────────────────────────────

// Used only to derive the inferred return type of the product query.
// Prisma 7 GetPayload lives on the model file, not the Prisma namespace;
// inferring from ReturnType is simpler and always stays in sync.
const _productQuery = () =>
  prisma.product.findFirst({ include: { images: true } });

type ProductWithImages = NonNullable<Awaited<ReturnType<typeof _productQuery>>>;

const _categoryQuery = () =>
  prisma.category.findFirst({ include: { _count: { select: { products: true } } } });

type CategoryWithCount = NonNullable<Awaited<ReturnType<typeof _categoryQuery>>>;

// ── Mapper functions ───────────────────────────────────────────────────────────

/**
 * Maps a Prisma product row (with images) to the app's Product interface.
 * Converts the Decimal `price` field to a plain number for UI consumption.
 */
function mapProduct(p: ProductWithImages): Product {
  return {
    id:               p.id,
    slug:             p.slug,
    name:             p.name,
    shortDescription: p.shortDescription,
    description:      p.description,
    // Prisma stores price as Decimal; convert to number for Intl.NumberFormat.
    price:            Number(p.price),
    currency:         p.currency,
    images:           p.images
      .sort((a, b) => a.position - b.position)
      .map((img) => ({
        url:       img.url,
        alt:       img.alt,
        isPrimary: img.isPrimary,
      })),
    categorySlug:     p.categorySlug,
    tags:             p.tags,
    isFeatured:       p.isFeatured,
    isNew:            p.isNew,
    // The DB enum values match the app ProductStatus union exactly.
    status:           p.status as ProductStatus,
    createdAt:        p.createdAt.toISOString(),
  };
}

/**
 * Maps a Prisma category row (with _count) to the app's Category interface.
 */
function mapCategory(c: CategoryWithCount): Category {
  return {
    id:           c.id,
    slug:         c.slug,
    name:         c.name,
    description:  c.description,
    imageUrl:     c.imageUrl,
    productCount: c._count.products,
  };
}

// ── Filter options ───────────────────────────────────────────────────────────

export interface ProductFilterOptions {
  categorySlug?: string;
  search?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  status?: string;
  sortBy?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest';
}

// ── Product queries ──────────────────────────────────────────────────────────

/**
 * Returns all products, optionally filtered and sorted.
 * Always fetches the nested `images` relation.
 */
export async function getAllProducts(filters?: ProductFilterOptions): Promise<Product[]> {
  // Build the Prisma `where` clause from the filter options.
  const where: Prisma.ProductWhereInput = {};

  if (filters?.categorySlug) {
    where.categorySlug = { equals: filters.categorySlug, mode: 'insensitive' };
  }

  if (filters?.search) {
    const q = filters.search;
    where.OR = [
      { name:             { contains: q, mode: 'insensitive' } },
      { shortDescription: { contains: q, mode: 'insensitive' } },
      { description:      { contains: q, mode: 'insensitive' } },
      { tags:             { has: q } },
    ];
  }

  if (filters?.isFeatured !== undefined) {
    where.isFeatured = filters.isFeatured;
  }

  if (filters?.isNew !== undefined) {
    where.isNew = filters.isNew;
  }

  if (filters?.status) {
    where.status = filters.status as ProductStatus;
  }

  // Build the `orderBy` clause.
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
  switch (filters?.sortBy) {
    case 'name_asc':   orderBy = { name: 'asc' };       break;
    case 'name_desc':  orderBy = { name: 'desc' };      break;
    case 'price_asc':  orderBy = { price: 'asc' };      break;
    case 'price_desc': orderBy = { price: 'desc' };     break;
    case 'newest':     orderBy = { createdAt: 'desc' }; break;
  }

  const rows = await prisma.product.findMany({
    where,
    orderBy,
    include: { images: true },
  });

  return rows.map(mapProduct);
}

/**
 * Returns a single product by its URL slug, or null if not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where:   { slug },
    include: { images: true },
  });
  return row ? mapProduct(row) : null;
}

/**
 * Returns featured products, optionally capped at `limit`.
 */
export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where:   { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take:    limit,
    include: { images: true },
  });
  return rows.map(mapProduct);
}

/**
 * Returns products in the same category, excluding the reference product.
 */
export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: {
      categorySlug: product.categorySlug,
      NOT: { id: product.id },
    },
    take:    limit,
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  });
  return rows.map(mapProduct);
}

/**
 * Full-text search across product name, description, and tags.
 */
export async function searchProducts(query: string): Promise<Product[]> {
  return getAllProducts({ search: query });
}

// ── Category queries ─────────────────────────────────────────────────────────

/**
 * Returns all categories with their live product counts, ordered by the
 * explicit `sortOrder` field so the DB controls display priority.
 */
export async function getAllCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  return rows.map(mapCategory);
}

/**
 * Returns a single category by its URL slug with its live product count, or null if not found.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const row = await prisma.category.findUnique({
    where:   { slug },
    include: { _count: { select: { products: true } } },
  });
  return row ? mapCategory(row) : null;
}
