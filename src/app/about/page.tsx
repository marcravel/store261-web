import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Truck, MessageCircle, Star, ArrowRight } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import { buttonVariants } from '@/components/ui/button';
import { businessConfig } from '@/lib/config';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'À Propos de Nous',
  description: `Découvrez Store 261, votre boutique de confiance pour l'achat d'articles importés et locaux de premier choix à Madagascar.`,
  url: 'https://store261.mg/about',
});

export default function AboutPage() {
  const qualities = [
    {
      icon: ShieldCheck,
      title: 'Sélection Qualité',
      description: 'Chaque article de notre catalogue fait l\'objet d\'une vérification rigoureuse pour garantir sa qualité et sa durabilité.',
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Nous organisons des livraisons rapides à Antananarivo et des envois sécurisés en province selon vos préférences.',
    },
    {
      icon: MessageCircle,
      title: 'Contact Direct',
      description: 'Pas de process automatisé impersonnel. Vous discutez en direct avec nous pour commander ou poser vos questions.',
    },
    {
      icon: Star,
      title: 'Service Client Dédié',
      description: 'Votre satisfaction est notre priorité. Nous vous accompagnons avant, pendant et après votre processus d\'achat.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Page Hero */}
      <PageHero
        title="À Propos de Store 261"
        description="Votre boutique en ligne de confiance pour des produits d'importation de qualité supérieure à Madagascar."
      />

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center animate-fade-up">
        <div className="space-y-6">
          <SectionHeading
            title="Notre Mission : Rendre la qualité accessible"
            subtitle="Qui sommes-nous"
          />
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Chez <strong>{businessConfig.name}</strong>, nous croyons que l&apos;accès à des produits fiables et performants ne devrait pas être un parcours du combattant. C&apos;est pourquoi nous sélectionnons avec passion le meilleur des équipements électroniques, de la mode, de la maison et des soins de beauté pour les rendre disponibles localement.
          </p>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Nous avons choisi un modèle axé sur la proximité et la confiance mutuelle. En nous focalisant sur les canaux de communication directs comme WhatsApp et Messenger, nous pouvons offrir un service personnalisé et chaleureux à chacun de nos clients.
          </p>
        </div>
        
        {/* Visual box or placeholder */}
        <div className="relative aspect-4/3 w-full bg-brand-dark rounded-3xl overflow-hidden shadow-lg flex items-center justify-center p-8 text-center text-white">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/20 via-brand-dark to-brand-dark" />
          <div className="relative z-10 space-y-4">
            <span className="font-display font-bold text-6xl text-brand-gold">S261</span>
            <h3 className="font-display font-semibold text-lg">Qualité · Confiance · Proximité</h3>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              Opérant à Antananarivo et livrant dans toute la grande île de Madagascar.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="bg-white border-y border-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            title="Pourquoi nos clients nous choisissent"
            subtitle="Nos engagements"
            centered={true}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualities.map((q, idx) => {
              const Icon = q.icon;
              return (
                <div key={idx} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100/50 space-y-4 text-center sm:text-left transition-all hover:bg-neutral-100/30">
                  <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-brand-dark">{q.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">{q.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location / Contact info details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark">Notre Localisation</h2>
        <p className="text-neutral-600 text-sm max-w-lg mx-auto">
          Nos bureaux et notre point de stockage principal sont situés à <strong>{businessConfig.address}</strong>. Toutes les commandes peuvent être livrées à votre domicile ou récupérées en point de retrait convenu lors de l&apos;échange WhatsApp.
        </p>
        
        <div className="pt-4">
          <Link
            href="/products"
            className={buttonVariants({
              size: 'lg',
              className: 'bg-brand-dark hover:bg-brand-dark/95 text-white font-semibold rounded-xl gap-2 min-h-[48px]',
            })}
          >
            <span>Découvrir nos Produits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
