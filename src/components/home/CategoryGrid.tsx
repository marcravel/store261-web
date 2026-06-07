import Link from 'next/link';
import Image from 'next/image';
import type { Category } from '@/types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.slice(0, 4).map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative h-72 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm block transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          {/* Category image overlay */}
          <div className="absolute inset-0 z-0 bg-neutral-900">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center opacity-70 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Vignette Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

          {/* Text details */}
          <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end h-full text-white space-y-2">
            <h3 className="font-display font-bold text-xl group-hover:text-brand-gold transition-colors leading-tight">
              {category.name}
            </h3>
            
            <p className="text-neutral-300 text-xs font-light line-clamp-2 leading-relaxed">
              {category.description}
            </p>

            {category.productCount !== undefined && (
              <span className="text-[10px] text-brand-gold font-semibold tracking-wider uppercase pt-1">
                {category.productCount} {category.productCount > 1 ? 'articles' : 'article'}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
