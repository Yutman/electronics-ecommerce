import { db } from './index';
import {
  brands,
  conditions,
  cpus,
  rams,
  screenSizes,
  storages,
  connectivities,
  colors,
  simSlots,
  bandSizes,
  bandTypes,
  faceSizes,
  series,
  categories,
  collections,
  products,
  productVariants,
  productImages,
  productCollections,
} from './schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

const STATIC_UPLOADS_DIR = path.join(process.cwd(), 'public', 'static', 'uploads');
const SOURCE_IMAGES_DIR = path.join(process.cwd(), 'public', 'laptops');

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyImagesToStatic(): string[] {
  ensureDirectoryExists(STATIC_UPLOADS_DIR);
  const imageFiles = fs.readdirSync(SOURCE_IMAGES_DIR).filter(f => f.endsWith('.jpg'));
  const copiedImages: string[] = [];

  for (const file of imageFiles) {
    const sourcePath = path.join(SOURCE_IMAGES_DIR, file);
    const destPath = path.join(STATIC_UPLOADS_DIR, file);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
    }
    copiedImages.push(`/static/uploads/${file}`);
  }

  console.log(`Copied ${copiedImages.length} images to static/uploads`);
  return copiedImages;
}

async function seedBrands() {
  console.log('Seeding brands...');
  const brandData = [
    { name: 'Apple', slug: 'apple', logoUrl: null },
    { name: 'Samsung', slug: 'samsung', logoUrl: null },
    { name: 'Dell', slug: 'dell', logoUrl: null },
    { name: 'HP', slug: 'hp', logoUrl: null },
    { name: 'Lenovo', slug: 'lenovo', logoUrl: null },
    { name: 'Sony', slug: 'sony', logoUrl: null },
    { name: 'Bose', slug: 'bose', logoUrl: null },
    { name: 'JBL', slug: 'jbl', logoUrl: null },
    { name: 'Anker', slug: 'anker', logoUrl: null },
    { name: 'Xiaomi', slug: 'xiaomi', logoUrl: null },
    { name: 'Google', slug: 'google', logoUrl: null },
    { name: 'Logitech', slug: 'logitech', logoUrl: null },
  ];
  return await db.insert(brands).values(brandData).returning();
}

async function seedConditions() {
  console.log('Seeding conditions...');
  const conditionData = [
    { label: 'New', slug: 'new', description: 'Brand new, unopened product with full manufacturer warranty' },
    { label: 'Excellent', slug: 'excellent', description: 'Like new condition with minimal signs of use. Fully tested and certified.' },
    { label: 'Good', slug: 'good', description: 'Minor cosmetic wear. Fully functional with all features working perfectly.' },
    { label: 'Fair', slug: 'fair', description: 'Visible signs of use but fully functional. Great value option.' },
  ];
  return await db.insert(conditions).values(conditionData).returning();
}

async function seedCpus() {
  console.log('Seeding CPUs...');
  const cpuData = [
    { name: 'Apple M1', slug: 'apple-m1', cores: 8 },
    { name: 'Apple M2', slug: 'apple-m2', cores: 8 },
    { name: 'Apple M3', slug: 'apple-m3', cores: 8 },
    { name: 'Intel Core i5', slug: 'intel-core-i5', cores: 6 },
    { name: 'Intel Core i7', slug: 'intel-core-i7', cores: 8 },
    { name: 'Intel Core i9', slug: 'intel-core-i9', cores: 12 },
    { name: 'AMD Ryzen 5', slug: 'amd-ryzen-5', cores: 6 },
    { name: 'AMD Ryzen 7', slug: 'amd-ryzen-7', cores: 8 },
    { name: 'Apple A17 Pro', slug: 'apple-a17-pro', cores: 6 },
    { name: 'Snapdragon 8 Gen 3', slug: 'snapdragon-8-gen-3', cores: 8 },
  ];
  return await db.insert(cpus).values(cpuData).returning();
}

async function seedRams() {
  console.log('Seeding RAMs...');
  const ramData = [
    { sizeGb: 4, type: 'DDR4' },
    { sizeGb: 8, type: 'DDR4' },
    { sizeGb: 8, type: 'DDR5' },
    { sizeGb: 16, type: 'DDR4' },
    { sizeGb: 16, type: 'DDR5' },
    { sizeGb: 32, type: 'DDR5' },
    { sizeGb: 64, type: 'DDR5' },
  ];
  return await db.insert(rams).values(ramData).returning();
}

async function seedScreenSizes() {
  console.log('Seeding screen sizes...');
  const screenSizeData = [
    { sizeInches: '6.1', resolution: '2556x1179' },
    { sizeInches: '6.7', resolution: '2796x1290' },
    { sizeInches: '6.8', resolution: '3120x1440' },
    { sizeInches: '13.3', resolution: '2560x1600' },
    { sizeInches: '14.0', resolution: '3024x1964' },
    { sizeInches: '15.6', resolution: '1920x1080' },
    { sizeInches: '16.0', resolution: '3456x2234' },
    { sizeInches: '24.0', resolution: '1920x1080' },
    { sizeInches: '27.0', resolution: '2560x1440' },
    { sizeInches: '1.9', resolution: '484x396' },
    { sizeInches: '2.0', resolution: '502x410' },
  ];
  return await db.insert(screenSizes).values(screenSizeData).returning();
}

async function seedStorages() {
  console.log('Seeding storages...');
  const storageData = [
    { capacityGb: 64, type: 'eMMC' as const },
    { capacityGb: 128, type: 'SSD' as const },
    { capacityGb: 256, type: 'SSD' as const },
    { capacityGb: 512, type: 'SSD' as const },
    { capacityGb: 1024, type: 'SSD' as const },
    { capacityGb: 2048, type: 'SSD' as const },
    { capacityGb: 500, type: 'HDD' as const },
    { capacityGb: 1000, type: 'HDD' as const },
  ];
  return await db.insert(storages).values(storageData).returning();
}

async function seedConnectivities() {
  console.log('Seeding connectivities...');
  const connectivityData = [
    { type: 'Bluetooth 5.0' },
    { type: 'Bluetooth 5.3' },
    { type: 'Wi-Fi 6' },
    { type: 'Wi-Fi 6E' },
    { type: '5G Cellular' },
    { type: 'LTE' },
  ];
  return await db.insert(connectivities).values(connectivityData).returning();
}

async function seedColors() {
  console.log('Seeding colors...');
  const colorData = [
    { name: 'Space Gray', slug: 'space-gray', hexCode: '#A9ACAF' },
    { name: 'Silver', slug: 'silver', hexCode: '#C0C0C0' },
    { name: 'Gold', slug: 'gold', hexCode: '#FFD700' },
    { name: 'Midnight', slug: 'midnight', hexCode: '#1C1C1E' },
    { name: 'Starlight', slug: 'starlight', hexCode: '#F5F5DC' },
    { name: 'Blue', slug: 'blue', hexCode: '#007AFF' },
    { name: 'Purple', slug: 'purple', hexCode: '#AF52DE' },
    { name: 'Black', slug: 'black', hexCode: '#000000' },
    { name: 'White', slug: 'white', hexCode: '#FFFFFF' },
    { name: 'Graphite', slug: 'graphite', hexCode: '#41424C' },
    { name: 'Natural Titanium', slug: 'natural-titanium', hexCode: '#9A9A9A' },
    { name: 'Blue Titanium', slug: 'blue-titanium', hexCode: '#394E5C' },
  ];
  return await db.insert(colors).values(colorData).returning();
}

async function seedSimSlots() {
  console.log('Seeding SIM slots...');
  const simSlotData = [
    { type: 'single' as const },
    { type: 'dual' as const },
    { type: 'eSIM' as const },
  ];
  return await db.insert(simSlots).values(simSlotData).returning();
}

async function seedBandSizes() {
  console.log('Seeding band sizes...');
  const bandSizeData = [
    { sizeMm: 38 },
    { sizeMm: 40 },
    { sizeMm: 41 },
    { sizeMm: 42 },
    { sizeMm: 44 },
    { sizeMm: 45 },
    { sizeMm: 49 },
  ];
  return await db.insert(bandSizes).values(bandSizeData).returning();
}

async function seedBandTypes() {
  console.log('Seeding band types...');
  const bandTypeData = [
    { material: 'Silicone' },
    { material: 'Leather' },
    { material: 'Metal' },
    { material: 'Nylon' },
    { material: 'Braided Solo Loop' },
  ];
  return await db.insert(bandTypes).values(bandTypeData).returning();
}

async function seedFaceSizes() {
  console.log('Seeding face sizes...');
  const faceSizeData = [
    { sizeMm: 40 },
    { sizeMm: 41 },
    { sizeMm: 44 },
    { sizeMm: 45 },
    { sizeMm: 49 },
  ];
  return await db.insert(faceSizes).values(faceSizeData).returning();
}

async function seedSeries() {
  console.log('Seeding series...');
  const seriesData = [
    { name: 'OptiPlex', slug: 'optiplex' },
    { name: 'ProDesk', slug: 'prodesk' },
    { name: 'EliteDesk', slug: 'elitedesk' },
    { name: 'ThinkCentre', slug: 'thinkcentre' },
    { name: 'Mac Mini', slug: 'mac-mini' },
  ];
  return await db.insert(series).values(seriesData).returning();
}

async function seedCategories() {
  console.log('Seeding categories...');
  const categoryData = [
    { name: 'Laptops', slug: 'laptops', parentId: null },
    { name: 'Smartphones', slug: 'smartphones', parentId: null },
    { name: 'Desktops', slug: 'desktops', parentId: null },
    { name: 'Computer Accessories', slug: 'computer-accessories', parentId: null },
    { name: 'Smartwatches', slug: 'smartwatches', parentId: null },
    { name: 'Powerbanks', slug: 'powerbanks', parentId: null },
    { name: 'Audio', slug: 'audio', parentId: null },
  ];
  return await db.insert(categories).values(categoryData).returning();
}

async function seedCollections() {
  console.log('Seeding collections...');
  const collectionData = [
    { name: 'Back-to-School Deals', slug: 'back-to-school' },
    { name: 'Best Sellers', slug: 'best-sellers' },
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'Premium Refurbished', slug: 'premium-refurbished' },
    { name: 'Budget Friendly', slug: 'budget-friendly' },
  ];
  return await db.insert(collections).values(collectionData).returning();
}

interface FilterData {
  brands: Awaited<ReturnType<typeof seedBrands>>;
  conditions: Awaited<ReturnType<typeof seedConditions>>;
  cpus: Awaited<ReturnType<typeof seedCpus>>;
  rams: Awaited<ReturnType<typeof seedRams>>;
  screenSizes: Awaited<ReturnType<typeof seedScreenSizes>>;
  storages: Awaited<ReturnType<typeof seedStorages>>;
  connectivities: Awaited<ReturnType<typeof seedConnectivities>>;
  colors: Awaited<ReturnType<typeof seedColors>>;
  simSlots: Awaited<ReturnType<typeof seedSimSlots>>;
  bandSizes: Awaited<ReturnType<typeof seedBandSizes>>;
  bandTypes: Awaited<ReturnType<typeof seedBandTypes>>;
  faceSizes: Awaited<ReturnType<typeof seedFaceSizes>>;
  series: Awaited<ReturnType<typeof seedSeries>>;
  categories: Awaited<ReturnType<typeof seedCategories>>;
  collections: Awaited<ReturnType<typeof seedCollections>>;
}

function findBySlug<T extends { slug: string }>(items: T[], slug: string): T {
  const item = items.find(i => i.slug === slug);
  if (!item) throw new Error(`Item with slug "${slug}" not found`);
  return item;
}

function findByType<T extends { type: string }>(items: T[], type: string): T {
  const item = items.find(i => i.type === type);
  if (!item) throw new Error(`Item with type "${type}" not found`);
  return item;
}

function findBySizeMm<T extends { sizeMm: number }>(items: T[], sizeMm: number): T {
  const item = items.find(i => i.sizeMm === sizeMm);
  if (!item) throw new Error(`Item with sizeMm "${sizeMm}" not found`);
  return item;
}

function findByMaterial<T extends { material: string }>(items: T[], material: string): T {
  const item = items.find(i => i.material === material);
  if (!item) throw new Error(`Item with material "${material}" not found`);
  return item;
}

interface VariantInput {
  sku: string;
  price: string;
  salePrice: string | null;
  inStock: number;
  cpuSlug?: string;
  ramGb?: number;
  storageGb?: number;
  colorSlug?: string;
  simSlotType?: string;
  seriesSlug?: string;
  bandSizeMm?: number;
  bandMaterial?: string;
  faceSizeMm?: number;
  connectivityType?: string;
}

interface ProductInput {
  name: string;
  description: string;
  categorySlug: string;
  brandSlug: string;
  conditionSlug: string;
  isPublished: boolean;
  batteryHealth: number | null;
  variants: VariantInput[];
  imageIndices: number[];
}

async function seedProducts(filters: FilterData, images: string[]) {
  console.log('Seeding products and variants...');

  const productData: ProductInput[] = [
    // LAPTOPS (3)
    {
      name: 'MacBook Pro 14"',
      description: 'Powerful laptop with M3 chip, Liquid Retina XDR display, and all-day battery life. Perfect for professionals and creatives.',
      categorySlug: 'laptops',
      brandSlug: 'apple',
      conditionSlug: 'excellent',
      isPublished: true,
      batteryHealth: 95,
      variants: [
        { sku: 'MBP14-M3-8-256-SG', price: '1599.00', salePrice: '1499.00', cpuSlug: 'apple-m3', ramGb: 8, storageGb: 256, colorSlug: 'space-gray', inStock: 15 },
        { sku: 'MBP14-M3-16-512-SG', price: '1999.00', salePrice: null, cpuSlug: 'apple-m3', ramGb: 16, storageGb: 512, colorSlug: 'space-gray', inStock: 10 },
        { sku: 'MBP14-M3-16-512-SL', price: '1999.00', salePrice: null, cpuSlug: 'apple-m3', ramGb: 16, storageGb: 512, colorSlug: 'silver', inStock: 8 },
      ],
      imageIndices: [0, 1],
    },
    {
      name: 'Dell XPS 15',
      description: 'Ultra-portable laptop with Intel Core i7, 15.6" InfinityEdge OLED display, and premium build quality.',
      categorySlug: 'laptops',
      brandSlug: 'dell',
      conditionSlug: 'good',
      isPublished: true,
      batteryHealth: 88,
      variants: [
        { sku: 'XPS15-I7-16-512-SL', price: '1299.00', salePrice: '1199.00', cpuSlug: 'intel-core-i7', ramGb: 16, storageGb: 512, colorSlug: 'silver', inStock: 12 },
        { sku: 'XPS15-I7-32-1024-SL', price: '1699.00', salePrice: null, cpuSlug: 'intel-core-i7', ramGb: 32, storageGb: 1024, colorSlug: 'silver', inStock: 5 },
      ],
      imageIndices: [2, 3],
    },
    {
      name: 'Lenovo ThinkPad X1 Carbon',
      description: 'Business ultrabook with Intel Core i5, 14" display, legendary ThinkPad keyboard, and military-grade durability.',
      categorySlug: 'laptops',
      brandSlug: 'lenovo',
      conditionSlug: 'new',
      isPublished: true,
      batteryHealth: 100,
      variants: [
        { sku: 'X1C-I5-8-256-BK', price: '1099.00', salePrice: null, cpuSlug: 'intel-core-i5', ramGb: 8, storageGb: 256, colorSlug: 'black', inStock: 20 },
        { sku: 'X1C-I7-16-512-BK', price: '1499.00', salePrice: '1399.00', cpuSlug: 'intel-core-i7', ramGb: 16, storageGb: 512, colorSlug: 'black', inStock: 15 },
      ],
      imageIndices: [4, 5],
    },

    // SMARTPHONES (3)
    {
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system with 5x optical zoom.',
      categorySlug: 'smartphones',
      brandSlug: 'apple',
      conditionSlug: 'excellent',
      isPublished: true,
      batteryHealth: 97,
      variants: [
        { sku: 'IP15P-128-NT', price: '999.00', salePrice: '949.00', storageGb: 128, colorSlug: 'natural-titanium', simSlotType: 'eSIM', inStock: 25 },
        { sku: 'IP15P-256-BT', price: '1099.00', salePrice: null, storageGb: 256, colorSlug: 'blue-titanium', simSlotType: 'eSIM', inStock: 18 },
        { sku: 'IP15P-512-BK', price: '1299.00', salePrice: null, storageGb: 512, colorSlug: 'black', simSlotType: 'eSIM', inStock: 10 },
      ],
      imageIndices: [6, 7],
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android smartphone with S Pen, 200MP camera, AI features, and stunning 6.8" Dynamic AMOLED display.',
      categorySlug: 'smartphones',
      brandSlug: 'samsung',
      conditionSlug: 'good',
      isPublished: true,
      batteryHealth: 92,
      variants: [
        { sku: 'S24U-256-BK', price: '1199.00', salePrice: '1099.00', storageGb: 256, colorSlug: 'black', simSlotType: 'dual', inStock: 20 },
        { sku: 'S24U-512-PU', price: '1319.00', salePrice: null, storageGb: 512, colorSlug: 'purple', simSlotType: 'dual', inStock: 12 },
      ],
      imageIndices: [8],
    },
    {
      name: 'Google Pixel 8 Pro',
      description: 'Google flagship with Tensor G3 chip, best-in-class computational photography, and 7 years of updates.',
      categorySlug: 'smartphones',
      brandSlug: 'google',
      conditionSlug: 'new',
      isPublished: true,
      batteryHealth: 100,
      variants: [
        { sku: 'PX8P-128-BL', price: '899.00', salePrice: null, storageGb: 128, colorSlug: 'blue', simSlotType: 'eSIM', inStock: 30 },
        { sku: 'PX8P-256-WH', price: '999.00', salePrice: '949.00', storageGb: 256, colorSlug: 'white', simSlotType: 'eSIM', inStock: 22 },
      ],
      imageIndices: [9],
    },

    // DESKTOPS (2)
    {
      name: 'Dell OptiPlex 7010',
      description: 'Compact business desktop with Intel Core i5, perfect for office productivity and enterprise deployments.',
      categorySlug: 'desktops',
      brandSlug: 'dell',
      conditionSlug: 'good',
      isPublished: true,
      batteryHealth: null,
      variants: [
        { sku: 'OPT7010-I5-8-256', price: '549.00', salePrice: '499.00', cpuSlug: 'intel-core-i5', ramGb: 8, storageGb: 256, seriesSlug: 'optiplex', inStock: 25 },
        { sku: 'OPT7010-I5-16-512', price: '699.00', salePrice: null, cpuSlug: 'intel-core-i5', ramGb: 16, storageGb: 512, seriesSlug: 'optiplex', inStock: 18 },
      ],
      imageIndices: [10],
    },
    {
      name: 'Apple Mac Mini M2',
      description: 'Compact powerhouse with Apple M2 chip, perfect for creative workflows and everyday computing.',
      categorySlug: 'desktops',
      brandSlug: 'apple',
      conditionSlug: 'excellent',
      isPublished: true,
      batteryHealth: null,
      variants: [
        { sku: 'MACMINI-M2-8-256', price: '599.00', salePrice: null, cpuSlug: 'apple-m2', ramGb: 8, storageGb: 256, seriesSlug: 'mac-mini', inStock: 15 },
        { sku: 'MACMINI-M2-16-512', price: '899.00', salePrice: '849.00', cpuSlug: 'apple-m2', ramGb: 16, storageGb: 512, seriesSlug: 'mac-mini', inStock: 10 },
      ],
      imageIndices: [11],
    },

    // SMARTWATCHES (2)
    {
      name: 'Apple Watch Series 9',
      description: 'Advanced smartwatch with health monitoring, fitness tracking, and cellular connectivity. Features the new S9 chip.',
      categorySlug: 'smartwatches',
      brandSlug: 'apple',
      conditionSlug: 'excellent',
      isPublished: true,
      batteryHealth: 96,
      variants: [
        { sku: 'AWS9-41-SL-SIL', price: '399.00', salePrice: null, colorSlug: 'silver', faceSizeMm: 41, bandSizeMm: 41, bandMaterial: 'Silicone', inStock: 20 },
        { sku: 'AWS9-45-MN-LTH', price: '449.00', salePrice: '429.00', colorSlug: 'midnight', faceSizeMm: 45, bandSizeMm: 45, bandMaterial: 'Leather', inStock: 15 },
        { sku: 'AWS9-45-GD-MTL', price: '699.00', salePrice: null, colorSlug: 'gold', faceSizeMm: 45, bandSizeMm: 45, bandMaterial: 'Metal', inStock: 8 },
      ],
      imageIndices: [12],
    },
    {
      name: 'Samsung Galaxy Watch 6',
      description: 'Premium Android smartwatch with advanced health features, sleep coaching, and beautiful rotating bezel.',
      categorySlug: 'smartwatches',
      brandSlug: 'samsung',
      conditionSlug: 'new',
      isPublished: true,
      batteryHealth: 100,
      variants: [
        { sku: 'GW6-40-BK-SIL', price: '299.00', salePrice: '279.00', colorSlug: 'black', faceSizeMm: 40, bandSizeMm: 40, bandMaterial: 'Silicone', inStock: 25 },
        { sku: 'GW6-44-SL-SIL', price: '329.00', salePrice: null, colorSlug: 'silver', faceSizeMm: 44, bandSizeMm: 44, bandMaterial: 'Silicone', inStock: 20 },
      ],
      imageIndices: [13],
    },

    // POWERBANKS (2)
    {
      name: 'Anker PowerCore 26800',
      description: 'High-capacity portable charger with 26800mAh battery, dual USB ports, and PowerIQ technology for fast charging.',
      categorySlug: 'powerbanks',
      brandSlug: 'anker',
      conditionSlug: 'new',
      isPublished: true,
      batteryHealth: null,
      variants: [
        { sku: 'ANKER-26800-BK', price: '65.99', salePrice: '59.99', colorSlug: 'black', inStock: 50 },
        { sku: 'ANKER-26800-WH', price: '65.99', salePrice: null, colorSlug: 'white', inStock: 35 },
      ],
      imageIndices: [14],
    },
    {
      name: 'Xiaomi Mi Power Bank 3',
      description: 'Slim 20000mAh power bank with USB-C input/output, fast charging support, and premium aluminum design.',
      categorySlug: 'powerbanks',
      brandSlug: 'xiaomi',
      conditionSlug: 'excellent',
      isPublished: true,
      batteryHealth: null,
      variants: [
        { sku: 'XMPB3-20000-BK', price: '39.99', salePrice: '34.99', colorSlug: 'black', inStock: 60 },
        { sku: 'XMPB3-20000-SL', price: '39.99', salePrice: null, colorSlug: 'silver', inStock: 45 },
      ],
      imageIndices: [0],
    },

    // AUDIO (2)
    {
      name: 'Sony WH-1000XM5',
      description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life and exceptional sound quality.',
      categorySlug: 'audio',
      brandSlug: 'sony',
      conditionSlug: 'excellent',
      isPublished: true,
      batteryHealth: null,
      variants: [
        { sku: 'SONY-XM5-BK', price: '399.00', salePrice: '349.00', colorSlug: 'black', connectivityType: 'Bluetooth 5.3', inStock: 30 },
        { sku: 'SONY-XM5-SL', price: '399.00', salePrice: null, colorSlug: 'silver', connectivityType: 'Bluetooth 5.3', inStock: 25 },
      ],
      imageIndices: [1],
    },
    {
      name: 'JBL Flip 6',
      description: 'Portable Bluetooth speaker with powerful sound, IP67 waterproof rating, and 12 hours of playtime.',
      categorySlug: 'audio',
      brandSlug: 'jbl',
      conditionSlug: 'new',
      isPublished: true,
      batteryHealth: null,
      variants: [
        { sku: 'JBL-FLIP6-BK', price: '129.99', salePrice: null, colorSlug: 'black', connectivityType: 'Bluetooth 5.0', inStock: 40 },
        { sku: 'JBL-FLIP6-BL', price: '129.99', salePrice: '119.99', colorSlug: 'blue', connectivityType: 'Bluetooth 5.0', inStock: 35 },
        { sku: 'JBL-FLIP6-RD', price: '129.99', salePrice: null, colorSlug: 'purple', connectivityType: 'Bluetooth 5.0', inStock: 28 },
      ],
      imageIndices: [2],
    },

    // COMPUTER ACCESSORIES (1)
    {
      name: 'Logitech MX Master 3S',
      description: 'Advanced wireless mouse with 8K DPI sensor, quiet clicks, and MagSpeed electromagnetic scrolling.',
      categorySlug: 'computer-accessories',
      brandSlug: 'logitech',
      conditionSlug: 'new',
      isPublished: true,
      batteryHealth: null,
      variants: [
        { sku: 'MX-MASTER3S-GR', price: '99.99', salePrice: null, colorSlug: 'graphite', connectivityType: 'Bluetooth 5.0', inStock: 45 },
        { sku: 'MX-MASTER3S-WH', price: '99.99', salePrice: '89.99', colorSlug: 'white', connectivityType: 'Bluetooth 5.0', inStock: 38 },
      ],
      imageIndices: [3],
    },
  ];

  const createdProducts = [];

  for (const product of productData) {
    const category = findBySlug(filters.categories, product.categorySlug);
    const brand = findBySlug(filters.brands, product.brandSlug);
    const condition = findBySlug(filters.conditions, product.conditionSlug);

    const [createdProduct] = await db.insert(products).values({
      name: product.name,
      description: product.description,
      categoryId: category.id,
      brandId: brand.id,
      conditionId: condition.id,
      isPublished: product.isPublished,
      batteryHealth: product.batteryHealth,
    }).returning();

    console.log(`Created product: ${product.name}`);

    let defaultVariantId: string | null = null;

    for (let i = 0; i < product.variants.length; i++) {
      const variant = product.variants[i];
      
      const variantData: Record<string, unknown> = {
        productId: createdProduct.id,
        sku: variant.sku,
        price: variant.price,
        salePrice: variant.salePrice,
        inStock: variant.inStock,
      };

      if (variant.cpuSlug) {
        variantData.cpuId = findBySlug(filters.cpus, variant.cpuSlug).id;
      }
      if (variant.ramGb) {
        const ram = filters.rams.find(r => r.sizeGb === variant.ramGb);
        if (ram) variantData.ramId = ram.id;
      }
      if (variant.storageGb) {
        const storage = filters.storages.find(s => s.capacityGb === variant.storageGb && s.type === 'SSD');
        if (storage) variantData.storageId = storage.id;
      }
      if (variant.colorSlug) {
        variantData.colorId = findBySlug(filters.colors, variant.colorSlug).id;
      }
      if (variant.simSlotType) {
        variantData.simSlotId = findByType(filters.simSlots, variant.simSlotType).id;
      }
      if (variant.seriesSlug) {
        variantData.seriesId = findBySlug(filters.series, variant.seriesSlug).id;
      }
      if (variant.bandSizeMm) {
        variantData.bandSizeId = findBySizeMm(filters.bandSizes, variant.bandSizeMm).id;
      }
      if (variant.bandMaterial) {
        variantData.bandTypeId = findByMaterial(filters.bandTypes, variant.bandMaterial).id;
      }
      if (variant.faceSizeMm) {
        variantData.faceSizeId = findBySizeMm(filters.faceSizes, variant.faceSizeMm).id;
      }
      if (variant.connectivityType) {
        variantData.connectivityId = findByType(filters.connectivities, variant.connectivityType).id;
      }

      const [createdVariant] = await db.insert(productVariants).values(variantData as typeof productVariants.$inferInsert).returning();

      if (i === 0) {
        defaultVariantId = createdVariant.id;
      }

      console.log(`  Created variant: ${variant.sku}`);
    }

    // Update product with default variant
    if (defaultVariantId) {
      await db.update(products).set({ defaultVariantId }).where(eq(products.id, createdProduct.id));
    }

    // Create product images
    for (let i = 0; i < product.imageIndices.length; i++) {
      const imageIndex = product.imageIndices[i];
      if (imageIndex < images.length) {
        await db.insert(productImages).values({
          productId: createdProduct.id,
          url: images[imageIndex],
          sortOrder: i,
          isPrimary: i === 0,
        });
      }
    }

    createdProducts.push(createdProduct);
  }

  return { products: createdProducts };
}

async function seedProductCollections(
  createdProducts: { id: string; name: string }[],
  collectionList: { id: string; slug: string }[]
) {
  console.log('Seeding product collections...');

  const bestSellers = findBySlug(collectionList, 'best-sellers');
  const newArrivals = findBySlug(collectionList, 'new-arrivals');
  const premiumRefurbished = findBySlug(collectionList, 'premium-refurbished');
  const budgetFriendly = findBySlug(collectionList, 'budget-friendly');

  const collectionAssignments = [
    { productNames: ['iPhone 15 Pro', 'MacBook Pro 14"', 'Sony WH-1000XM5'], collectionId: bestSellers.id },
    { productNames: ['Google Pixel 8 Pro', 'Samsung Galaxy Watch 6', 'JBL Flip 6'], collectionId: newArrivals.id },
    { productNames: ['Dell XPS 15', 'Apple Watch Series 9', 'Apple Mac Mini M2'], collectionId: premiumRefurbished.id },
    { productNames: ['Dell OptiPlex 7010', 'Xiaomi Mi Power Bank 3', 'Anker PowerCore 26800'], collectionId: budgetFriendly.id },
  ];

  for (const assignment of collectionAssignments) {
    for (const productName of assignment.productNames) {
      const product = createdProducts.find(p => p.name === productName);
      if (product) {
        await db.insert(productCollections).values({
          productId: product.id,
          collectionId: assignment.collectionId,
        });
      }
    }
  }
}

export async function seedDatabase() {
  try {
    console.log('Starting database seed...');
    console.log('='.repeat(50));

    // Copy images to static folder
    const images = copyImagesToStatic();

    // Seed filter data
    const brandData = await seedBrands();
    const conditionData = await seedConditions();
    const cpuData = await seedCpus();
    const ramData = await seedRams();
    const screenSizeData = await seedScreenSizes();
    const storageData = await seedStorages();
    const connectivityData = await seedConnectivities();
    const colorData = await seedColors();
    const simSlotData = await seedSimSlots();
    const bandSizeData = await seedBandSizes();
    const bandTypeData = await seedBandTypes();
    const faceSizeData = await seedFaceSizes();
    const seriesData = await seedSeries();

    // Seed categories and collections
    const categoryData = await seedCategories();
    const collectionData = await seedCollections();

    const filters: FilterData = {
      brands: brandData,
      conditions: conditionData,
      cpus: cpuData,
      rams: ramData,
      screenSizes: screenSizeData,
      storages: storageData,
      connectivities: connectivityData,
      colors: colorData,
      simSlots: simSlotData,
      bandSizes: bandSizeData,
      bandTypes: bandTypeData,
      faceSizes: faceSizeData,
      series: seriesData,
      categories: categoryData,
      collections: collectionData,
    };

    // Seed products and variants
    const { products: createdProducts } = await seedProducts(filters, images);

    // Seed product collections
    await seedProductCollections(createdProducts, collectionData);

    console.log('='.repeat(50));
    console.log('Database seeded successfully!');
    console.log(`Created ${brandData.length} brands`);
    console.log(`Created ${conditionData.length} conditions`);
    console.log(`Created ${cpuData.length} CPUs`);
    console.log(`Created ${ramData.length} RAMs`);
    console.log(`Created ${screenSizeData.length} screen sizes`);
    console.log(`Created ${storageData.length} storages`);
    console.log(`Created ${connectivityData.length} connectivities`);
    console.log(`Created ${colorData.length} colors`);
    console.log(`Created ${simSlotData.length} SIM slots`);
    console.log(`Created ${bandSizeData.length} band sizes`);
    console.log(`Created ${bandTypeData.length} band types`);
    console.log(`Created ${faceSizeData.length} face sizes`);
    console.log(`Created ${seriesData.length} series`);
    console.log(`Created ${categoryData.length} categories`);
    console.log(`Created ${collectionData.length} collections`);
    console.log(`Created ${createdProducts.length} products with variants`);

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
seedDatabase()
  .then(() => {
    console.log('Seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
