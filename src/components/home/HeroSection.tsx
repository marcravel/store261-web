'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { businessConfig } from '@/lib/config';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-dark text-white overflow-hidden py-20 px-4">
      {/* Abstract Background Shapes & Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-amber/10 blur-[60px]" />
        
        {/* Subtle geometric lines */}
        <svg className="absolute inset-0 w-full h-full stroke-white/[0.03] stroke-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Subtitle badge with fade up */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-widest font-semibold text-brand-gold"
        >
          <span>✨</span> Boutique Officielle Store 261
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none"
        >
          {businessConfig.name}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-amber">
            {businessConfig.tagline}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-neutral-300 text-base sm:text-lg md:text-xl font-light leading-relaxed"
        >
          Découvrez notre sélection exclusive d&apos;articles importés de qualité supérieure. Parcourez notre catalogue et contactez-nous directement pour finaliser votre commande.
        </motion.p>

        {/* Actions CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/products"
            className={buttonVariants({
              size: 'lg',
              className: 'w-full sm:w-auto bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold rounded-xl gap-2 transition-all shadow-lg shadow-brand-gold/20 min-h-[48px]',
            })}
          >
            <span>Voir les Produits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              className: 'w-full sm:w-auto bg-transparent border-white/20 hover:bg-white/5 text-white font-medium rounded-xl gap-2 min-h-[48px]',
            })}
          >
            <MessageCircle className="w-4 h-4 text-brand-gold" />
            <span>Nous Contacter</span>
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}
