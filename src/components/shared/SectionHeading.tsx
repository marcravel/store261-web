interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`space-y-3 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {subtitle && (
        <span className="text-xs uppercase tracking-widest font-semibold text-brand-gold bg-brand-gold/5 px-3 py-1 rounded-full">
          {subtitle}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-dark tracking-tight leading-tight">
        {title}
      </h2>
      <div className={`h-1 w-12 bg-brand-gold rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}
