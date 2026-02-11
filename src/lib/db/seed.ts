import { db } from './index';
import {
  products,
  categories,
  brands,
  colors,
  genders,
  productVariants,
  productImages,
} from './schema';

const seedCategories = [
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Tablets', slug: 'tablets' },
  { name: 'Audio', slug: 'audio' },
  { name: 'Gaming', slug: 'gaming' },
  { name: 'Wearables', slug: 'wearables' },
];

const seedBrands = [
  { name: 'Apple', slug: 'apple' },
  { name: 'Samsung', slug: 'samsung' },
  { name: 'Dell', slug: 'dell' },
  { name: 'Sony', slug: 'sony' },
  { name: 'Nintendo', slug: 'nintendo' },
];

const seedColors = [
  { name: 'Black', hexCode: '#000000' },
  { name: 'White', hexCode: '#FFFFFF' },
  { name: 'Silver', hexCode: '#C0C0C0' },
  { name: 'Blue', hexCode: '#0000FF' },
  { name: 'Gold', hexCode: '#FFD700' },
];

const seedGenders = [
  { name: 'Unisex' },
  { name: 'Men' },
  { name: 'Women' },
];

interface SeedProduct {
  name: string;
  description: string;
  slug: string;
  categorySlug: string;
  brandSlug: string;
  isFeatured: boolean;
  variants: {
    colorName: string;
    size: string | null;
    price: string;
    stock: number;
    isDefault: boolean;
  }[];
  imageUrl: string;
}

const seedProducts: SeedProduct[] = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    slug: 'iphone-15-pro',
    categorySlug: 'smartphones',
    brandSlug: 'apple',
    isFeatured: true,
    variants: [
      { colorName: 'Black', size: '128GB', price: '999.00', stock: 50, isDefault: true },
      { colorName: 'White', size: '256GB', price: '1099.00', stock: 30, isDefault: false },
      { colorName: 'Gold', size: '512GB', price: '1299.00', stock: 20, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen, 200MP camera, and AI features',
    slug: 'samsung-galaxy-s24-ultra',
    categorySlug: 'smartphones',
    brandSlug: 'samsung',
    isFeatured: false,
    variants: [
      { colorName: 'Black', size: '256GB', price: '1199.00', stock: 30, isDefault: true },
      { colorName: 'Silver', size: '512GB', price: '1399.00', stock: 15, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
  },
  {
    name: 'MacBook Pro 14"',
    description: 'Powerful laptop with M3 chip, Liquid Retina XDR display, and all-day battery life',
    slug: 'macbook-pro-14',
    categorySlug: 'laptops',
    brandSlug: 'apple',
    isFeatured: true,
    variants: [
      { colorName: 'Silver', size: '512GB', price: '1999.00', stock: 25, isDefault: true },
      { colorName: 'Black', size: '1TB', price: '2499.00', stock: 10, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
  },
  {
    name: 'Dell XPS 13',
    description: 'Ultra-portable laptop with Intel Core i7, 13.4" InfinityEdge display',
    slug: 'dell-xps-13',
    categorySlug: 'laptops',
    brandSlug: 'dell',
    isFeatured: false,
    variants: [
      { colorName: 'Silver', size: '256GB', price: '1299.00', stock: 40, isDefault: true },
      { colorName: 'Blue', size: '512GB', price: '1499.00', stock: 20, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support',
    slug: 'ipad-pro-12-9',
    categorySlug: 'tablets',
    brandSlug: 'apple',
    isFeatured: false,
    variants: [
      { colorName: 'Silver', size: '128GB', price: '1099.00', stock: 35, isDefault: true },
      { colorName: 'Black', size: '256GB', price: '1199.00', stock: 20, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life',
    slug: 'sony-wh-1000xm5',
    categorySlug: 'audio',
    brandSlug: 'sony',
    isFeatured: true,
    variants: [
      { colorName: 'Black', size: null, price: '399.00', stock: 60, isDefault: true },
      { colorName: 'White', size: null, price: '399.00', stock: 40, isDefault: false },
      { colorName: 'Blue', size: null, price: '399.00', stock: 25, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Hybrid gaming console with vibrant OLED screen and versatile gameplay modes',
    slug: 'nintendo-switch-oled',
    categorySlug: 'gaming',
    brandSlug: 'nintendo',
    isFeatured: false,
    variants: [
      { colorName: 'White', size: null, price: '349.00', stock: 45, isDefault: true },
      { colorName: 'Blue', size: null, price: '349.00', stock: 30, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and cellular connectivity',
    slug: 'apple-watch-series-9',
    categorySlug: 'wearables',
    brandSlug: 'apple',
    isFeatured: false,
    variants: [
      { colorName: 'Silver', size: '41mm', price: '399.00', stock: 55, isDefault: true },
      { colorName: 'Gold', size: '45mm', price: '429.00', stock: 40, isDefault: false },
      { colorName: 'Black', size: '45mm', price: '429.00', stock: 35, isDefault: false },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
  },
];

export async function seedDatabase() {
  try {
    console.log('Seeding database...');

    const insertedCategories = await db
      .insert(categories)
      .values(seedCategories)
      .returning();
    const categoryMap = new Map(insertedCategories.map((c) => [c.slug, c.id]));

    const insertedBrands = await db
      .insert(brands)
      .values(seedBrands)
      .returning();
    const brandMap = new Map(insertedBrands.map((b) => [b.slug, b.id]));

    const insertedColors = await db
      .insert(colors)
      .values(seedColors)
      .returning();
    const colorMap = new Map(insertedColors.map((c) => [c.name, c.id]));

    await db.insert(genders).values(seedGenders);

    for (const sp of seedProducts) {
      const [insertedProduct] = await db
        .insert(products)
        .values({
          name: sp.name,
          description: sp.description,
          slug: sp.slug,
          categoryId: categoryMap.get(sp.categorySlug)!,
          brandId: brandMap.get(sp.brandSlug)!,
          isFeatured: sp.isFeatured,
        })
        .returning();

      const variantValues = sp.variants.map((v) => ({
        productId: insertedProduct.id,
        colorId: colorMap.get(v.colorName)!,
        size: v.size,
        price: v.price,
        stock: v.stock,
        isDefault: v.isDefault,
      }));
      await db.insert(productVariants).values(variantValues);

      await db.insert(productImages).values({
        productId: insertedProduct.id,
        url: sp.imageUrl,
        altText: sp.name,
        sortOrder: 0,
      });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}
