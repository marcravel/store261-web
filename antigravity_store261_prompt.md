# Antigravity AI — Project Brief & Implementation Prompt
## Store261 · Online Product Catalog MVP

---

> **To: Antigravity AI**
> **From: Lead Software Architect**
> **Classification: Production Handover Document**
> **Version: 1.0.0**

---

## PART 1 — PROJECT OBJECTIVE

You are being handed a greenfield web project. Your mission is to build a **production-ready MVP (Minimum Viable Product) online product catalog** for a local business that currently operates exclusively through a Facebook store page at `https://www.facebook.com/store261`.

This is **not** a full e-commerce platform. There is no payment gateway, no shopping cart, no checkout, and no user account system. The sole commercial goal of this website is to act as a **professional, high-trust digital storefront** — a place where potential customers can browse products beautifully, then reach the owner directly via WhatsApp or Facebook Messenger to complete a purchase or ask questions.

Think of this as the difference between a luxury boutique showroom (this MVP) and a full retail POS system (future phases). You are building the showroom.

**Primary success metrics:**
- A visitor lands on the site and immediately understands what the business sells.
- The catalog is attractive, browsable, and filterable.
- Every product page makes it trivially easy to contact the seller.
- The site loads fast, looks professional on mobile, and ranks on Google.

---

## PART 2 — BUSINESS ANALYSIS & INFERRED BRANDING

The business operates under the Facebook page `store261`. Because the page is a Facebook store, we can reasonably infer:

- **Business type:** Local retail shop (physical or home-based), likely selling general consumer goods, electronics, accessories, fashion, or home products — common for Facebook-based stores in emerging markets or diaspora communities.
- **Target audience:** Local customers and community members who trust social proof and direct communication over anonymous checkout flows.
- **Current sales model:** Customers browse Facebook, comment or DM to inquire, then arrange payment and delivery personally — hence WhatsApp/Messenger CTAs are the correct conversion mechanism for this MVP.
- **Branding tone:** Friendly, trustworthy, accessible. Not corporate. Not luxury. Modern but warm.

**Branding decisions for the MVP (to be refined by the actual business owner):**
- **Brand name:** `Store 261` (the "261" is the international dialing code for Madagascar, suggesting a Malagasy-owned or Madagascar-focused business)
- **Tagline:** `Quality Products, Direct to You`
- **Primary color palette:** Deep charcoal (`#1A1A2E`) + warm gold accent (`#E8B84B`) + clean white (`#FAFAFA`) — professional, warm, and visually striking
- **Secondary accent:** Soft amber (`#F4A261`) for hover states and highlights
- **Typography:** Display font `Playfair Display` (elegant, trustworthy) for headings; `DM Sans` (modern, readable) for body text
- **Logo placeholder:** Use an SVG text-mark: `S261` in the brand gold color, to be replaced by the real logo asset later
- **Imagery style:** Bright, product-focused imagery with clean backgrounds; placeholder images via `https://picsum.photos` keyed to product IDs for deterministic results during development

All of the above is placeholder branding. The codebase must make it trivially easy to update these values (colors via CSS variables / Tailwind config, fonts via a single layout file, logo via a swappable component).

---

## PART 3 — RECOMMENDED TECHNOLOGY STACK

### Frontend
| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Next.js 14+** (App Router) | SSG/SSR for SEO, file-based routing, image optimization built-in |
| UI Library | **React 18+** | Component model, hooks, ecosystem |
| Language | **TypeScript 5+** | Type safety, better DX, required for scalability |
| Styling | **Tailwind CSS v3** | Utility-first, consistent design system, small bundle |
| Component System | **shadcn/ui** | Accessible, composable, un-opinionated base components |
| Icons | **Lucide React** | Consistent, lightweight SVG icon set |
| Animations | **Framer Motion** | Professional page transitions and micro-interactions |
| Image handling | **next/image** | Automatic WebP conversion, lazy loading, blur placeholders |
| Fonts | **next/font** (Google Fonts) | Zero-layout-shift font loading |

### Data Layer (MVP — Static)
| Layer | Technology | Rationale |
|---|---|---|
| Product data | **TypeScript JSON files** | Zero infrastructure, instant, type-safe |
| Data access | **Repository pattern** (typed functions) | Swappable — replace with DB calls later without touching UI |

### Future Scalability (Phase 2+, not built now)
| Feature | Recommended Path |
|---|---|
| Product CMS | Sanity.io or Contentlayer |
| Database | PostgreSQL via Supabase or PlanetScale |
| Auth | NextAuth.js |
| Cart + Payments | Stripe + server actions |
| Admin dashboard | Separate Next.js route group `/admin` |

---

## PART 4 — PROJECT ARCHITECTURE

### Architectural Principles
1. **Static-first, dynamic-ready.** All pages are statically generated at build time for maximum performance and SEO. The repository layer is the only place that touches data — replacing JSON with a database call requires changing only that layer.
2. **Feature-based structure, not type-based.** Components live near the features they serve. Shared primitives live in `/components/ui`.
3. **Zero coupling between UI and data.** UI components never import data directly. They receive typed props. This makes the future migration to a real API trivial.
4. **Mobile-first, always.** Every Tailwind class starts with the mobile breakpoint. Larger breakpoints (`md:`, `lg:`) are additive enhancements.
5. **Strict TypeScript throughout.** `strict: true` in `tsconfig.json`. No `any`. Every prop, data shape, and function parameter is typed.

### Data Flow
```
/data/products.ts  ←──  Source of truth (static JSON)
       │
       ▼
/lib/repository.ts  ←──  Data access layer (typed functions, filterable)
       │
       ▼
Next.js Page (async Server Component)  ←──  Calls repository, passes props
       │
       ▼
Client Components  ←──  Receive typed props, handle interactivity
```

### Contact Flow (The Only "Conversion")
```
Product Page
    │
    ├── "Contact on WhatsApp" button
    │       └── Opens: https://wa.me/[PHONE]?text=Hello%2C+I+am+interested+in+[Product+Name]...
    │
    └── "Message on Messenger" button
            └── Opens: https://m.me/store261?text=Hello%2C+I+am+interested+in+[Product+Name]...
```

Both links are generated dynamically from the product name using URL encoding. The phone number is stored in a single `/lib/config.ts` file.

---

## PART 5 — FOLDER STRUCTURE

Initialize the project with `npx create-next-app@latest store261 --typescript --tailwind --app --src-dir --import-alias "@/*"` and then produce the following structure:

```
store261/
├── public/
│   ├── favicon.ico
│   ├── og-default.jpg              # Default Open Graph image
│   └── images/                     # Static assets (logo, hero, etc.)
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (font, metadata, navbar, footer)
│   │   ├── page.tsx                # Home page (/)
│   │   ├── globals.css             # Tailwind base + CSS custom properties
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx            # About page (/about)
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact page (/contact)
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx            # Product catalog (/products)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Product detail (/products/[slug])
│   │   │
│   │   ├── categories/
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Category page (/categories/[slug])
│   │   │
│   │   └── not-found.tsx           # Custom 404 page
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui primitives (generated by CLI)
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Top navigation bar
│   │   │   ├── MobileMenu.tsx      # Hamburger mobile drawer
│   │   │   ├── Footer.tsx          # Footer with social links
│   │   │   └── Logo.tsx            # SVG/image logo component
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx     # Full-width hero with CTA
│   │   │   ├── FeaturedProducts.tsx # Featured product grid
│   │   │   ├── CategoryGrid.tsx    # Category tiles
│   │   │   └── TrustBar.tsx        # "Why choose us" strip
│   │   │
│   │   ├── products/
│   │   │   ├── ProductCard.tsx     # Card used in grids and search
│   │   │   ├── ProductGrid.tsx     # Responsive grid of ProductCards
│   │   │   ├── ProductFilter.tsx   # Sidebar/top filter (category, price, search)
│   │   │   ├── ProductSearch.tsx   # Search bar with debounce
│   │   │   ├── ProductGallery.tsx  # Image gallery for detail page
│   │   │   ├── ProductBadge.tsx    # "New", "Featured", "Sale" badge
│   │   │   └── ContactButtons.tsx  # WhatsApp + Messenger CTA buttons
│   │   │
│   │   └── shared/
│   │       ├── SectionHeading.tsx  # Reusable section title + subtitle
│   │       ├── PageHero.tsx        # Inner-page hero banner
│   │       └── WhatsAppFAB.tsx     # Floating WhatsApp button (site-wide)
│   │
│   ├── data/
│   │   ├── products.ts             # Array of all products (typed)
│   │   └── categories.ts          # Array of all categories (typed)
│   │
│   ├── lib/
│   │   ├── config.ts               # Business config (phone, Messenger, socials)
│   │   ├── repository.ts           # Data access functions (getAllProducts, etc.)
│   │   ├── utils.ts                # shadcn cn() utility + helpers
│   │   └── seo.ts                  # generateMetadata helpers
│   │
│   └── types/
│       ├── product.ts              # Product, Category TypeScript interfaces
│       └── index.ts                # Re-exports
│
├── tailwind.config.ts              # Extended theme (brand colors, fonts)
├── tsconfig.json                   # Strict TypeScript config
├── next.config.js                  # Image domains, redirects
├── components.json                 # shadcn/ui config
└── .env.local.example              # Template for future env variables
```

---

## PART 6 — TYPE DEFINITIONS

Generate the following types in `src/types/product.ts`. These are the contracts every part of the application must respect.

```typescript
// src/types/product.ts

export type ProductStatus = 'available' | 'limited' | 'out_of_stock';

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  slug: string;                    // URL-safe unique identifier
  name: string;
  shortDescription: string;        // Used in cards (max 120 chars)
  description: string;             // Full markdown-compatible description
  price: number;
  currency: string;                // e.g. "MGA", "USD", "EUR"
  images: ProductImage[];
  categorySlug: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  status: ProductStatus;
  createdAt: string;               // ISO date string
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount?: number;           // Populated at build time
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  phone: string;                   // WhatsApp number in international format (no +)
  messengerUsername: string;       // Facebook page username
  email: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram?: string;
    whatsapp: string;
  };
}
```

---

## PART 7 — DATA REPOSITORY LAYER

Generate `src/lib/repository.ts` with the following functions. This is the **only** file that touches product data. If the data source changes to a database, only this file changes.

```typescript
// src/lib/repository.ts
// Data access layer — swap JSON imports for DB calls here in Phase 2

import { products } from '@/data/products';
import { categories } from '@/data/categories';
import type { Product, Category } from '@/types';

export interface ProductFilterOptions {
  categorySlug?: string;
  search?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  status?: string;
  sortBy?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest';
}

export async function getAllProducts(filters?: ProductFilterOptions): Promise<Product[]> { ... }
export async function getProductBySlug(slug: string): Promise<Product | null> { ... }
export async function getFeaturedProducts(limit?: number): Promise<Product[]> { ... }
export async function getRelatedProducts(product: Product, limit?: number): Promise<Product[]> { ... }
export async function getAllCategories(): Promise<Category[]> { ... }
export async function getCategoryBySlug(slug: string): Promise<Category | null> { ... }
export async function searchProducts(query: string): Promise<Product[]> { ... }
```

Note: All functions are `async` even though they currently return static data. This makes the signature identical to what a real DB client would require — zero refactoring needed in Phase 2.

---

## PART 8 — BUSINESS CONFIGURATION

Generate `src/lib/config.ts` as follows. This is the single source of truth for all business-specific values.

```typescript
// src/lib/config.ts

import type { BusinessConfig } from '@/types';

export const businessConfig: BusinessConfig = {
  name: 'Store 261',
  tagline: 'Quality Products, Direct to You',
  phone: '261340000000',           // PLACEHOLDER — replace with real WhatsApp number
  messengerUsername: 'store261',
  email: 'contact@store261.mg',   // PLACEHOLDER
  address: 'Antananarivo, Madagascar', // PLACEHOLDER
  socialLinks: {
    facebook: 'https://www.facebook.com/store261',
    whatsapp: 'https://wa.me/261340000000',
  },
};

// Contact message generators
export function generateWhatsAppLink(productName: string): string {
  const message = encodeURIComponent(
    `Hello! I am interested in this product: *${productName}*. Could you provide more information?`
  );
  return `https://wa.me/${businessConfig.phone}?text=${message}`;
}

export function generateMessengerLink(productName: string): string {
  const message = encodeURIComponent(
    `Hello! I am interested in this product: ${productName}. Could you provide more information?`
  );
  return `https://m.me/${businessConfig.messengerUsername}?text=${message}`;
}
```

---

## PART 9 — SAMPLE PRODUCT DATA

Populate `src/data/products.ts` with **at least 12 sample products** across **4 categories**. The categories should be realistic for a general consumer goods store. Use the following categories:

1. **Electronics & Accessories** (`electronics`) — phone accessories, cables, earphones, power banks
2. **Fashion & Clothing** (`fashion`) — casual wear, accessories
3. **Home & Living** (`home`) — kitchen items, decoration
4. **Beauty & Personal Care** (`beauty`) — skincare, grooming

Each product must have:
- A realistic Malagasy/African market price in Ariary (MGA) — e.g. `45000` for MGA 45,000
- At least 2 image URLs using `https://picsum.photos/seed/[product-id]/800/600` pattern
- A proper `slug` derived from the name
- `isFeatured: true` on at least 4 products
- Mix of `available`, `limited`, and `out_of_stock` statuses

---

## PART 10 — PAGE SPECIFICATIONS

### 10.1 — Root Layout (`src/app/layout.tsx`)
- Load `Playfair Display` (weights 400, 700) and `DM Sans` (weights 400, 500, 600) via `next/font/google`
- Set CSS variables `--font-display` and `--font-body` on `:root`
- Include `<Navbar />`, `<main>`, `<Footer />`, and `<WhatsAppFAB />`
- Configure default metadata: `title`, `description`, `openGraph`, `twitter`
- Include Google Analytics or Vercel Analytics placeholder (comment with TODO)

### 10.2 — Home Page (`src/app/page.tsx`)
Sections in order:
1. **`<HeroSection />`** — Full-viewport hero with: brand name, tagline, "Browse Products" CTA button (links to `/products`), "Contact Us" secondary button. Use a high-quality gradient background or abstract background shape (no stock photo dependency). Subtle animation on mount.
2. **`<TrustBar />`** — 3–4 horizontal trust signals: "Local Business", "Direct from Owner", "Fast Response", "Secure via WhatsApp"
3. **`<CategoryGrid />`** — 4 category tiles in a responsive 2×2 (mobile) or 4×1 (desktop) grid with hover effects
4. **`<FeaturedProducts />`** — Heading + 4–6 product cards from `getFeaturedProducts()`
5. **CTA Banner** — Full-width section: "Have a Question? Talk to Us Directly" + WhatsApp + Messenger buttons

### 10.3 — Products Page (`src/app/products/page.tsx`)
- Server component that fetches all products and categories
- Renders `<ProductFilter />` (sidebar on desktop, collapsible on mobile) + `<ProductGrid />`
- Filter options: category select, search input, sort by (name, price)
- The filter state is managed via URL search params (`?category=electronics&q=cable&sort=price_asc`) for shareability and SEO
- Show product count: "Showing 12 products"
- Empty state component when no results match

### 10.4 — Product Detail Page (`src/app/products/[slug]/page.tsx`)
- `generateStaticParams()` to pre-render all product pages at build time
- `generateMetadata()` for per-product SEO metadata with Open Graph
- Layout: image gallery left / product info right (stacked on mobile)
- **`<ProductGallery />`**: main image + thumbnail strip, click to swap main
- Product info: name, price (formatted), status badge, description, tags
- **`<ContactButtons />`**: Two large, prominent buttons:
  - 🟢 `Contact on WhatsApp` — green button, WhatsApp icon
  - 🔵 `Message on Messenger` — blue button, Messenger icon
  - Both use `generateWhatsAppLink(product.name)` and `generateMessengerLink(product.name)`
- Related products strip at the bottom (same category, different product)
- Breadcrumb: Home > Products > [Category] > [Product Name]

### 10.5 — About Page (`src/app/about/page.tsx`)
- `<PageHero />` with title "About Us" and brand tagline
- Mission statement paragraph (placeholder text, easy to edit)
- "Why Choose Us" grid: 3–4 cards with icons (e.g. Lucide icons: `ShieldCheck`, `Truck`, `MessageCircle`, `Star`)
- Map placeholder or address block
- CTA: "Ready to shop? Browse our catalog"

### 10.6 — Contact Page (`src/app/contact/page.tsx`)
- `<PageHero />` with title "Get in Touch"
- **No contact form** — instead, two large action cards:
  - WhatsApp card (green): phone number, "Chat Now" link
  - Messenger card (blue): "Message Us on Facebook" link
- Business info: address, email, hours (placeholder)
- Social links

### 10.7 — Category Page (`src/app/categories/[slug]/page.tsx`)
- `generateStaticParams()` for all category slugs
- Shows category name, description, and all products in that category
- Reuses `<ProductGrid />` and `<ProductFilter />` with category pre-selected

### 10.8 — 404 Page (`src/app/not-found.tsx`)
- Friendly message: "Oops! Page not found"
- Link back to Home and Products
- On-brand styling

---

## PART 11 — KEY COMPONENT SPECIFICATIONS

### `<ContactButtons />` — CRITICAL COMPONENT
This is the most important component in the entire MVP. It must:
- Accept `productName: string` as a required prop
- Render two buttons, each opening a new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- WhatsApp button: background `#25D366`, white text, WhatsApp SVG icon (embed inline or use Lucide's `MessageCircle`)
- Messenger button: background `#0084FF`, white text, Messenger icon
- Both buttons must be large (minimum 44px height per WCAG tap target guidelines), full-width on mobile
- Add a subtle disclaimer below: "No payment required online. All transactions handled directly."

```tsx
// src/components/products/ContactButtons.tsx
interface ContactButtonsProps {
  productName: string;
  className?: string;
}
```

### `<ProductCard />` — Core Reusable Component
```tsx
interface ProductCardProps {
  product: Product;
  showCategory?: boolean;    // default true
  className?: string;
}
```
- Uses `next/image` for the product image with `blur` placeholder
- Shows: image, badge(s) (New / Featured / Limited), name, short description, price (formatted), category
- Hover: subtle lift shadow + image scale (CSS transition)
- Links to `/products/[slug]`
- No "Add to Cart" button — a small "View Details →" text link instead

### `<WhatsAppFAB />` — Floating Action Button
- Fixed position, bottom-right corner
- WhatsApp green circle with phone icon
- Pulse animation to attract attention
- Opens general WhatsApp link (no product pre-fill)
- Hidden on the contact page (to avoid redundancy)
- `aria-label="Contact us on WhatsApp"`

### `<Navbar />`
- Logo left, nav links center/right
- Links: Home, Products, About, Contact
- Active link highlighted
- Transparent on home hero, solid on scroll (intersection observer)
- Mobile: hamburger icon → `<MobileMenu />` drawer from the right
- Smooth transitions

### `<ProductFilter />`
- Accepts current filter state via URL params
- On change, updates URL params (uses `useRouter` + `useSearchParams`)
- Does **not** cause full page reload — uses Next.js soft navigation
- Debounced search input (300ms) to avoid excessive re-renders
- "Clear all filters" button when any filter is active

---

## PART 12 — STYLING & DESIGN SYSTEM

### Tailwind Configuration
Extend `tailwind.config.ts` with the brand design system:

```typescript
theme: {
  extend: {
    colors: {
      brand: {
        dark: '#1A1A2E',
        gold: '#E8B84B',
        amber: '#F4A261',
        light: '#FAFAFA',
      },
    },
    fontFamily: {
      display: ['var(--font-display)', 'Georgia', 'serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
    },
    animation: {
      'fade-up': 'fadeUp 0.6s ease-out forwards',
      'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
    },
    keyframes: {
      fadeUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      pulseSoft: {
        '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.4)' },
        '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(37, 211, 102, 0)' },
      },
    },
  },
},
```

### CSS Custom Properties (in `globals.css`)
```css
:root {
  --brand-dark: #1A1A2E;
  --brand-gold: #E8B84B;
  --brand-amber: #F4A261;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
}
```

### Price Formatting Utility
Add to `src/lib/utils.ts`:
```typescript
export function formatPrice(amount: number, currency: string = 'MGA'): string {
  return new Intl.NumberFormat('fr-MG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
```

---

## PART 13 — SEO IMPLEMENTATION

### Per-page Metadata Pattern
Use `generateMetadata()` in every dynamic page:

```typescript
// src/app/products/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Store 261`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0].url, width: 800, height: 600, alt: product.images[0].alt }],
      type: 'website',
    },
  };
}
```

### Structured Data
Add JSON-LD `Product` schema in product detail pages:
```typescript
// Inline in product detail page
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.images.map(img => img.url),
  offers: {
    '@type': 'Offer',
    priceCurrency: product.currency,
    price: product.price,
    availability: product.status === 'available'
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: { '@type': 'Organization', name: 'Store 261' },
  },
};
```

### `next.config.js`
Configure image domains for external image sources:
```javascript
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Add production CDN domain here later
    ],
  },
};
```

---

## PART 14 — ACCESSIBILITY REQUIREMENTS

- All images must have descriptive `alt` text
- All interactive elements must be keyboard-focusable
- Color contrast ratio minimum 4.5:1 (WCAG AA)
- `<nav>` with `aria-label`
- `<main>` landmark
- Skip-to-main-content link at top of page
- Mobile touch targets minimum 44×44px
- All buttons and links must have visible focus styles

---

## PART 15 — PERFORMANCE REQUIREMENTS

- Use `next/image` for all images (never `<img>`)
- Use React Server Components as default; add `'use client'` only when necessary (filter interactivity, mobile menu)
- No client-side data fetching on initial load
- Lazy load below-the-fold images with `loading="lazy"` (handled by `next/image`)
- Bundle size: no heavy libraries for simple tasks (e.g. don't use moment.js)
- All static pages should achieve Lighthouse score >90 on mobile

---

## PART 16 — IMPLEMENTATION ROADMAP

Follow this order strictly. Each phase should result in a working, runnable application.

### Phase 0 — Project Initialization (Do First)
1. `npx create-next-app@latest store261 --typescript --tailwind --app --src-dir --import-alias "@/*"`
2. Install dependencies: `npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge`
3. Initialize shadcn/ui: `npx shadcn@latest init`
4. Add shadcn components: `npx shadcn@latest add button badge card input select separator`
5. Configure `tailwind.config.ts` with brand theme
6. Configure `next.config.js` with image domains
7. Create `src/types/product.ts` and `src/types/index.ts`
8. Create `src/lib/config.ts` with `businessConfig` and contact link generators
9. Create `src/lib/utils.ts` with `cn()` and `formatPrice()`

### Phase 1 — Data Layer
10. Create `src/data/categories.ts` with 4 categories
11. Create `src/data/products.ts` with 12+ products across all categories
12. Create `src/lib/repository.ts` with all data access functions

### Phase 2 — Layout Shell
13. Create `src/components/layout/Logo.tsx`
14. Create `src/components/layout/Navbar.tsx` (desktop + mobile toggle)
15. Create `src/components/layout/MobileMenu.tsx`
16. Create `src/components/layout/Footer.tsx`
17. Create `src/components/shared/WhatsAppFAB.tsx`
18. Wire together in `src/app/layout.tsx`

### Phase 3 — Shared Components
19. `src/components/shared/SectionHeading.tsx`
20. `src/components/shared/PageHero.tsx`
21. `src/components/products/ProductBadge.tsx`
22. `src/components/products/ContactButtons.tsx` ← PRIORITY
23. `src/components/products/ProductCard.tsx`
24. `src/components/products/ProductGrid.tsx`

### Phase 4 — Pages (in order of importance)
25. Home page — all sections
26. Products catalog page — with filter
27. Product detail page — with gallery + contact buttons
28. Category page
29. About page
30. Contact page
31. 404 page

### Phase 5 — Polish
32. Add Framer Motion animations (hero, card entrance, page transitions)
33. Add structured data (JSON-LD) to product pages
34. Add `sitemap.ts` using Next.js metadata API
35. Add `robots.ts`
36. Audit accessibility and fix any issues
37. Final Lighthouse audit pass

---

## PART 17 — CODE QUALITY STANDARDS

Every file you generate must comply with:

1. **Comments on every non-trivial function and component** — explain the "why", not the "what"
2. **No `any` types** — use proper TypeScript generics or `unknown` with type guards
3. **Consistent naming:**
   - Components: `PascalCase`
   - Functions/variables: `camelCase`
   - Types/Interfaces: `PascalCase`
   - Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities
4. **No inline styles** — use Tailwind classes exclusively
5. **No magic strings** — use constants from `config.ts`
6. **Each component in its own file**
7. **Props interfaces defined in the same file as the component** (unless shared)
8. **Every `async` component properly typed** with `Promise<JSX.Element>` return where applicable
9. **Error boundaries** on critical sections (product gallery, etc.)
10. **`'use client'` directive only where absolutely necessary** — preserve SSR by default

---

## FINAL INSTRUCTION TO ANTIGRAVITY

You have now received the complete project brief. You are a senior full-stack engineer who has just been handed this document. Do not ask clarifying questions. Do not produce summaries or plans. Begin immediately.

**Execute the following in sequence, right now:**

1. **Initialize the Next.js project** using the exact command in Phase 0. Show the resulting folder structure.
2. **Install all dependencies** listed in Phase 0.
3. **Generate every file listed in the folder structure** (Part 5), including all components, pages, data files, types, and configuration files.
4. **Populate all sample data** — 4 categories and at least 12 products — using realistic names, descriptions, and prices appropriate for a local Malagasy retail store.
5. **Implement all 7 pages** (Home, Products, Product Detail, Category, About, Contact, 404) to production quality.
6. **Implement all components** to the specifications in Parts 10–11.
7. **Apply the full design system** from Part 12 (Tailwind theme, fonts, CSS variables).
8. **Implement the WhatsApp and Messenger contact links** in `ContactButtons.tsx` using the generators from `config.ts`. This is the single most critical feature.
9. **Apply SEO metadata** to every page using `generateMetadata()`.
10. **Add structured data** (JSON-LD) to the product detail page.

Generate **complete file contents** for every file — no placeholders like `// TODO: implement`. Every component, every page, every utility must be fully implemented and functional from the first generation.

This is a production handover. Deliver production-ready code.

---

*End of brief. Begin implementation.*
