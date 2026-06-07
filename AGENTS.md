<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Store261 — Definitive Project Brief & Agent Rules
## Online Product Catalog MVP · Production Handover Document

> **Classification:** Binding agent instructions. All rules below are enforced on every task.

---

## PART 1 — PROJECT OBJECTIVE

Build a **production-ready MVP online product catalog** for Store261, a local Madagascar-based business that currently operates through Facebook (`https://www.facebook.com/store261`).

**This is NOT a full e-commerce platform.** There is no payment gateway, no shopping cart, no checkout, no user accounts. The sole commercial goal is a **professional digital showroom** where customers browse products beautifully, then contact the owner via **WhatsApp or Facebook Messenger** to complete a purchase.

**Primary success metrics:**
- Visitor immediately understands what is sold
- Catalog is attractive, browsable, and filterable
- Every product page makes it trivially easy to contact the seller
- Site loads fast, looks professional on mobile, ranks on Google

---

## PART 2 — BRANDING

| Token | Value |
|---|---|
| Brand name | `Store 261` |
| Tagline | `Quality Products, Direct to You` |
| Primary dark | `#1A1A2E` (deep charcoal) |
| Gold accent | `#E8B84B` (warm gold) |
| Amber hover | `#F4A261` |
| Light bg | `#FAFAFA` |
| Display font | `Playfair Display` (headings) |
| Body font | `DM Sans` (body text) |
| Logo | SVG text-mark `S261` in gold — swappable component |
| Images | `https://picsum.photos/seed/[product-id]/800/600` during development |

All branding values must be updatable from a **single location**: colors via CSS custom properties and Tailwind config, fonts via `src/app/layout.tsx`, logo via `src/components/layout/Logo.tsx`.

---

## PART 3 — MANDATORY TECHNOLOGY STACK

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js App Router** | 16+ (installed) |
| Language | **TypeScript** | `strict: true`, no `any` |
| Styling | **Tailwind CSS** | v4 (installed) |
| Components | **shadcn/ui** | latest |
| Icons | **Lucide React** | installed |
| Animation | **Framer Motion** | installed |
| Images | **`next/image`** | always — never `<img>` |
| Fonts | **`next/font/google`** | zero-layout-shift loading |
| Data | **TypeScript static files** | `src/data/` |
| Data access | **Repository pattern** | `src/lib/repository.ts` only |

> **IMPORTANT:** Always read `node_modules/next/dist/docs/` before writing Next.js code. The installed version (16+) has API changes that differ from training data.

---

## PART 4 — CANONICAL FOLDER STRUCTURE

The root of this project is `d:\web_projects\store261-web\`. The `src/` directory is the only source root. Do NOT create files outside of `src/`, `public/`, or root config files.

```
store261-web/                   ← project root
├── public/
│   ├── favicon.ico
│   ├── og-default.jpg
│   └── images/
│
├── src/
│   ├── app/                    ← Next.js App Router (ALL routing lives here)
│   │   ├── layout.tsx          ← Root layout: fonts, metadata, Navbar, Footer, WhatsAppFAB
│   │   ├── page.tsx            ← Home page (/)
│   │   ├── globals.css         ← Tailwind base + CSS custom properties
│   │   ├── not-found.tsx       ← Custom 404
│   │   ├── robots.ts           ← robots.txt generation
│   │   ├── sitemap.ts          ← sitemap.xml generation
│   │   ├── about/page.tsx      ← /about
│   │   ├── contact/page.tsx    ← /contact
│   │   ├── products/
│   │   │   ├── page.tsx        ← /products (catalog with filter)
│   │   │   └── [slug]/page.tsx ← /products/[slug] (product detail)
│   │   └── categories/
│   │       └── [slug]/page.tsx ← /categories/[slug]
│   │
│   ├── components/
│   │   ├── ui/                 ← shadcn/ui primitives ONLY (CLI-generated)
│   │   ├── layout/             ← Navbar, Footer, Logo, MobileMenu
│   │   ├── home/               ← HeroSection, FeaturedProducts, CategoryCircles, TrustBar
│   │   ├── products/           ← ProductCard, ProductGrid, ProductFilter, ContactButtons, etc.
│   │   └── shared/             ← SectionHeading, PageHero, WhatsAppFAB
│   │
│   ├── data/
│   │   ├── products.ts         ← Source of truth: all product data
│   │   └── categories.ts       ← Source of truth: all category data
│   │
│   ├── lib/
│   │   ├── config.ts           ← businessConfig + WhatsApp/Messenger link generators
│   │   ├── repository.ts       ← ALL data access functions (the ONLY file that touches data/)
│   │   ├── utils.ts            ← cn() + formatPrice() + helpers
│   │   └── seo.ts              ← generateMetadata helpers
│   │
│   └── types/
│       ├── index.ts            ← Re-exports all types
│       └── (product types, BusinessConfig, etc.)
│
├── AGENTS.md                   ← This file. Single source of agent truth.
├── next.config.ts              ← Image remotePatterns (picsum.photos, etc.)
├── tsconfig.json               ← strict: true, paths: @/* → ./src/*
├── tailwind.config.ts          ← Brand color/font theme extensions
└── components.json             ← shadcn/ui config
```

---

## PART 5 — ARCHITECTURAL RULES (ENFORCED)

### 5.1 Data Flow — Never Break This Chain
```
src/data/*.ts          ← Static source of truth (never imported by UI directly)
      │
      ▼
src/lib/repository.ts  ← ONLY file that reads data/. All functions are async.
      │
      ▼
Next.js Page (Server Component) ← Calls repository, passes typed props down
      │
      ▼
Client Components ('use client') ← Receive typed props, handle interactivity
```

**Rule:** UI components NEVER import from `src/data/` directly. Always go through `repository.ts`.

### 5.2 Server vs Client Components
- Default to **React Server Components** (no directive needed)
- Add `'use client'` ONLY when the component requires: `useState`, `useEffect`, `useRouter`, `useSearchParams`, event handlers, or browser APIs
- Keep client components as leaf nodes — push state down, not up

### 5.3 Routing
- All routing is **App Router** (`src/app/` directory)
- Dynamic routes use `[slug]` segments
- Dynamic pages MUST implement `generateStaticParams()` for static generation at build time
- Dynamic pages MUST implement `generateMetadata()` for per-page SEO

### 5.4 Contact/Conversion Flow — THE Critical Feature
Every product page must prominently display two CTA buttons. This is the app's sole conversion mechanism:

```
Product Page
  ├── "Contact on WhatsApp" button (green #25D366)
  │     └── https://wa.me/[PHONE]?text=Hello%2C+I+am+interested+in+[Product+Name]...
  └── "Message on Messenger" button (blue #0084FF)
        └── https://m.me/store261?text=Hello%2C+I+am+interested+in+[Product+Name]...
```

Both links are generated by `generateWhatsAppLink(product.name)` and `generateMessengerLink(product.name)` from `src/lib/config.ts`. The phone number is stored ONLY in `config.ts`.

---

## PART 6 — TYPE CONTRACTS

All types live in `src/types/`. The core interfaces are:

```typescript
// ProductStatus
type ProductStatus = 'available' | 'limited' | 'out_of_stock';

// Product
interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;   // max 120 chars, used in cards
  description: string;        // full markdown-compatible
  price: number;
  currency: string;           // e.g. 'MGA', 'EUR'
  images: ProductImage[];
  categorySlug: string;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  status: ProductStatus;
  createdAt: string;          // ISO date string
}

// Category
interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount?: number;      // Populated at build time by repository
}

// BusinessConfig — lives in src/lib/config.ts
interface BusinessConfig {
  name: string;
  tagline: string;
  phone: string;              // WhatsApp number, no '+', e.g. '261382304974'
  messengerUsername: string;
  email: string;
  address: string;
  socialLinks: { facebook: string; instagram?: string; whatsapp: string; };
}
```

---

## PART 7 — CODE QUALITY STANDARDS (NON-NEGOTIABLE)

1. **No `any` types.** Use proper TypeScript generics or `unknown` with type guards.
2. **No `<img>` tags.** Always use `next/image`.
3. **No inline styles.** Use Tailwind classes exclusively.
4. **No magic strings.** Use constants from `config.ts`.
5. **No direct data imports in UI components.** Always use `repository.ts`.
6. **`strict: true` in tsconfig.json.** Never weaken compiler settings.
7. **Mobile-first Tailwind.** All classes start at the base (mobile) breakpoint. `md:` and `lg:` are additive.
8. **Comments on every non-trivial function.** Explain the "why", not the "what".
9. **Each component in its own file.** PascalCase for components (`ProductCard.tsx`), camelCase for utilities (`repository.ts`).
10. **`'use client'` is a last resort.** Justify its use with a comment if added.
11. **`generateStaticParams()` required** on all dynamic route pages (`[slug]/page.tsx`).
12. **`generateMetadata()` required** on all pages — static and dynamic.

---

## PART 8 — DESIGN SYSTEM

### Tailwind Brand Theme
```typescript
// tailwind.config.ts (or inline theme in globals.css for Tailwind v4)
colors: {
  brand: {
    dark:  '#1A1A2E',
    gold:  '#E8B84B',
    amber: '#F4A261',
    light: '#FAFAFA',
  },
},
fontFamily: {
  display: ['var(--font-display)', 'Georgia', 'serif'],
  body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
},
```

### CSS Custom Properties (globals.css)
```css
:root {
  --brand-dark:   #1A1A2E;
  --brand-gold:   #E8B84B;
  --brand-amber:  #F4A261;
  --brand-light:  #FAFAFA;
}
```

### Price Formatting
```typescript
// src/lib/utils.ts
export function formatPrice(amount: number, currency: string = 'MGA'): string {
  return new Intl.NumberFormat('fr-MG', {
    style: 'currency', currency, minimumFractionDigits: 0,
  }).format(amount);
}
```

---

## PART 9 — SEO REQUIREMENTS

- Every page exports `metadata` or `generateMetadata()`
- Product pages include JSON-LD `Product` schema (`application/ld+json`)
- `src/app/sitemap.ts` generates `sitemap.xml` from all products and categories
- `src/app/robots.ts` generates `robots.txt`
- All images have descriptive `alt` text
- Single `<h1>` per page, proper heading hierarchy

---

## PART 10 — ACCESSIBILITY REQUIREMENTS

- Minimum 4.5:1 color contrast ratio (WCAG AA)
- All interactive elements keyboard-focusable with visible focus styles
- `<nav>` with `aria-label`
- `<main>` landmark on every page
- Skip-to-main-content link at top of root layout
- Touch targets minimum 44×44px
- `<WhatsAppFAB>` must have `aria-label="Contact us on WhatsApp"`

---

## PART 11 — WHAT THIS PROJECT IS NOT

Do not add:
- Shopping cart or checkout flow
- Payment gateway (Stripe, PayPal, etc.)
- User authentication or accounts
- Admin dashboard (planned for Phase 2 as a route group `/admin`)
- A database — the data layer is static TypeScript files for this MVP
- `moment.js` or other heavy date libraries (use `Intl` APIs)
- `any` TypeScript type, ever

---

*This file is the single source of truth for all agents and collaborators on this project.*
*Do not create duplicate instruction files. All project context belongs here.*