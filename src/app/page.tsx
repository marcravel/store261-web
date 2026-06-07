import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import TrustBar from '@/components/home/TrustBar';
import CategoryCircles from '@/components/home/CategoryCircles';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { getFeaturedProducts, getAllCategories, getAllProducts } from '@/lib/repository';
import { businessConfig } from '@/lib/config';

export const revalidate = 3600; // Revalidate static content hourly

export default async function Home() {
  const [
    featuredProducts,
    iphoneProducts,
    androidProducts,
    electronicsProducts,
    fashionProducts,
    homeProducts,
    beautyProducts,
    categories,
  ] = await Promise.all([
    getFeaturedProducts(4),
    getAllProducts({ categorySlug: 'iphones' }),
    getAllProducts({ categorySlug: 'android' }),
    getAllProducts({ categorySlug: 'electronics' }),
    getAllProducts({ categorySlug: 'fashion' }),
    getAllProducts({ categorySlug: 'home' }),
    getAllProducts({ categorySlug: 'beauty' }),
    getAllCategories(),
  ]);

  return (
    <div className="pt-28 pb-20 space-y-12 bg-neutral-50/20">
      
      {/* 1. E-Commerce Search Bar */}
      <div className="max-w-2xl mx-auto px-4 w-full pt-4">
        <form action="/products" method="GET" className="relative flex items-center w-full shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden border border-neutral-200/80 bg-white">
          <span className="pl-4 pr-2 text-neutral-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            name="q"
            placeholder="Rechercher un produit, une catégorie, une marque..."
            className="w-full h-12 pr-28 text-sm text-brand-dark bg-transparent focus:outline-none placeholder:text-neutral-400 font-medium"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-brand-dark hover:bg-brand-dark/95 text-white text-xs font-semibold rounded-xl transition-all active:scale-95 shadow-sm"
          >
            Rechercher
          </button>
        </form>
      </div>

      {/* 2. Category circular shortcuts (Trendyol Style) */}
      <section className="max-w-7xl mx-auto">
        <CategoryCircles categories={categories} />
      </section>

      {/* 3. Product Shelf - Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-dark flex items-center gap-2">
            <span>🔥</span> Produits Populaires en Vedette
          </h2>
          <Link
            href="/products"
            className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
          >
            <span>Voir Tout</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <FeaturedProducts products={featuredProducts} />
      </section>

      {/* 4. Product Shelf - iPhones */}
      {iphoneProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-dark flex items-center gap-2">
              <span>📱</span> iPhones Apple
            </h2>
            <Link
              href="/products?category=iphones"
              className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              <span>Voir Tout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FeaturedProducts products={iphoneProducts.slice(0, 4)} />
        </section>
      )}

      {/* 5. Product Shelf - Android */}
      {androidProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-dark flex items-center gap-2">
              <span>🤖</span> Téléphones Android
            </h2>
            <Link
              href="/products?category=android"
              className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              <span>Voir Tout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FeaturedProducts products={androidProducts.slice(0, 4)} />
        </section>
      )}

      {/* 4. Product Shelf - Electronics */}
      {electronicsProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-dark flex items-center gap-2">
              <span>💻</span> Accessoires
            </h2>
            <Link
              href="/products?category=electronics"
              className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              <span>Voir Tout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FeaturedProducts products={electronicsProducts.slice(0, 4)} />
        </section>
      )}

      {/* 5. Product Shelf - Fashion */}
      {fashionProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-dark flex items-center gap-2">
              <span>👕</span> Mode & Vêtements
            </h2>
            <Link
              href="/products?category=fashion"
              className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              <span>Voir Tout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FeaturedProducts products={fashionProducts.slice(0, 4)} />
        </section>
      )}

      {/* 6. Product Shelf - Home */}
      {homeProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-dark flex items-center gap-2">
              <span>🏠</span> Maison & Déco
            </h2>
            <Link
              href="/products?category=home"
              className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              <span>Voir Tout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FeaturedProducts products={homeProducts.slice(0, 4)} />
        </section>
      )}

      {/* 7. Product Shelf - Beauty */}
      {beautyProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-brand-dark flex items-center gap-2">
              <span>✨</span> Beauté & Soins
            </h2>
            <Link
              href="/products?category=beauty"
              className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-gold hover:text-brand-gold/80 transition-colors"
            >
              <span>Voir Tout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <FeaturedProducts products={beautyProducts.slice(0, 4)} />
        </section>
      )}

      {/* 8. Trust Info Bar */}
      <TrustBar />

      {/* 9. Contact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative bg-brand-dark rounded-3xl overflow-hidden shadow-xl py-12 px-6 sm:px-12 md:py-16 text-center text-white space-y-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl mx-auto relative z-10">
            Une question ? Discutez directement avec nous
          </h2>
          
          <p className="max-w-xl mx-auto text-neutral-400 text-sm sm:text-base font-light relative z-10">
            Vous souhaitez en savoir plus sur un produit, connaître sa disponibilité ou commander ? Notre service client est à votre écoute sur vos messageries préférées.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            {/* WhatsApp general link */}
            <a
              href={businessConfig.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white font-semibold rounded-xl shadow-md transition-all text-sm min-h-[48px]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.588 1.45 5.621 1.452 5.4 0 9.794-4.402 9.797-9.814.001-2.621-1.013-5.086-2.856-6.93C17.362 2.019 14.9 1.002 12.274 1c-5.402 0-9.803 4.403-9.806 9.82-.001 2.049.535 4.053 1.554 5.823l-.99 3.616 3.714-.974zM16.94 13.9c-.27-.135-1.597-.787-1.845-.877-.248-.09-.427-.135-.607.135-.18.27-.697.877-.855 1.057-.157.18-.315.202-.585.067-1.631-.818-2.698-1.427-3.765-3.257-.282-.486-.067-.743.067-.876.12-.12.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.068-.135-.607-1.463-.832-2.003-.22-.527-.46-.455-.63-.464-.162-.008-.347-.009-.53-.009-.18 0-.473.068-.72.337-.247.27-.945.922-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.074.645.278 1.148.445 1.539.57.648.206 1.238.177 1.704.108.52-.078 1.597-.652 1.822-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z" />
              </svg>
              <span>Discuter sur WhatsApp</span>
            </a>
            
            {/* Messenger general link */}
            <a
              href={`https://m.me/${businessConfig.messengerUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 bg-[#0084FF] hover:bg-[#0073de] active:scale-[0.99] text-white font-semibold rounded-xl shadow-md transition-all text-sm min-h-[48px]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.742 6.619 4.47 8.784V24l4.008-2.223a12.83 12.83 0 003.522.489c6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.293 14.887l-3.08-3.284-6.01 3.284 6.597-7.009 3.12 3.284 5.97-3.284-6.597 7.009z" />
              </svg>
              <span>Message Messenger</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
