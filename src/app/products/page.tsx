import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import ProductFilter from '@/components/products/ProductFilter';
import ProductGrid from '@/components/products/ProductGrid';
import { getAllProducts, getAllCategories } from '@/lib/repository';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 60; // Revalidate dynamic catalog static pages at most once per minute

interface PageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
    sort?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest';
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const categoryName = resolvedParams.category
    ? resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1)
    : 'Tous les produits';

  return constructMetadata({
    title: `${categoryName} | Notre Catalogue`,
    description: `Parcourez nos articles de la catégorie ${categoryName}. Contactez-nous pour passer commande.`,
    url: `https://store261.mg/products${resolvedParams.category ? `?category=${resolvedParams.category}` : ''}`,
  });
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  
  // Extract search/filter criteria from parameters
  const categorySlug = resolvedParams.category === 'all' ? undefined : resolvedParams.category;
  const search = resolvedParams.q;
  const sortBy = resolvedParams.sort;

  const [products, categories] = await Promise.all([
    getAllProducts({
      categorySlug,
      search,
      sortBy,
    }),
    getAllCategories(),
  ]);

  return (
    <div className="space-y-10 pb-20">
      {/* Page header */}
      <PageHero
        title="Notre Catalogue"
        description="Parcourez notre collection d'articles sélectionnés pour leur rapport qualité-prix exceptionnel."
      />

      {/* Catalog Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-up">
        {/* Filters bar */}
        <ProductFilter categories={categories} />

        {/* Counter and Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm text-neutral-500 font-medium">
            <span>
              {products.length} {products.length > 1 ? 'produits trouvés' : 'produit trouvé'}
            </span>
          </div>

          {/* Results grid */}
          <ProductGrid
            products={products}
            emptyMessage="Aucun produit ne correspond à vos filtres de recherche. Essayez d'autres mots-clés ou réinitialisez les filtres."
          />
        </div>
      </div>
    </div>
  );
}
