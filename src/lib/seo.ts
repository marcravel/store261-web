import type { Metadata } from 'next';
import { businessConfig } from './config';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function constructMetadata({
  title = businessConfig.name,
  description = businessConfig.tagline,
  image = '/og-default.jpg',
  url = 'https://store261.mg',
  type = 'website',
}: SeoProps = {}): Metadata {
  const pageTitle = title === businessConfig.name ? title : `${title} | ${businessConfig.name}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: businessConfig.name,
      type,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
    },
    metadataBase: new URL(url),
  };
}
