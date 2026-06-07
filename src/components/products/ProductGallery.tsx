'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductImage } from '@/types';

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Safeguard against empty image array
  if (!images || images.length === 0) {
    return (
      <div className="aspect-4/3 w-full bg-neutral-100 rounded-2xl flex items-center justify-center">
        <span className="text-neutral-400 text-sm">Image non disponible</span>
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-4/3 w-full bg-neutral-50 border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt || 'Product image'}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails Container */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-neutral-200">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 focus:outline-none ${
                activeIndex === idx
                  ? 'border-brand-gold ring-2 ring-brand-gold/25'
                  : 'border-neutral-100 opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
