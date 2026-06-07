import Link from 'next/link';
import Image from 'next/image';
import ProductBadge from './ProductBadge';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
  className?: string;
}

export default function ProductCard({
  product,
  showCategory = true,
  className = '',
}: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  
  // Format the category label
  const categoryLabel = product.categorySlug === 'iphones'
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

  return (
    <div className={`group bg-white rounded-xl xs:rounded-2xl overflow-hidden border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col h-full ${className}`}>
      
      {/* Product Image and Badges */}
      <Link href={`/products/${product.slug}`} className="relative block aspect-[3/4] w-full bg-neutral-50 overflow-hidden">
        {/* Badges container */}
        <div className="absolute top-1.5 left-1.5 xs:top-3 xs:left-3 z-10 flex flex-col gap-1 items-start">
          {product.isNew && <ProductBadge isNew={true} />}
          {product.isFeatured && !product.isNew && <ProductBadge isFeatured={true} />}
          {product.status !== 'available' && <ProductBadge status={product.status} />}
        </div>
        
        {/* Actual Image */}
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt || product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          priority={product.isFeatured}
        />
      </Link>

      {/* Product Information */}
      <div className="p-2.5 xs:p-4 sm:p-5 flex flex-col flex-grow space-y-0.5 xs:space-y-1 sm:space-y-2">
        {showCategory && (
          <span className="text-[8px] xs:text-[10px] uppercase tracking-wider font-semibold text-neutral-400">
            {categoryLabel}
          </span>
        )}
        
        <h3 className="font-display font-bold text-xs xs:text-sm sm:text-base md:text-lg text-brand-dark leading-snug group-hover:text-brand-gold transition-colors line-clamp-2">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>
        
        <p className="text-neutral-500 text-xs sm:text-sm line-clamp-2 leading-relaxed flex-grow hidden sm:block">
          {product.shortDescription}
        </p>

        {/* Pricing */}
        <div className="flex flex-row items-center justify-between pt-1 xs:pt-2 border-t border-neutral-50 gap-1 mt-auto">
          <span className="font-bold text-lg xs:text-xl text-brand-gold">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
