import ProductCard from '../products/ProductCard';
import type { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <div className="flex overflow-x-auto pb-4 gap-3 px-4 -mx-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 md:gap-8 scrollbar-none snap-x snap-mandatory">
      {products.map((product) => (
        <div key={product.id} className="w-[135px] xs:w-[160px] sm:w-auto shrink-0 snap-start">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
