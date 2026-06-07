'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types';

interface ProductFilterProps {
  categories: Category[];
}

export default function ProductFilter({ categories }: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // URL state helpers
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'newest';

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Track the last value we pushed to the URL so the debounce effect can
  // compare against it without needing to read currentSearch as a dependency,
  // which would otherwise require a sync setState-in-effect.
  const lastPushedSearch = useRef(currentSearch);

  // Push filter updates to URL
  const updateUrlParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === 'all' || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // Debounced search: only push to URL when the typed value differs from the
  // last value we already committed. Using a ref avoids a setState-in-effect.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== lastPushedSearch.current) {
        lastPushedSearch.current = searchTerm;
        updateUrlParams({ q: searchTerm });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, updateUrlParams]);

  const handleCategoryChange = (val: string | null) => {
    updateUrlParams({ category: val });
  };

  const handleSortChange = (val: string | null) => {
    updateUrlParams({ sort: val });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = currentCategory !== 'all' || currentSearch !== '' || currentSort !== 'newest';

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-50">
        <div className="flex items-center gap-2 font-semibold text-brand-dark">
          <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
          <span>Filtres</span>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-xs text-neutral-500 hover:text-brand-dark h-8 px-2.5 rounded-lg gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search text input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 border-neutral-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/25 rounded-xl shadow-none"
          />
        </div>

        {/* Category selector */}
        <div>
          <Select value={currentCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-11 border-neutral-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/25 rounded-xl shadow-none">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort selector */}
        <div>
          <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger className="h-11 border-neutral-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/25 rounded-xl shadow-none">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="newest">Nouveautés</SelectItem>
              <SelectItem value="price_asc">Prix : croissant</SelectItem>
              <SelectItem value="price_desc">Prix : décroissant</SelectItem>
              <SelectItem value="name_asc">Nom : A-Z</SelectItem>
              <SelectItem value="name_desc">Nom : Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
