'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Phone, MessageSquare, Facebook, Info, ShoppingBag, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { businessConfig } from '@/lib/config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/products', label: 'Produits', icon: ShoppingBag },
    { href: '/about', label: 'À Propos', icon: Info },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <Logo />
              <button
                onClick={onClose}
                className="p-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-50 transition-colors focus:ring-2 focus:ring-brand-gold outline-none"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-6 py-8 space-y-4">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-brand-gold/10 text-brand-dark'
                        : 'text-neutral-600 hover:text-brand-dark hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-brand-gold' : 'text-neutral-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Quick Contact & Footer */}
            <div className="p-6 bg-neutral-50 border-t border-neutral-100 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">Nous Contacter</span>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${businessConfig.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-neutral-600 hover:text-green-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-green-500" />
                  <span>WhatsApp : +{businessConfig.phone}</span>
                </a>
                <a
                  href={`https://facebook.com/${businessConfig.messengerUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-neutral-600 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-500" />
                  <span>Facebook : @{businessConfig.messengerUsername}</span>
                </a>
              </div>
              <p className="text-xs text-neutral-400 text-center pt-2">
                © {new Date().getFullYear()} {businessConfig.name}. Tous droits réservés.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
