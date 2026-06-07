import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  className?: string;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  className = '',
  emptyMessage = 'Aucun produit ne correspond à vos critères.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed border-neutral-100 rounded-2xl bg-neutral-50/50">
        <p className="text-neutral-500 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 md:gap-8 ${className}`}>
      {products.map((product) => (
        <div key={product.id} className="animate-fade-up">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
