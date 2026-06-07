import type { Metadata } from 'next';
import { Mail, MapPin, Clock, MessageSquare, Facebook } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import SectionHeading from '@/components/shared/SectionHeading';
import { businessConfig } from '@/lib/config';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Contactez-nous',
  description: 'Entrez en contact avec Store 261. Commandez en direct ou posez-nous vos questions sur WhatsApp et Messenger.',
  url: 'https://store261.mg/contact',
});

export default function ContactPage() {
  const generalWhatsAppUrl = `https://wa.me/${businessConfig.phone}?text=${encodeURIComponent(
    'Bonjour ! Je vous contacte depuis votre page contact Store 261.'
  )}`;

  return (
    <div className="space-y-16 pb-20">
      {/* Page Hero */}
      <PageHero
        title="Contactez-nous"
        description="Vous avez repéré un article ou souhaitez en savoir plus ? Écrivez-nous directement."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start animate-fade-up">
        
        {/* Direct messaging conversion actions cards */}
        <div className="lg:col-span-2 space-y-8">
          <SectionHeading
            title="Choisissez votre messagerie préférée"
            subtitle="Discuter en direct"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* WhatsApp Card */}
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366]"
            >
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                <MessageSquare className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-brand-dark">WhatsApp</h3>
                <p className="text-neutral-500 text-xs sm:text-sm">
                  Discutez en direct avec nous. Idéal pour passer une commande ou demander des photos supplémentaires.
                </p>
              </div>

              <div className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl text-sm transition-colors">
                Lancer la discussion
              </div>
              <span className="text-xs text-neutral-400 font-medium">+{businessConfig.phone}</span>
            </a>

            {/* Messenger Card */}
            <a
              href={`https://m.me/${businessConfig.messengerUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center space-y-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0084ff]"
            >
              <div className="w-16 h-16 bg-[#0084FF]/10 text-[#0084FF] rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                <Facebook className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-brand-dark">Facebook Messenger</h3>
                <p className="text-neutral-500 text-xs sm:text-sm">
                  Envoyez-nous un message privé sur Facebook. Nous répondons également rapidement à toutes vos questions.
                </p>
              </div>

              <div className="w-full py-3 bg-[#0084FF] hover:bg-[#0073de] text-white font-semibold rounded-xl text-sm transition-colors">
                Ouvrir Messenger
              </div>
              <span className="text-xs text-neutral-400 font-medium">@{businessConfig.messengerUsername}</span>
            </a>

          </div>
        </div>

        {/* Business Coordinates and timing details card */}
        <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm space-y-8">
          <h3 className="font-display font-bold text-lg text-brand-dark pb-4 border-b border-neutral-50">
            Informations Boutique
          </h3>
          
          <div className="space-y-6">
            
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-brand-dark">Adresse</h4>
                <p className="text-neutral-500 text-xs leading-relaxed">{businessConfig.address}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-brand-dark">Email</h4>
                <a href={`mailto:${businessConfig.email}`} className="text-neutral-500 hover:text-brand-gold text-xs transition-colors truncate block max-w-[180px]">
                  {businessConfig.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-gold/10 text-brand-gold rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-brand-dark">Horaires de réponse</h4>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Lundi - Samedi : 8h00 - 18h00<br />
                  Dimanche : Fermé (ou traitement différé)
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
