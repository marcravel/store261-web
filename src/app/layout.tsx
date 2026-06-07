import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/shared/WhatsAppFAB';
import { businessConfig } from '@/lib/config';

// Load display and body fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${businessConfig.name} | ${businessConfig.tagline}`,
    template: `%s | ${businessConfig.name}`,
  },
  description: 'Catalogue en ligne de produits importés et locaux de qualité supérieure à Madagascar. Commandez en direct sur WhatsApp et Messenger.',
  metadataBase: new URL('https://store261.mg'),
  openGraph: {
    title: `${businessConfig.name} | ${businessConfig.tagline}`,
    description: 'Catalogue en ligne de produits importés et locaux de qualité supérieure à Madagascar. Commandez en direct sur WhatsApp et Messenger.',
    url: 'https://store261.mg',
    siteName: businessConfig.name,
    locale: 'fr_MG',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: businessConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessConfig.name} | ${businessConfig.tagline}`,
    description: 'Catalogue en ligne de produits importés et locaux de qualité supérieure à Madagascar. Commandez en direct sur WhatsApp et Messenger.',
    images: ['/og-default.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmSans.variable} scroll-smooth h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-light text-brand-dark">
        {/* Skip to Content Link (Accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-brand-dark focus:font-bold focus:rounded-xl focus:outline-none"
        >
          Passer au contenu principal
        </a>

        {/* Global Navigation header */}
        <Navbar />

        {/* Main landmark */}
        <main id="main-content" className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Site-wide Floating WhatsApp FAB */}
        <WhatsAppFAB />

        {/* TODO: Add Vercel Analytics / Google Analytics tag here */}
      </body>
    </html>
  );
}
