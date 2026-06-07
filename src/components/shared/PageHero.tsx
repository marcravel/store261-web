interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHero({ title, description, className = '' }: PageHeroProps) {
  return (
    <section className={`relative bg-brand-dark text-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden ${className}`}>
      {/* Decorative background shapes */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full border border-white" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-72 h-72 rounded-full border border-white/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl mx-auto text-neutral-300 text-base md:text-lg font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
