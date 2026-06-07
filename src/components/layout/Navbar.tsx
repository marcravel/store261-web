'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { buttonVariants } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const useTransparent =
    pathname === '/products' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname.startsWith('/categories/');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check scroll on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/about', label: 'À Propos' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 flex items-center ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 shadow-sm h-16'
            : useTransparent
            ? 'bg-transparent h-20'
            : 'bg-white border-b border-neutral-100 h-20'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo light={useTransparent && !isScrolled} compact={isScrolled} />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:text-brand-gold ${
                    isActive
                      ? useTransparent && !isScrolled
                        ? 'text-white border-b-2 border-brand-gold pb-1'
                        : 'text-brand-dark border-b-2 border-brand-gold pb-1'
                      : useTransparent && !isScrolled
                      ? 'text-white/80 hover:text-white'
                      : 'text-neutral-600 hover:text-brand-dark'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Call To Action button on Desktop */}
          <div className="hidden md:block">
            <Link
              href="/products"
              className={buttonVariants({
                variant: useTransparent && !isScrolled ? 'outline' : 'default',
                size: 'sm',
                className: useTransparent && !isScrolled 
                  ? 'bg-transparent border-white text-white hover:bg-white hover:text-brand-dark transition-all rounded-xl' 
                  : 'bg-brand-dark hover:bg-brand-dark/95 text-white transition-all rounded-xl',
              })}
            >
              Découvrir la Boutique
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className={`p-2 md:hidden rounded-xl transition-colors ${
              useTransparent && !isScrolled
                ? 'text-white hover:bg-white/10'
                : 'text-brand-dark hover:bg-neutral-50'
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
