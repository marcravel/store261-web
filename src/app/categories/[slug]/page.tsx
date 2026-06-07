import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import ProductGrid from '@/components/products/ProductGrid';
import { getCategoryBySlug, getAllProducts, getAllCategories } from '@/lib/repository';
import { constructMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return { title: 'Catégorie non trouvée' };
  }

  return constructMetadata({
    title: `${category.name} | Nos Articles`,
    description: category.description,
    image: category.imageUrl,
    url: `https://store261.mg/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  // Fetch all products matching this category
  const products = await getAllProducts({ categorySlug: category.slug });

  return (
    <div className="space-y-10 pb-20">
      {/* Category Hero Banner */}
      <PageHero
        title={category.name}
        description={category.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-up">
        {/* Back link to general catalog */}
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-brand-dark transition-colors focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir tout le catalogue
          </Link>
          
          <span className="text-sm text-neutral-500 font-medium">
            {products.length} {products.length > 1 ? 'articles disponibles' : 'article disponible'}
          </span>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          emptyMessage="Aucun produit n'est actuellement disponible dans cette catégorie."
        />
      </div>
    </div>
  );
}
