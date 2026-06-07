import { Badge } from '@/components/ui/badge';
import type { ProductStatus } from '@/types';

interface ProductBadgeProps {
  status?: ProductStatus;
  isNew?: boolean;
  isFeatured?: boolean;
  className?: string;
}

export default function ProductBadge({ status, isNew, isFeatured, className = '' }: ProductBadgeProps) {
  if (isNew) {
    return (
      <Badge className={`bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold border-none rounded-md xs:rounded-lg px-1.5 xs:px-2.5 py-0.5 text-[8px] xs:text-xs ${className}`}>
        Nouveau
      </Badge>
    );
  }

  if (isFeatured) {
    return (
      <Badge className={`bg-brand-dark hover:bg-brand-dark/90 text-white font-semibold border border-white/10 rounded-md xs:rounded-lg px-1.5 xs:px-2.5 py-0.5 text-[8px] xs:text-xs ${className}`}>
        En Vedette
      </Badge>
    );
  }

  if (status) {
    switch (status) {
      case 'available':
        return (
          <Badge className={`bg-green-50 text-green-700 hover:bg-green-50 border border-green-200/50 rounded-md xs:rounded-lg px-1.5 xs:px-2.5 py-0.5 text-[8px] xs:text-xs font-medium ${className}`}>
            En Stock
          </Badge>
        );
      case 'limited':
        return (
          <Badge className={`bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200/50 rounded-md xs:rounded-lg px-1.5 xs:px-2.5 py-0.5 text-[8px] xs:text-xs font-medium ${className}`}>
            Série Limitée
          </Badge>
        );
      case 'out_of_stock':
        return (
          <Badge className={`bg-neutral-50 text-neutral-500 hover:bg-neutral-50 border border-neutral-200 rounded-md xs:rounded-lg px-1.5 xs:px-2.5 py-0.5 text-[8px] xs:text-xs font-medium ${className}`}>
            Rupture
          </Badge>
        );
    }
  }

  return null;
}
