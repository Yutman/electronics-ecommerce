# Electronics E-commerce App

A modern e-commerce application built with Next.js, TypeScript, and a comprehensive tech stack.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **State Management**: Zustand
- **Linting**: ESLint

## Features

- 🛍️ Product catalog with categories (Smartphones, Laptops, Tablets, Audio, Gaming, Wearables)
- 📱 Responsive design with TailwindCSS
- 🗃️ PostgreSQL database with Drizzle ORM
- 🔄 State management with Zustand
- 🎨 Modern UI components
- 📊 Sample data seeding

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Neon PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd electronics-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database URL:
```
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

4. Generate and push database schema:
```bash
npm run db:push
```

5. Seed the database with sample products:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

The application includes a `products` table with the following fields:
- `id`: Primary key
- `name`: Product name
- `description`: Product description
- `price`: Product price (decimal)
- `category`: Product category
- `brand`: Product brand
- `imageUrl`: Product image URL
- `stock`: Available stock
- `createdAt`: Creation timestamp
- `updatedAt`: Update timestamp

## Sample Data

The seed script includes 8 sample electronic products:
- iPhone 15 Pro
- Samsung Galaxy S24 Ultra
- MacBook Pro 14"
- Dell XPS 13
- iPad Pro 12.9"
- Sony WH-1000XM5
- Nintendo Switch OLED
- Apple Watch Series 9

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
src/
├── app/
│   ├── api/products/     # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   └── ProductCard.tsx   # Product card component
└── lib/
    ├── db/
    │   ├── index.ts      # Database connection
    │   ├── schema.ts     # Database schema
    │   └── seed.ts       # Database seeding
    └── store/
        └── products.ts   # Zustand store
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License