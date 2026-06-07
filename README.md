# Store 261

> **Quality Products, Direct to You**

An online product catalog for Store261, a Madagascar-based retail business. Customers browse products and contact the seller via WhatsApp or Facebook Messenger to complete a purchase.

Built with **Next.js 16 App Router**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, and **PostgreSQL** via **Prisma ORM**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (`strict: true`) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Lucide React |
| Animation | Framer Motion |
| Database | PostgreSQL 16 |
| ORM | Prisma 7 |

---

## Local Development Setup

### Prerequisites

- Node.js 20+
- Docker (for the local PostgreSQL instance)

### 1. Clone and install dependencies

```bash
git clone https://github.com/marcravel/store261-web.git
cd store261-web
npm install
```

### 2. Start the PostgreSQL database

```bash
docker run --name store261-pg \
  -e POSTGRES_USER=store261_user \
  -e POSTGRES_PASSWORD=Bipopa \
  -e POSTGRES_DB=store261_db \
  -p 5432:5432 \
  -d postgres:16-alpine
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

`.env` must contain:

```env
DATABASE_URL="postgresql://store261_user:Bipopa@localhost:5432/store261_db?schema=public"
```

> ⚠️ `.env` is git-ignored and must **never** be committed.

### 4. Apply the database schema and generate the Prisma client

```bash
npx prisma migrate dev   # applies migrations to the local DB
npx prisma generate      # regenerates src/generated/prisma/ (git-ignored)
```

### 5. Seed the database

```bash
npx prisma db seed       # populates categories, products, and images
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Workflow

| Command | Purpose |
|---|---|
| `npx prisma migrate dev --name <description>` | Create and apply a new migration after schema changes |
| `npx prisma generate` | Regenerate the typed client after any schema change |
| `npx prisma db seed` | Re-seed all categories, products, and images |
| `npx prisma studio` | Open the visual database browser at `localhost:5555` |

> **Note:** `src/generated/` is git-ignored. Run `npx prisma generate` after every fresh clone or schema change.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router — all routing
│   ├── layout.tsx        # Root layout: fonts, Navbar, Footer, WhatsAppFAB
│   ├── page.tsx          # Home page (/)
│   ├── products/         # /products and /products/[slug]
│   └── categories/       # /categories/[slug]
├── components/
│   ├── ui/               # shadcn/ui primitives (CLI-generated)
│   ├── layout/           # Navbar, Footer, Logo, MobileMenu
│   ├── home/             # HeroSection, FeaturedProducts, etc.
│   ├── products/         # ProductCard, ProductGrid, ProductFilter
│   └── shared/           # SectionHeading, PageHero, WhatsAppFAB
├── lib/
│   ├── config.ts         # Business config + WhatsApp/Messenger link generators
│   ├── repository.ts     # All data access functions (sole consumer of Prisma)
│   ├── utils.ts          # cn(), formatPrice(), helpers
│   └── seo.ts            # generateMetadata() helpers
└── types/                # Shared TypeScript interfaces

prisma/
├── schema.prisma         # Single relational source of truth
├── seed.ts               # Database seed script
└── migrations/           # Applied migration history
```

---

## Available Scripts

```bash
npm run dev       # Start development server (Turbopack)
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Contact & Purchase Flow

This is a **catalog-only** application — there is no cart or checkout. Every product page surfaces two contact buttons:

- **WhatsApp** → `https://wa.me/261382304974?text=...`
- **Facebook Messenger** → `https://m.me/store261?text=...`

The phone number and Messenger handle are configured exclusively in [`src/lib/config.ts`](src/lib/config.ts).
