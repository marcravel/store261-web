import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { businessConfig } from '@/lib/config';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-20 px-4 md:pt-36 bg-brand-light">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-up">
        
        {/* Giant on-brand 404 text */}
        <div className="space-y-2 relative">
          <span className="font-display font-extrabold text-9xl text-brand-gold/20 tracking-wider">404</span>
          <h1 className="font-display font-bold text-3xl text-brand-dark leading-tight absolute inset-x-0 bottom-4">
            Oups ! Page Introuvable
          </h1>
        </div>

        <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée. Vous pouvez retourner à l&apos;accueil ou parcourir notre catalogue de produits.
        </p>

        {/* Dynamic options links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className={buttonVariants({
              variant: 'default',
              className: 'w-full sm:w-auto bg-brand-dark hover:bg-brand-dark/95 text-white font-semibold rounded-xl gap-2 min-h-[44px]',
            })}
          >
            <Home className="w-4 h-4 text-brand-gold" />
            <span>Accueil</span>
          </Link>
          <Link
            href="/products"
            className={buttonVariants({
              variant: 'outline',
              className: 'w-full sm:w-auto border-neutral-200 hover:bg-neutral-50 text-neutral-600 font-semibold rounded-xl gap-2 min-h-[44px]',
            })}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voir le Catalogue</span>
          </Link>
        </div>

        <p className="text-xs text-neutral-400">
          Besoin d&apos;aide ? Contactez {businessConfig.name} directement sur WhatsApp.
        </p>
        
      </div>
    </div>
  );
}
