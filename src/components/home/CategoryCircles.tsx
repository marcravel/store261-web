'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryCirclesProps {
  categories: Category[];
}

export default function CategoryCircles({ categories }: CategoryCirclesProps) {
  return (
    <div className="w-full flex items-center justify-start md:justify-center gap-6 overflow-x-auto scrollbar-hide py-4 px-4">
      {/* "Tout Voir" Circle */}
      <Link
        href="/products"
        className="flex flex-col items-center shrink-0 group focus-visible:outline-none"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
          <ShoppingBag className="w-7 h-7 md:w-9 md:h-9 text-brand-gold group-hover:text-brand-gold/80 transition-colors" />
        </div>
        <span className="text-xs font-semibold text-brand-dark group-hover:text-brand-gold transition-colors mt-2 text-center">
          Tout Voir
        </span>
      </Link>

      {/* Category Circles */}
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.slug}`}
          className="flex flex-col items-center shrink-0 group focus-visible:outline-none"
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-neutral-100 transition-all duration-300 group-hover:scale-105 group-hover:border-brand-gold shadow-sm bg-neutral-50">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 64px, 80px"
              className="object-cover"
            />
          </div>
          <span className="text-xs font-semibold text-brand-dark group-hover:text-brand-gold transition-colors mt-2 text-center">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
