import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, HelpCircle } from 'lucide-react';
import ProductGallery from '@/components/products/ProductGallery';
import ContactButtons from '@/components/products/ContactButtons';
import ProductBadge from '@/components/products/ProductBadge';
import ProductGrid from '@/components/products/ProductGrid';
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/repository';
import { formatPrice } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return { title: 'Produit non trouvé' };
  }

  return constructMetadata({
    title: product.name,
    description: product.shortDescription,
    image: product.images[0].url,
    url: `https://store261.mg/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product, 4);

  // Format Category name
  const categoryName = product.categorySlug === 'iphones'
    ? 'iPhones'
    : product.categorySlug === 'android'
    ? 'Android'
    : product.categorySlug === 'electronics'
    ? 'Accessoires'
    : product.categorySlug === 'fashion'
    ? 'Mode'
    : product.categorySlug === 'home'
    ? 'Maison'
    : 'Beauté';

  // Structured Data (JSON-LD)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Store 261',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pt-36 space-y-12">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-neutral-500 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-brand-dark transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link href="/products" className="hover:text-brand-dark transition-colors">
          Produits
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-brand-dark transition-colors"
        >
          {categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
        <span className="text-neutral-400 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Back button link */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-brand-dark transition-colors focus-visible:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>
      </div>

      {/* Product Detail Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Gallery section */}
        <div className="animate-fade-up">
          <ProductGallery images={product.images} />
        </div>

        {/* Product information details */}
        <div className="space-y-6 animate-fade-up">
          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="text-xs uppercase tracking-widest font-semibold text-brand-gold bg-brand-gold/5 px-2.5 py-0.5 rounded-lg border border-brand-gold/10 hover:bg-brand-gold/10 transition-colors"
            >
              {categoryName}
            </Link>
            <ProductBadge status={product.status} />
            {product.isNew && <ProductBadge isNew={true} />}
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-brand-dark leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="py-3 border-y border-neutral-100 flex items-center justify-between">
            <span className="font-bold text-2xl text-brand-dark">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-300" />
              Taxe incluse, hors livraison
            </span>
          </div>

          {/* Long Description */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-wider font-bold text-neutral-400">Description</h2>
            <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-500 rounded-lg font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action CTAs Buttons */}
          <div className="pt-6">
            <ContactButtons product={product} />
          </div>

        </div>
      </div>

      {/* Related Products Strip */}
      {relatedProducts.length > 0 && (
        <section className="pt-16 border-t border-neutral-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-2xl text-brand-dark">Articles Similaires</h2>
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="text-xs font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              Voir plus dans {categoryName} →
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}

    </div>
  );
}
