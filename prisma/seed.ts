/**
 * prisma/seed.ts — Store261 database seed
 *
 * All seed data is inlined here. The legacy src/data/ directory was removed
 * once the repository layer was wired to Prisma. This file is the canonical
 * source of initial data for the database.
 *
 * Usage:
 *   npx prisma db seed          ← recommended (via prisma.config.ts seed command)
 *   tsx prisma/seed.ts          ← direct run (requires DATABASE_URL in .env)
 */

import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Prisma 7 requires an explicit driver adapter — DATABASE_URL is no longer
// read automatically from the environment by the new prisma-client generator.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// ── Seed data ─────────────────────────────────────────────────────────────────

/**
 * Category seed data with explicit sortOrder values.
 * iPhones and Android are prioritised (1, 2) as the primary product lines.
 * Remaining categories follow in logical display order.
 */
const categories = [
  {
    id: 'cat_iphones',
    slug: 'iphones',
    name: 'iPhones',
    description: "Sélection d'iPhones Apple de dernière génération, neufs et reconditionnés de qualité.",
    imageUrl: 'https://picsum.photos/seed/cat_iphones/800/600',
    sortOrder: 1,
  },
  {
    id: 'cat_android',
    slug: 'android',
    name: 'Téléphones Android',
    description: 'Smartphones Android de grandes marques (Samsung, Xiaomi, Pixel) pour tous les budgets.',
    imageUrl: 'https://picsum.photos/seed/cat_android/800/600',
    sortOrder: 2,
  },
  {
    id: 'cat_electronics',
    slug: 'electronics',
    name: 'Accessoires',
    description: 'High-quality chargers, cables, audio accessories, and smart devices.',
    imageUrl: 'https://picsum.photos/seed/cat_electronics/800/600',
    sortOrder: 3,
  },
  {
    id: 'cat_fashion',
    slug: 'fashion',
    name: 'Fashion & Clothing',
    description: 'Trendy wear and accessories to match your unique everyday style.',
    imageUrl: 'https://picsum.photos/seed/cat_fashion/800/600',
    sortOrder: 4,
  },
  {
    id: 'cat_home',
    slug: 'home',
    name: 'Home & Living',
    description: 'Essential kitchenware, cozy decorations, and tools for your household.',
    imageUrl: 'https://picsum.photos/seed/cat_home/800/600',
    sortOrder: 5,
  },
  {
    id: 'cat_beauty',
    slug: 'beauty',
    name: 'Beauty & Personal Care',
    description: 'Nourishing skincare, cosmetics, and self-care essentials for everyone.',
    imageUrl: 'https://picsum.photos/seed/cat_beauty/800/600',
    sortOrder: 6,
  },
] as const;

type SeedProduct = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  currency: string;
  categorySlug: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  status: 'available' | 'limited' | 'out_of_stock';
  createdAt: string;
  images: { url: string; alt: string; isPrimary?: boolean }[];
};

const products: SeedProduct[] = [
  // ── iPhones ──────────────────────────────────────────────────────────────────
  {
    id: 'prod_iphone_15_pro',
    slug: 'iphone-15-pro-128gb',
    name: 'iPhone 15 Pro 128GB',
    shortDescription: "Le dernier né d'Apple avec châssis en titane, puce A17 Pro et appareil photo exceptionnel.",
    description: "Bénéficiez du fleuron d'Apple. L'iPhone 15 Pro est doté d'un design en titane de qualité aérospatiale, léger et robuste, ainsi que du bouton Action personnalisable. La puce A17 Pro révolutionnaire redéfinit les performances graphiques mobiles. Système photo puissant avec un capteur principal de 48 Mpx pour des clichés d'une netteté incroyable.",
    price: 4800000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_iphone_15_pro/800/600', alt: 'iPhone 15 Pro dos en titane', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_iphone_15_pro-2/800/600', alt: 'iPhone 15 Pro en main' },
    ],
    categorySlug: 'iphones',
    tags: ['apple', 'iphone', 'ios', 'smartphone'],
    isFeatured: true,
    isNew: true,
    status: 'available',
    createdAt: '2026-06-01T08:00:00Z',
  },
  {
    id: 'prod_iphone_14',
    slug: 'iphone-14-128gb',
    name: 'iPhone 14 128GB',
    shortDescription: 'Smartphone Apple puissant avec double appareil photo, détection des accidents et autonomie longue durée.',
    description: "L'iPhone 14 est doté d'un écran Super Retina XDR de 6,1 pouces, d'un système photo avancé pour des photos exceptionnelles sous tous les éclairages, et de la puce A15 Bionic ultra-rapide avec GPU à 5 cœurs. Conçu pour durer avec le Ceramic Shield.",
    price: 3500000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_iphone_14/800/600', alt: 'iPhone 14 violet', isPrimary: true },
    ],
    categorySlug: 'iphones',
    tags: ['apple', 'iphone', 'ios', 'smartphone'],
    isFeatured: true,
    isNew: false,
    status: 'available',
    createdAt: '2026-05-10T10:00:00Z',
  },
  // ── Android ──────────────────────────────────────────────────────────────────
  {
    id: 'prod_galaxy_s24_ultra',
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    shortDescription: 'Le smartphone Android ultime avec Galaxy AI, stylet S Pen intégré et capteur 200 Mpx.',
    description: "Entrez dans l'ère de l'intelligence artificielle mobile avec le Samsung Galaxy S24 Ultra. Son capteur photo de 200 Mpx capture des détails époustouflants de jour comme de nuit. Doté d'un cadre en titane ultra-résistant, d'un écran plat de 6,8 pouces extrêmement lumineux et du stylet S Pen intégré pour une productivité décuplée.",
    price: 5200000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_galaxy_s24_ultra/800/600', alt: 'Samsung Galaxy S24 Ultra noir', isPrimary: true },
    ],
    categorySlug: 'android',
    tags: ['samsung', 'galaxy', 'android', 'smartphone'],
    isFeatured: true,
    isNew: true,
    status: 'available',
    createdAt: '2026-05-28T09:00:00Z',
  },
  {
    id: 'prod_redmi_note_13_pro',
    slug: 'xiaomi-redmi-note-13-pro-5g',
    name: 'Xiaomi Redmi Note 13 Pro 5G',
    shortDescription: 'Excellent rapport qualité-prix avec écran AMOLED 120Hz et appareil photo 200 Mpx.',
    description: "Xiaomi frappe fort avec le Redmi Note 13 Pro. Équipé d'un capteur photo principal de 200 Mpx avec stabilisateur optique, d'un superbe écran AMOLED 1,5K à 120Hz et d'une batterie haute capacité de 5100 mAh avec charge turbo 67W. Un smartphone complet et performant à prix compétitif.",
    price: 1600000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_redmi_note_13_pro/800/600', alt: 'Xiaomi Redmi Note 13 Pro', isPrimary: true },
    ],
    categorySlug: 'android',
    tags: ['xiaomi', 'redmi', 'android', 'smartphone'],
    isFeatured: true,
    isNew: false,
    status: 'available',
    createdAt: '2026-04-18T14:00:00Z',
  },
  // ── Electronics / Accessoires ─────────────────────────────────────────────────
  {
    id: 'prod_bt_headphones',
    slug: 'ecouteurs-bluetooth-pro',
    name: 'Écouteurs Bluetooth Pro',
    shortDescription: 'Écouteurs sans fil avec réduction active du bruit, autonomie 30h et son Hi-Fi.',
    description: "Plongez dans votre musique sans distraction. Ces écouteurs Bluetooth Pro offrent une réduction de bruit active (ANC) de qualité studio et une restitution sonore Hi-Fi avec drivers 40mm. La batterie longue durée assure 30 heures d'écoute continue, et l'étui de rechargement ajoute 20 heures supplémentaires.",
    price: 180000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_bt_headphones/800/600', alt: 'Écouteurs Bluetooth Pro noir', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_bt_headphones-2/800/600', alt: 'Écouteurs sur oreille côté droit' },
    ],
    categorySlug: 'electronics',
    tags: ['audio', 'bluetooth', 'ecouteurs', 'anc'],
    isFeatured: true,
    isNew: false,
    status: 'available',
    createdAt: '2026-04-15T09:30:00Z',
  },
  {
    id: 'prod_power_bank',
    slug: 'batterie-externe-20000mah',
    name: 'Batterie Externe 20 000 mAh',
    shortDescription: 'Power bank ultra-compact avec charge rapide 65W USB-C pour plusieurs recharges.',
    description: "Ne tombez plus jamais en panne de batterie. Cette batterie externe de 20 000 mAh intègre la charge rapide 65W via USB-C (Power Delivery), permettant de recharger un laptop en moins d'une heure. Compatible avec tous les smartphones, tablettes et laptops modernes. Format slim glissable dans une poche.",
    price: 95000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_power_bank/800/600', alt: 'Batterie externe blanche 20000mAh', isPrimary: true },
    ],
    categorySlug: 'electronics',
    tags: ['batterie', 'chargeur', 'usb-c', 'voyage'],
    isFeatured: false,
    isNew: true,
    status: 'available',
    createdAt: '2026-05-22T11:00:00Z',
  },
  {
    id: 'prod_smartwatch',
    slug: 'montre-connectee-sport-pro',
    name: 'Montre Connectée Sport Pro',
    shortDescription: 'Montre intelligente GPS multi-sport avec ECG, SpO2 et autonomie 14 jours.',
    description: "Suivez chaque aspect de votre santé et de vos performances sportives. Cette montre connectée propose plus de 100 modes sportifs, un GPS intégré pour vos runs et randonnées, un suivi continu de la fréquence cardiaque et de la saturation en oxygène (SpO2), ainsi qu'un électrocardiogramme (ECG). Écran AMOLED toujours actif.",
    price: 320000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_smartwatch/800/600', alt: 'Montre connectée sport affichant les données', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_smartwatch-2/800/600', alt: 'Bracelet silicone de la montre connectée' },
    ],
    categorySlug: 'electronics',
    tags: ['montre', 'sport', 'connecté', 'gps'],
    isFeatured: false,
    isNew: false,
    status: 'available',
    createdAt: '2026-03-28T16:00:00Z',
  },
  // ── Fashion ──────────────────────────────────────────────────────────────────
  {
    id: 'prod_sneakers',
    slug: 'sneakers-urban-runner',
    name: 'Sneakers Urban Runner',
    shortDescription: 'Baskets légères à semelle EVA et tige en mesh respirant pour un confort au quotidien.',
    description: "Un style urbain qui ne compromet pas le confort. Les Sneakers Urban Runner sont équipées d'une tige en mesh ultra-respirante pour garder vos pieds au frais et d'une semelle EVA haute densité qui absorbe les chocs efficacement. Disponibles en plusieurs coloris. Semelle antidérapante pour toutes les surfaces.",
    price: 150000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_sneakers/800/600', alt: 'Sneakers Urban Runner blanc et gris', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_sneakers-2/800/600', alt: 'Détail semelle des sneakers' },
    ],
    categorySlug: 'fashion',
    tags: ['chaussures', 'sport', 'mode'],
    isFeatured: false,
    isNew: true,
    status: 'available',
    createdAt: '2026-05-30T12:00:00Z',
  },
  {
    id: 'prod_tshirt',
    slug: 'tshirt-premium-oversize',
    name: 'T-Shirt Premium Oversize',
    shortDescription: "T-shirt oversize 100% coton biologique avec col rond renforcé et coupe décontractée.",
    description: "La base parfaite de tout dressing moderne. Ce t-shirt oversize est taillé dans un coton biologique 220g/m² particulièrement doux et résistant. La coupe ample et les épaules légèrement tombantes lui confèrent cette allure streetwear intemporelle. Coutures renforcées pour une longévité maximale. Lavage à 30°.",
    price: 45000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_tshirt/800/600', alt: "T-shirt blanc oversize porté par un mannequin", isPrimary: true },
    ],
    categorySlug: 'fashion',
    tags: ['vetement', 'tshirt', 'bio', 'streetwear'],
    isFeatured: false,
    isNew: false,
    status: 'available',
    createdAt: '2026-04-02T09:00:00Z',
  },
  // ── Home & Living ─────────────────────────────────────────────────────────────
  {
    id: 'prod_desk_lamp',
    slug: 'lampe-de-bureau-led-tactile',
    name: 'Lampe de Bureau LED Tactile',
    shortDescription: 'Lampe architecturale LED avec 3 températures de couleur, intensité réglable et port USB.',
    description: "Optimisez votre espace de travail avec cette lampe de bureau design. Grâce à son panneau tactile intuitif, ajustez finement les 3 températures de couleur (lumière chaude, neutre, froide) et l'intensité lumineuse. Le port USB intégré charge votre smartphone sans encombrer votre bureau. Bras flexible orientable à 360°.",
    price: 85000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_desk_lamp/800/600', alt: 'Lampe de bureau LED moderne', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_desk_lamp-2/800/600', alt: 'Teinte vue détaillée tactile' },
    ],
    categorySlug: 'home',
    tags: ['luminaire', 'bureau', 'decoration'],
    isFeatured: false,
    isNew: true,
    status: 'available',
    createdAt: '2026-05-18T14:40:00Z',
  },
  {
    id: 'prod_mug_set',
    slug: 'set-de-tasses-a-cafe-en-ceramique',
    name: 'Set de Tasses en Céramique',
    shortDescription: 'Ensemble de 4 tasses en céramique artisanale aux tons pastel avec soucoupes assorties.',
    description: "Savourez votre thé ou votre café dans un contenant d'exception. Ce set de 4 tasses est façonné à la main par des artisans céramistes. Résistant au micro-ondes et au lave-vaisselle. Idéal pour apporter une touche chaleureuse à votre cuisine ou pour offrir.",
    price: 55000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_mug_set/800/600', alt: 'Set de tasses en céramique', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_mug_set-2/800/600', alt: "Tasse chaude tenue par quelqu'un" },
    ],
    categorySlug: 'home',
    tags: ['vaisselle', 'cuisine', 'tasses'],
    isFeatured: false,
    isNew: false,
    status: 'limited',
    createdAt: '2026-03-12T08:50:00Z',
  },
  // ── Beauty & Personal Care ────────────────────────────────────────────────────
  {
    id: 'prod_moisturizer',
    slug: 'creme-hydratante-bio',
    name: 'Crème Hydratante Bio',
    shortDescription: "Crème visage nourrissante à l'aloé vera et huile de jojoba pour peaux sensibles.",
    description: "Prenez soin de votre visage naturellement. Notre formule certifiée biologique hydrate en profondeur tout en respectant l'équilibre naturel de votre peau. Formulée sans parabènes ni parfums de synthèse, à base d'aloé vera frais et d'huile de jojoba pressée à froid.",
    price: 40000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_moisturizer/800/600', alt: 'Pot de crème hydratante', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_moisturizer-2/800/600', alt: 'Texture onctueuse de la crème' },
    ],
    categorySlug: 'beauty',
    tags: ['skincare', 'bio', 'visage'],
    isFeatured: false,
    isNew: true,
    status: 'available',
    createdAt: '2026-05-25T13:20:00Z',
  },
  {
    id: 'prod_hair_trimmer',
    slug: 'tondeuse-a-cheveux-rechargeable',
    name: 'Tondeuse à Cheveux Rechargeable',
    shortDescription: 'Tondeuse professionnelle étanche avec sabots réglables et lames en titane.',
    description: "Réalisez des coupes parfaites à la maison. Cette tondeuse intègre des lames auto-affûtées en titane de haute précision pour une coupe nette sans irritation. Batterie lithium haute performance pour une utilisation sans fil jusqu'à 90 minutes. Livrée avec kit d'entretien complet.",
    price: 110000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_hair_trimmer/800/600', alt: 'Tondeuse à cheveux professionnelle', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_hair_trimmer-2/800/600', alt: 'Accessoires de coiffure' },
    ],
    categorySlug: 'beauty',
    tags: ['grooming', 'homme', 'appareil'],
    isFeatured: false,
    isNew: false,
    status: 'available',
    createdAt: '2026-04-05T07:15:00Z',
  },
  {
    id: 'prod_face_serum',
    slug: 'serum-visage-hydratant-vitamine-c',
    name: 'Sérum Visage Vitamine C',
    shortDescription: "Sérum booster d'éclat hautement concentré pour un teint lumineux et unifié.",
    description: "Illuminez votre teint au quotidien. Ce sérum concentré en Vitamine C et Acide Hyaluronique stimule l'éclat de la peau, atténue les taches pigmentaires et réduit les signes de fatigue. Sa formule légère pénètre instantanément sans laisser de film gras.",
    price: 65000,
    currency: 'MGA',
    images: [
      { url: 'https://picsum.photos/seed/prod_face_serum/800/600', alt: 'Sérum visage flacon compte-gouttes', isPrimary: true },
      { url: 'https://picsum.photos/seed/prod_face_serum-2/800/600', alt: 'Goutte de sérum sur le visage' },
    ],
    categorySlug: 'beauty',
    tags: ['skincare', 'visage', 'serum'],
    isFeatured: false,
    isNew: false,
    status: 'out_of_stock',
    createdAt: '2026-03-20T10:00:00Z',
  },
];

// ── Main seed function ─────────────────────────────────────────────────────────

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

  // ── Step 1: Seed categories with sortOrder ─────────────────────────────────
  // Must run before products because Product.categoryId is a FK to Category.id.
  for (const cat of categories) {
    await prisma.category.create({
      data: {
        id:          cat.id,
        slug:        cat.slug,
        name:        cat.name,
        description: cat.description,
        imageUrl:    cat.imageUrl,
        sortOrder:   cat.sortOrder,
      },
    });
  }
  console.log(`✅  Seeded ${categories.length} categories`);

  // ── Step 2: Build a slug → id lookup to resolve the FK for each product ────
  // categorySlug is the foreign key reference in the seed data; the DB requires
  // a categoryId. This map bridges the two without an extra DB query.
  const categoryIdBySlug = new Map<string, string>(
    categories.map((c) => [c.slug, c.id]),
  );

  // ── Step 3: Seed products with their nested images ─────────────────────────
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
