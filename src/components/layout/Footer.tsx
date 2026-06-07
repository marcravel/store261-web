import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook } from 'lucide-react';
import Logo from './Logo';
import { businessConfig } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white border-t border-white/5">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand block */}
        <div className="space-y-4">
          <Logo light={true} />
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            {businessConfig.tagline}. Retrouvez nos produits de qualité directement importés, et contactez-nous pour commander en toute simplicité.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={businessConfig.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center justify-center text-white"
              aria-label="Find us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={`https://wa.me/${businessConfig.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-green-600 hover:text-white transition-all flex items-center justify-center text-white"
              aria-label="Chat on WhatsApp"
            >
              {/* WhatsApp custom inline SVG icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.588 1.45 5.621 1.452 5.4 0 9.794-4.402 9.797-9.814.001-2.621-1.013-5.086-2.856-6.93C17.362 2.019 14.9 1.002 12.274 1c-5.402 0-9.803 4.403-9.806 9.82-.001 2.049.535 4.053 1.554 5.823l-.99 3.616 3.714-.974zM16.94 13.9c-.27-.135-1.597-.787-1.845-.877-.248-.09-.427-.135-.607.135-.18.27-.697.877-.855 1.057-.157.18-.315.202-.585.067-1.631-.818-2.698-1.427-3.765-3.257-.282-.486-.067-.743.067-.876.12-.12.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.068-.135-.607-1.463-.832-2.003-.22-.527-.46-.455-.63-.464-.162-.008-.347-.009-.53-.009-.18 0-.473.068-.72.337-.247.27-.945.922-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.074.645.278 1.148.445 1.539.57.648.206 1.238.177 1.704.108.52-.078 1.597-.652 1.822-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-base tracking-wide text-white">Liens Utiles</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Nos Produits
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                À Propos de Nous
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories navigation */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-base tracking-wide text-white">Nos Catégories</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/categories/iphones" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                iPhones Apple
              </Link>
            </li>
            <li>
              <Link href="/categories/android" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Téléphones Android
              </Link>
            </li>
            <li>
              <Link href="/categories/electronics" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Accessoires
              </Link>
            </li>
            <li>
              <Link href="/categories/fashion" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Mode & Vêtements
              </Link>
            </li>
            <li>
              <Link href="/categories/home" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Maison & Déco
              </Link>
            </li>
            <li>
              <Link href="/categories/beauty" className="text-neutral-400 hover:text-brand-gold text-sm transition-colors">
                Beauté & Bien-être
              </Link>
            </li>
          </ul>
        </div>

        {/* Business Coordinates */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-base tracking-wide text-white">Coordonnées</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 text-neutral-400">
              <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <span>{businessConfig.address}</span>
            </li>
            <li className="flex items-center gap-3 text-neutral-400">
              <Phone className="w-5 h-5 text-brand-gold shrink-0" />
              <a href={`https://wa.me/${businessConfig.phone}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                +{businessConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-neutral-400">
              <Mail className="w-5 h-5 text-brand-gold shrink-0" />
              <a href={`mailto:${businessConfig.email}`} className="hover:text-brand-gold transition-colors">
                {businessConfig.email}
              </a>
            </li>
          </ul>
        </div>
        
      </div>

      {/* Lower Footer copyright line */}
      <div className="bg-black/20 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">
            © {currentYear} {businessConfig.name}. Tous droits réservés.
          </p>
          <p className="text-neutral-500 text-xs">
            Conçu pour un commerce rapide via WhatsApp & Messenger.
          </p>
        </div>
      </div>
    </footer>
  );
}
