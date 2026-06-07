import { ShieldCheck, UserCheck, Zap, MessageCircle } from 'lucide-react';

export default function TrustBar() {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Entreprise Locale',
      description: 'Basé à Madagascar',
    },
    {
      icon: UserCheck,
      title: 'Direct Propriétaire',
      description: 'Relation directe sans intermédiaire',
    },
    {
      icon: Zap,
      title: 'Réponse Rapide',
      description: 'Traitement sous quelques heures',
    },
    {
      icon: MessageCircle,
      title: 'Achat via WhatsApp',
      description: 'Transaction simple et sécurisée',
    },
  ];

  return (
    <section className="bg-white border-y border-neutral-100 py-8 shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-gold/10 text-brand-gold shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-semibold text-sm text-brand-dark leading-tight">{pt.title}</h3>
                  <p className="text-xs text-neutral-400 font-medium">{pt.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
