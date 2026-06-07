import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Development placeholder images (replace with Cloudinary in production)
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Cloudinary CDN — production image storage for all product/category images.
      // Upload images at https://cloudinary.com/console then paste the URL into
      // Prisma Studio (product_images.url) or the seed file.
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
