/**
 * prisma/seed.ts — Store261 database seed
 *
 * Imports the legacy static data arrays and writes them to PostgreSQL in the
 * correct dependency order: Categories → Products (with nested Images).
 *
 * Usage:
 *   npx prisma db seed          ← recommended (via package.json prisma.seed)
 *   tsx prisma/seed.ts          ← direct run (requires DATABASE_URL in .env)
 */

import { PrismaClient } from '../src/generated/prisma/client';
import { categories } from '../src/data/categories';
import { products } from '../src/data/products';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱  Starting Store261 database seed…');

  // ── Wipe existing data in reverse FK order (idempotent re-runs) ─────────────
  const deletedImages = await prisma.productImage.deleteMany();
  const deletedProducts = await prisma.product.deleteMany();
  const deletedCategories = await prisma.category.deleteMany();
  console.log(
    `🗑️   Cleared: ${deletedImages.count} images, ` +
    `${deletedProducts.count} products, ` +
    `${deletedCategories.count} categories`,
  );

  // ── Step 1: Seed categories ────────────────────────────────────────────────
  // Must run before products because Product.categoryId is a FK to Category.id
  for (const cat of categories) {
    await prisma.category.create({
      data: {
        id:          cat.id,
        slug:        cat.slug,
        name:        cat.name,
        description: cat.description,
        imageUrl:    cat.imageUrl,
      },
    });
  }
  console.log(`✅  Seeded ${categories.length} categories`);

  // ── Step 2: Build a slug → id lookup to resolve the FK for each product ───
  // The legacy TypeScript data references categories by slug (categorySlug),
  // but the DB schema requires a categoryId (FK). This map bridges the two.
  const categoryIdBySlug = new Map<string, string>(
    categories.map((c) => [c.slug, c.id]),
  );

  // ── Step 3: Seed products with their nested images ────────────────────────
  for (const product of products) {
    const categoryId = categoryIdBySlug.get(product.categorySlug);

    if (!categoryId) {
      // Hard-fail so the seed never inserts orphaned products.
      throw new Error(
        `Unknown categorySlug "${product.categorySlug}" on product "${product.id}". ` +
        'Ensure every product.categorySlug matches a value in categories.',
      );
    }

    await prisma.product.create({
      data: {
        id:               product.id,
        slug:             product.slug,
        name:             product.name,
        shortDescription: product.shortDescription,
        description:      product.description,
        price:            product.price,
        currency:         product.currency,
        categoryId,
        // Denormalised slug kept for fast slug-based lookups without a join.
        categorySlug:     product.categorySlug,
        tags:             product.tags,
        isFeatured:       product.isFeatured,
        isNew:            product.isNew,
        status:           product.status,
        // Preserve the original creation timestamp from the static data.
        createdAt:        new Date(product.createdAt),
        // Nested create — inserts ProductImage rows in the same transaction.
        images: {
          create: product.images.map((img, index) => ({
            url:       img.url,
            alt:       img.alt,
            isPrimary: img.isPrimary ?? false,
            // position preserves array order for deterministic display.
            position:  index,
          })),
        },
      },
    });
  }

  const totalImages = products.reduce((sum, p) => sum + p.images.length, 0);
  console.log(`✅  Seeded ${products.length} products and ${totalImages} images`);
  console.log('🎉  Database seed complete!');
}

main()
  .catch((error: unknown) => {
    console.error('❌  Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
