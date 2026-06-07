import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  light?: boolean;
  compact?: boolean;
}

export default function Logo({ className = '', light = false, compact = false }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group focus-visible:outline-none ${className}`}>
      {/* PNG Logo Image replacement (square with rounded edge) */}
      <div className={`relative transition-all duration-300 group-hover:scale-105 overflow-hidden flex items-center justify-center rounded-xl border border-neutral-100 bg-white shadow-sm ${compact ? 'w-11 h-11' : 'w-10 h-10'
        }`}>
        <Image
          src="/images/logo.png"
          alt="Store 261 Logo"
          fill
          sizes={compact ? "44px" : "56px"}
          className="object-contain scale-230"
          priority
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-display font-bold leading-none tracking-wide transition-all ${compact ? 'text-base' : 'text-lg'
          } ${light ? 'text-white' : 'text-brand-dark'}`}>
          Store <span className={light ? 'text-white/80' : 'text-brand-gold'}>261</span>
        </span>
        <span className={`text-[10px] uppercase tracking-widest font-medium ${light ? 'text-white/60' : 'text-neutral-500'
          }`}>
          Madagascar
        </span>
      </div>
    </Link >
  );
}
