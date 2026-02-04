export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  salePrice: number | null;
  inStock: number;
  cpu?: string;
  cpuSlug?: string;
  ram?: string;
  ramSlug?: string;
  storage?: string;
  storageSlug?: string;
  screenSize?: string;
  screenSizeSlug?: string;
  color?: string;
  colorSlug?: string;
  connectivity?: string;
  connectivitySlug?: string;
  simSlot?: string;
  simSlotSlug?: string;
  bandSize?: string;
  bandSizeSlug?: string;
  bandType?: string;
  bandTypeSlug?: string;
  faceSize?: string;
  faceSizeSlug?: string;
  series?: string;
  seriesSlug?: string;
}

export interface MockProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  brand: string;
  brandSlug: string;
  condition: string;
  conditionSlug: string;
  batteryHealth: number | null;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  createdAt: Date;
  isFeatured?: boolean;
}

export const BRANDS = [
  { name: 'Apple', slug: 'apple' },
  { name: 'Samsung', slug: 'samsung' },
  { name: 'Dell', slug: 'dell' },
  { name: 'HP', slug: 'hp' },
  { name: 'Lenovo', slug: 'lenovo' },
  { name: 'Sony', slug: 'sony' },
  { name: 'Bose', slug: 'bose' },
  { name: 'JBL', slug: 'jbl' },
  { name: 'Anker', slug: 'anker' },
  { name: 'Xiaomi', slug: 'xiaomi' },
  { name: 'Google', slug: 'google' },
  { name: 'Logitech', slug: 'logitech' },
];

export const CONDITIONS = [
  { label: 'New', slug: 'new', description: 'Brand new, unopened product with full manufacturer warranty' },
  { label: 'Excellent', slug: 'excellent', description: 'Like new condition with minimal signs of use' },
  { label: 'Good', slug: 'good', description: 'Minor cosmetic wear. Fully functional' },
  { label: 'Fair', slug: 'fair', description: 'Visible signs of use but fully functional' },
];

export const CPUS = [
  { name: 'Apple M1', slug: 'apple-m1' },
  { name: 'Apple M2', slug: 'apple-m2' },
  { name: 'Apple M3', slug: 'apple-m3' },
  { name: 'Intel Core i5', slug: 'intel-core-i5' },
  { name: 'Intel Core i7', slug: 'intel-core-i7' },
  { name: 'Intel Core i9', slug: 'intel-core-i9' },
  { name: 'AMD Ryzen 5', slug: 'amd-ryzen-5' },
  { name: 'AMD Ryzen 7', slug: 'amd-ryzen-7' },
];

export const RAMS = [
  { size: '4GB', slug: '4gb' },
  { size: '8GB', slug: '8gb' },
  { size: '16GB', slug: '16gb' },
  { size: '32GB', slug: '32gb' },
  { size: '64GB', slug: '64gb' },
];

export const STORAGES = [
  { capacity: '64GB', slug: '64gb' },
  { capacity: '128GB', slug: '128gb' },
  { capacity: '256GB', slug: '256gb' },
  { capacity: '512GB', slug: '512gb' },
  { capacity: '1TB', slug: '1tb' },
  { capacity: '2TB', slug: '2tb' },
];

export const SCREEN_SIZES = [
  { size: '6.1"', slug: '6.1' },
  { size: '6.7"', slug: '6.7' },
  { size: '13.3"', slug: '13.3' },
  { size: '14"', slug: '14' },
  { size: '15.6"', slug: '15.6' },
  { size: '16"', slug: '16' },
  { size: '24"', slug: '24' },
  { size: '27"', slug: '27' },
];

export const SIM_SLOTS = [
  { type: 'Single', slug: 'single' },
  { type: 'Dual', slug: 'dual' },
  { type: 'eSIM', slug: 'esim' },
];

export const CONNECTIVITIES = [
  { type: 'Bluetooth 5.0', slug: 'bluetooth-5.0' },
  { type: 'Bluetooth 5.3', slug: 'bluetooth-5.3' },
  { type: 'Wi-Fi 6', slug: 'wifi-6' },
  { type: 'Wi-Fi 6E', slug: 'wifi-6e' },
  { type: '5G Cellular', slug: '5g' },
  { type: 'LTE', slug: 'lte' },
];

export const BAND_SIZES = [
  { size: '38mm', slug: '38mm' },
  { size: '40mm', slug: '40mm' },
  { size: '41mm', slug: '41mm' },
  { size: '42mm', slug: '42mm' },
  { size: '44mm', slug: '44mm' },
  { size: '45mm', slug: '45mm' },
  { size: '49mm', slug: '49mm' },
];

export const BAND_TYPES = [
  { material: 'Silicone', slug: 'silicone' },
  { material: 'Leather', slug: 'leather' },
  { material: 'Metal', slug: 'metal' },
  { material: 'Nylon', slug: 'nylon' },
  { material: 'Braided Solo Loop', slug: 'braided-solo-loop' },
];

export const FACE_SIZES = [
  { size: '40mm', slug: '40mm' },
  { size: '41mm', slug: '41mm' },
  { size: '44mm', slug: '44mm' },
  { size: '45mm', slug: '45mm' },
  { size: '49mm', slug: '49mm' },
];

export const SERIES = [
  { name: 'OptiPlex', slug: 'optiplex' },
  { name: 'ProDesk', slug: 'prodesk' },
  { name: 'EliteDesk', slug: 'elitedesk' },
  { name: 'ThinkCentre', slug: 'thinkcentre' },
  { name: 'Mac Mini', slug: 'mac-mini' },
];

export const COLORS = [
  { name: 'Space Gray', slug: 'space-gray' },
  { name: 'Silver', slug: 'silver' },
  { name: 'Gold', slug: 'gold' },
  { name: 'Midnight', slug: 'midnight' },
  { name: 'Starlight', slug: 'starlight' },
  { name: 'Blue', slug: 'blue' },
  { name: 'Purple', slug: 'purple' },
  { name: 'Black', slug: 'black' },
  { name: 'White', slug: 'white' },
  { name: 'Graphite', slug: 'graphite' },
  { name: 'Natural Titanium', slug: 'natural-titanium' },
  { name: 'Blue Titanium', slug: 'blue-titanium' },
];

export const CATEGORIES = [
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Smartphones', slug: 'smartphones' },
  { name: 'Desktops', slug: 'desktops' },
  { name: 'Computer Accessories', slug: 'computer-accessories' },
  { name: 'Smartwatches', slug: 'smartwatches' },
  { name: 'Powerbanks', slug: 'powerbanks' },
  { name: 'Audio', slug: 'audio' },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 'prod-1',
    name: 'MacBook Pro 14"',
    description: 'Powerful laptop with M3 chip, Liquid Retina XDR display, and all-day battery life. Perfect for professionals and creatives.',
    category: 'Laptops',
    categorySlug: 'laptops',
    brand: 'Apple',
    brandSlug: 'apple',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: 95,
    rating: 4.8,
    reviewCount: 156,
    images: ['/laptops/electronic-1.jpg', '/laptops/electronic-2.jpg'],
    isFeatured: true,
    createdAt: new Date('2025-12-15'),
    variants: [
      { id: 'var-1-1', sku: 'MBP14-M3-8-256-SG', price: 1599, salePrice: 1499, inStock: 15, cpu: 'Apple M3', cpuSlug: 'apple-m3', ram: '8GB', ramSlug: '8gb', storage: '256GB', storageSlug: '256gb', color: 'Space Gray', colorSlug: 'space-gray' },
      { id: 'var-1-2', sku: 'MBP14-M3-16-512-SG', price: 1999, salePrice: null, inStock: 10, cpu: 'Apple M3', cpuSlug: 'apple-m3', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', color: 'Space Gray', colorSlug: 'space-gray' },
      { id: 'var-1-3', sku: 'MBP14-M3-16-512-SL', price: 1999, salePrice: null, inStock: 8, cpu: 'Apple M3', cpuSlug: 'apple-m3', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', color: 'Silver', colorSlug: 'silver' },
    ],
  },
  {
    id: 'prod-2',
    name: 'Dell XPS 15',
    description: 'Ultra-portable laptop with Intel Core i7, 15.6" InfinityEdge OLED display, and premium build quality.',
    category: 'Laptops',
    categorySlug: 'laptops',
    brand: 'Dell',
    brandSlug: 'dell',
    condition: 'Good',
    conditionSlug: 'good',
    batteryHealth: 88,
    rating: 4.5,
    reviewCount: 89,
    images: ['/laptops/electronic-3.jpg', '/laptops/electronic-4.jpg'],
    createdAt: new Date('2025-11-20'),
    variants: [
      { id: 'var-2-1', sku: 'XPS15-I7-16-512-SL', price: 1299, salePrice: 1199, inStock: 12, cpu: 'Intel Core i7', cpuSlug: 'intel-core-i7', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', color: 'Silver', colorSlug: 'silver', screenSize: '15.6"', screenSizeSlug: '15.6' },
      { id: 'var-2-2', sku: 'XPS15-I7-32-1024-SL', price: 1699, salePrice: null, inStock: 5, cpu: 'Intel Core i7', cpuSlug: 'intel-core-i7', ram: '32GB', ramSlug: '32gb', storage: '1TB', storageSlug: '1tb', color: 'Silver', colorSlug: 'silver', screenSize: '15.6"', screenSizeSlug: '15.6' },
    ],
  },
  {
    id: 'prod-3',
    name: 'Lenovo ThinkPad X1 Carbon',
    description: 'Business ultrabook with Intel Core i5, 14" display, legendary ThinkPad keyboard, and military-grade durability.',
    category: 'Laptops',
    categorySlug: 'laptops',
    brand: 'Lenovo',
    brandSlug: 'lenovo',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: 100,
    rating: 4.7,
    reviewCount: 203,
    images: ['/laptops/electronic-5.jpg', '/laptops/electronic-6.jpg'],
    isFeatured: true,
    createdAt: new Date('2026-01-10'),
    variants: [
      { id: 'var-3-1', sku: 'X1C-I5-8-256-BK', price: 1099, salePrice: null, inStock: 20, cpu: 'Intel Core i5', cpuSlug: 'intel-core-i5', ram: '8GB', ramSlug: '8gb', storage: '256GB', storageSlug: '256gb', color: 'Black', colorSlug: 'black', screenSize: '14"', screenSizeSlug: '14' },
      { id: 'var-3-2', sku: 'X1C-I7-16-512-BK', price: 1499, salePrice: 1399, inStock: 15, cpu: 'Intel Core i7', cpuSlug: 'intel-core-i7', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', color: 'Black', colorSlug: 'black', screenSize: '14"', screenSizeSlug: '14' },
    ],
  },
  {
    id: 'prod-4',
    name: 'HP EliteBook 840 G9',
    description: 'Premium business laptop with Intel Core i5, 14" display, and enterprise-grade security features.',
    category: 'Laptops',
    categorySlug: 'laptops',
    brand: 'HP',
    brandSlug: 'hp',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: 92,
    rating: 4.4,
    reviewCount: 67,
    images: ['/laptops/electronic-7.jpg'],
    createdAt: new Date('2025-10-05'),
    variants: [
      { id: 'var-4-1', sku: 'EB840-I5-8-256-SL', price: 899, salePrice: 849, inStock: 18, cpu: 'Intel Core i5', cpuSlug: 'intel-core-i5', ram: '8GB', ramSlug: '8gb', storage: '256GB', storageSlug: '256gb', color: 'Silver', colorSlug: 'silver', screenSize: '14"', screenSizeSlug: '14' },
      { id: 'var-4-2', sku: 'EB840-I7-16-512-SL', price: 1199, salePrice: null, inStock: 10, cpu: 'Intel Core i7', cpuSlug: 'intel-core-i7', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', color: 'Silver', colorSlug: 'silver', screenSize: '14"', screenSizeSlug: '14' },
    ],
  },
  {
    id: 'prod-5',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system with 5x optical zoom.',
    category: 'Smartphones',
    categorySlug: 'smartphones',
    brand: 'Apple',
    brandSlug: 'apple',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: 97,
    rating: 4.9,
    reviewCount: 542,
    images: ['/laptops/electronic-8.jpg', '/laptops/electronic-9.jpg'],
    isFeatured: true,
    createdAt: new Date('2025-12-01'),
    variants: [
      { id: 'var-5-1', sku: 'IP15P-128-NT', price: 999, salePrice: 949, inStock: 25, storage: '128GB', storageSlug: '128gb', color: 'Natural Titanium', colorSlug: 'natural-titanium', simSlot: 'eSIM', simSlotSlug: 'esim' },
      { id: 'var-5-2', sku: 'IP15P-256-BT', price: 1099, salePrice: null, inStock: 18, storage: '256GB', storageSlug: '256gb', color: 'Blue Titanium', colorSlug: 'blue-titanium', simSlot: 'eSIM', simSlotSlug: 'esim' },
      { id: 'var-5-3', sku: 'IP15P-512-BK', price: 1299, salePrice: null, inStock: 10, storage: '512GB', storageSlug: '512gb', color: 'Black', colorSlug: 'black', simSlot: 'eSIM', simSlotSlug: 'esim' },
    ],
  },
  {
    id: 'prod-6',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen, 200MP camera, AI features, and stunning 6.8" Dynamic AMOLED display.',
    category: 'Smartphones',
    categorySlug: 'smartphones',
    brand: 'Samsung',
    brandSlug: 'samsung',
    condition: 'Good',
    conditionSlug: 'good',
    batteryHealth: 92,
    rating: 4.7,
    reviewCount: 328,
    images: ['/laptops/electronic-10.jpg'],
    createdAt: new Date('2025-11-15'),
    variants: [
      { id: 'var-6-1', sku: 'S24U-256-BK', price: 1199, salePrice: 1099, inStock: 20, storage: '256GB', storageSlug: '256gb', color: 'Black', colorSlug: 'black', simSlot: 'Dual', simSlotSlug: 'dual' },
      { id: 'var-6-2', sku: 'S24U-512-PU', price: 1319, salePrice: null, inStock: 12, storage: '512GB', storageSlug: '512gb', color: 'Purple', colorSlug: 'purple', simSlot: 'Dual', simSlotSlug: 'dual' },
    ],
  },
  {
    id: 'prod-7',
    name: 'Google Pixel 8 Pro',
    description: 'Google flagship with Tensor G3 chip, best-in-class computational photography, and 7 years of updates.',
    category: 'Smartphones',
    categorySlug: 'smartphones',
    brand: 'Google',
    brandSlug: 'google',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: 100,
    rating: 4.6,
    reviewCount: 189,
    images: ['/laptops/electronic-11.jpg'],
    createdAt: new Date('2026-01-05'),
    variants: [
      { id: 'var-7-1', sku: 'PX8P-128-BL', price: 899, salePrice: null, inStock: 30, storage: '128GB', storageSlug: '128gb', color: 'Blue', colorSlug: 'blue', simSlot: 'eSIM', simSlotSlug: 'esim' },
      { id: 'var-7-2', sku: 'PX8P-256-WH', price: 999, salePrice: 949, inStock: 22, storage: '256GB', storageSlug: '256gb', color: 'White', colorSlug: 'white', simSlot: 'eSIM', simSlotSlug: 'esim' },
    ],
  },
  {
    id: 'prod-8',
    name: 'Dell OptiPlex 7010',
    description: 'Compact business desktop with Intel Core i5, perfect for office productivity and enterprise deployments.',
    category: 'Desktops',
    categorySlug: 'desktops',
    brand: 'Dell',
    brandSlug: 'dell',
    condition: 'Good',
    conditionSlug: 'good',
    batteryHealth: null,
    rating: 4.3,
    reviewCount: 45,
    images: ['/laptops/electronic-12.jpg'],
    createdAt: new Date('2025-09-20'),
    variants: [
      { id: 'var-8-1', sku: 'OPT7010-I5-8-256', price: 549, salePrice: 499, inStock: 25, cpu: 'Intel Core i5', cpuSlug: 'intel-core-i5', ram: '8GB', ramSlug: '8gb', storage: '256GB', storageSlug: '256gb', series: 'OptiPlex', seriesSlug: 'optiplex' },
      { id: 'var-8-2', sku: 'OPT7010-I5-16-512', price: 699, salePrice: null, inStock: 18, cpu: 'Intel Core i5', cpuSlug: 'intel-core-i5', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', series: 'OptiPlex', seriesSlug: 'optiplex' },
    ],
  },
  {
    id: 'prod-9',
    name: 'Apple Mac Mini M2',
    description: 'Compact powerhouse with Apple M2 chip, perfect for creative workflows and everyday computing.',
    category: 'Desktops',
    categorySlug: 'desktops',
    brand: 'Apple',
    brandSlug: 'apple',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: null,
    rating: 4.8,
    reviewCount: 234,
    images: ['/laptops/electronic-13.jpg'],
    isFeatured: true,
    createdAt: new Date('2025-12-20'),
    variants: [
      { id: 'var-9-1', sku: 'MACMINI-M2-8-256', price: 599, salePrice: null, inStock: 15, cpu: 'Apple M2', cpuSlug: 'apple-m2', ram: '8GB', ramSlug: '8gb', storage: '256GB', storageSlug: '256gb', series: 'Mac Mini', seriesSlug: 'mac-mini' },
      { id: 'var-9-2', sku: 'MACMINI-M2-16-512', price: 899, salePrice: 849, inStock: 10, cpu: 'Apple M2', cpuSlug: 'apple-m2', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', series: 'Mac Mini', seriesSlug: 'mac-mini' },
    ],
  },
  {
    id: 'prod-10',
    name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and cellular connectivity. Features the new S9 chip.',
    category: 'Smartwatches',
    categorySlug: 'smartwatches',
    brand: 'Apple',
    brandSlug: 'apple',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: 96,
    rating: 4.7,
    reviewCount: 412,
    images: ['/laptops/electronic-14.jpg'],
    createdAt: new Date('2025-11-25'),
    variants: [
      { id: 'var-10-1', sku: 'AWS9-41-SL-SIL', price: 399, salePrice: null, inStock: 20, color: 'Silver', colorSlug: 'silver', faceSize: '41mm', faceSizeSlug: '41mm', bandSize: '41mm', bandSizeSlug: '41mm', bandType: 'Silicone', bandTypeSlug: 'silicone' },
      { id: 'var-10-2', sku: 'AWS9-45-MN-LTH', price: 449, salePrice: 429, inStock: 15, color: 'Midnight', colorSlug: 'midnight', faceSize: '45mm', faceSizeSlug: '45mm', bandSize: '45mm', bandSizeSlug: '45mm', bandType: 'Leather', bandTypeSlug: 'leather' },
      { id: 'var-10-3', sku: 'AWS9-45-GD-MTL', price: 699, salePrice: null, inStock: 8, color: 'Gold', colorSlug: 'gold', faceSize: '45mm', faceSizeSlug: '45mm', bandSize: '45mm', bandSizeSlug: '45mm', bandType: 'Metal', bandTypeSlug: 'metal' },
    ],
  },
  {
    id: 'prod-11',
    name: 'Samsung Galaxy Watch 6',
    description: 'Premium Android smartwatch with advanced health features, sleep coaching, and beautiful rotating bezel.',
    category: 'Smartwatches',
    categorySlug: 'smartwatches',
    brand: 'Samsung',
    brandSlug: 'samsung',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: 100,
    rating: 4.5,
    reviewCount: 178,
    images: ['/laptops/electronic-15.jpg'],
    createdAt: new Date('2026-01-08'),
    variants: [
      { id: 'var-11-1', sku: 'GW6-40-BK-SIL', price: 299, salePrice: 279, inStock: 25, color: 'Black', colorSlug: 'black', faceSize: '40mm', faceSizeSlug: '40mm', bandSize: '40mm', bandSizeSlug: '40mm', bandType: 'Silicone', bandTypeSlug: 'silicone' },
      { id: 'var-11-2', sku: 'GW6-44-SL-SIL', price: 329, salePrice: null, inStock: 20, color: 'Silver', colorSlug: 'silver', faceSize: '44mm', faceSizeSlug: '44mm', bandSize: '44mm', bandSizeSlug: '44mm', bandType: 'Silicone', bandTypeSlug: 'silicone' },
    ],
  },
  {
    id: 'prod-12',
    name: 'Anker PowerCore 26800',
    description: 'High-capacity portable charger with 26800mAh battery, dual USB ports, and PowerIQ technology for fast charging.',
    category: 'Powerbanks',
    categorySlug: 'powerbanks',
    brand: 'Anker',
    brandSlug: 'anker',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: null,
    rating: 4.6,
    reviewCount: 892,
    images: ['/laptops/electronic-1.jpg'],
    createdAt: new Date('2025-10-15'),
    variants: [
      { id: 'var-12-1', sku: 'ANKER-26800-BK', price: 65.99, salePrice: 59.99, inStock: 50, color: 'Black', colorSlug: 'black' },
      { id: 'var-12-2', sku: 'ANKER-26800-WH', price: 65.99, salePrice: null, inStock: 35, color: 'White', colorSlug: 'white' },
    ],
  },
  {
    id: 'prod-13',
    name: 'Xiaomi Mi Power Bank 3',
    description: 'Slim 20000mAh power bank with USB-C input/output, fast charging support, and premium aluminum design.',
    category: 'Powerbanks',
    categorySlug: 'powerbanks',
    brand: 'Xiaomi',
    brandSlug: 'xiaomi',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: null,
    rating: 4.4,
    reviewCount: 567,
    images: ['/laptops/electronic-2.jpg'],
    createdAt: new Date('2025-09-10'),
    variants: [
      { id: 'var-13-1', sku: 'XMPB3-20000-BK', price: 39.99, salePrice: 34.99, inStock: 60, color: 'Black', colorSlug: 'black' },
      { id: 'var-13-2', sku: 'XMPB3-20000-SL', price: 39.99, salePrice: null, inStock: 45, color: 'Silver', colorSlug: 'silver' },
    ],
  },
  {
    id: 'prod-14',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life and exceptional sound quality.',
    category: 'Audio',
    categorySlug: 'audio',
    brand: 'Sony',
    brandSlug: 'sony',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: null,
    rating: 4.8,
    reviewCount: 1234,
    images: ['/laptops/electronic-3.jpg'],
    isFeatured: true,
    createdAt: new Date('2025-12-10'),
    variants: [
      { id: 'var-14-1', sku: 'SONY-XM5-BK', price: 399, salePrice: 349, inStock: 30, color: 'Black', colorSlug: 'black', connectivity: 'Bluetooth 5.3', connectivitySlug: 'bluetooth-5.3' },
      { id: 'var-14-2', sku: 'SONY-XM5-SL', price: 399, salePrice: null, inStock: 25, color: 'Silver', colorSlug: 'silver', connectivity: 'Bluetooth 5.3', connectivitySlug: 'bluetooth-5.3' },
    ],
  },
  {
    id: 'prod-15',
    name: 'JBL Flip 6',
    description: 'Portable Bluetooth speaker with powerful sound, IP67 waterproof rating, and 12 hours of playtime.',
    category: 'Audio',
    categorySlug: 'audio',
    brand: 'JBL',
    brandSlug: 'jbl',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: null,
    rating: 4.5,
    reviewCount: 678,
    images: ['/laptops/electronic-4.jpg'],
    createdAt: new Date('2026-01-02'),
    variants: [
      { id: 'var-15-1', sku: 'JBL-FLIP6-BK', price: 129.99, salePrice: null, inStock: 40, color: 'Black', colorSlug: 'black', connectivity: 'Bluetooth 5.0', connectivitySlug: 'bluetooth-5.0' },
      { id: 'var-15-2', sku: 'JBL-FLIP6-BL', price: 129.99, salePrice: 119.99, inStock: 35, color: 'Blue', colorSlug: 'blue', connectivity: 'Bluetooth 5.0', connectivitySlug: 'bluetooth-5.0' },
      { id: 'var-15-3', sku: 'JBL-FLIP6-RD', price: 129.99, salePrice: null, inStock: 28, color: 'Purple', colorSlug: 'purple', connectivity: 'Bluetooth 5.0', connectivitySlug: 'bluetooth-5.0' },
    ],
  },
  {
    id: 'prod-16',
    name: 'Logitech MX Master 3S',
    description: 'Advanced wireless mouse with 8K DPI sensor, quiet clicks, and MagSpeed electromagnetic scrolling.',
    category: 'Computer Accessories',
    categorySlug: 'computer-accessories',
    brand: 'Logitech',
    brandSlug: 'logitech',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: null,
    rating: 4.7,
    reviewCount: 456,
    images: ['/laptops/electronic-5.jpg'],
    createdAt: new Date('2025-11-30'),
    variants: [
      { id: 'var-16-1', sku: 'MX-MASTER3S-GR', price: 99.99, salePrice: null, inStock: 45, color: 'Graphite', colorSlug: 'graphite', connectivity: 'Bluetooth 5.0', connectivitySlug: 'bluetooth-5.0' },
      { id: 'var-16-2', sku: 'MX-MASTER3S-WH', price: 99.99, salePrice: 89.99, inStock: 38, color: 'White', colorSlug: 'white', connectivity: 'Bluetooth 5.0', connectivitySlug: 'bluetooth-5.0' },
    ],
  },
  {
    id: 'prod-17',
    name: 'Bose QuietComfort Ultra',
    description: 'Premium noise canceling headphones with immersive audio, spatial sound, and up to 24 hours of battery life.',
    category: 'Audio',
    categorySlug: 'audio',
    brand: 'Bose',
    brandSlug: 'bose',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: null,
    rating: 4.7,
    reviewCount: 345,
    images: ['/laptops/electronic-6.jpg'],
    createdAt: new Date('2026-01-15'),
    variants: [
      { id: 'var-17-1', sku: 'BOSE-QCU-BK', price: 429, salePrice: 399, inStock: 22, color: 'Black', colorSlug: 'black', connectivity: 'Bluetooth 5.3', connectivitySlug: 'bluetooth-5.3' },
      { id: 'var-17-2', sku: 'BOSE-QCU-WH', price: 429, salePrice: null, inStock: 18, color: 'White', colorSlug: 'white', connectivity: 'Bluetooth 5.3', connectivitySlug: 'bluetooth-5.3' },
    ],
  },
  {
    id: 'prod-18',
    name: 'HP ProDesk 400 G7',
    description: 'Reliable business desktop with Intel Core i5, expandable design, and comprehensive security features.',
    category: 'Desktops',
    categorySlug: 'desktops',
    brand: 'HP',
    brandSlug: 'hp',
    condition: 'Good',
    conditionSlug: 'good',
    batteryHealth: null,
    rating: 4.2,
    reviewCount: 34,
    images: ['/laptops/electronic-7.jpg'],
    createdAt: new Date('2025-08-15'),
    variants: [
      { id: 'var-18-1', sku: 'PD400-I5-8-256', price: 499, salePrice: 449, inStock: 15, cpu: 'Intel Core i5', cpuSlug: 'intel-core-i5', ram: '8GB', ramSlug: '8gb', storage: '256GB', storageSlug: '256gb', series: 'ProDesk', seriesSlug: 'prodesk' },
      { id: 'var-18-2', sku: 'PD400-I5-16-512', price: 649, salePrice: null, inStock: 10, cpu: 'Intel Core i5', cpuSlug: 'intel-core-i5', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', series: 'ProDesk', seriesSlug: 'prodesk' },
    ],
  },
  {
    id: 'prod-19',
    name: 'Samsung Galaxy Z Fold 5',
    description: 'Revolutionary foldable smartphone with 7.6" main display, Flex Mode, and flagship camera system.',
    category: 'Smartphones',
    categorySlug: 'smartphones',
    brand: 'Samsung',
    brandSlug: 'samsung',
    condition: 'Excellent',
    conditionSlug: 'excellent',
    batteryHealth: 94,
    rating: 4.6,
    reviewCount: 267,
    images: ['/laptops/electronic-8.jpg'],
    createdAt: new Date('2025-12-05'),
    variants: [
      { id: 'var-19-1', sku: 'ZF5-256-BK', price: 1799, salePrice: 1699, inStock: 8, storage: '256GB', storageSlug: '256gb', color: 'Black', colorSlug: 'black', simSlot: 'eSIM', simSlotSlug: 'esim' },
      { id: 'var-19-2', sku: 'ZF5-512-BL', price: 1919, salePrice: null, inStock: 5, storage: '512GB', storageSlug: '512gb', color: 'Blue', colorSlug: 'blue', simSlot: 'eSIM', simSlotSlug: 'esim' },
    ],
  },
  {
    id: 'prod-20',
    name: 'MacBook Air 15" M3',
    description: 'Stunningly thin laptop with M3 chip, 15.3" Liquid Retina display, and up to 18 hours of battery life.',
    category: 'Laptops',
    categorySlug: 'laptops',
    brand: 'Apple',
    brandSlug: 'apple',
    condition: 'New',
    conditionSlug: 'new',
    batteryHealth: 100,
    rating: 4.9,
    reviewCount: 312,
    images: ['/laptops/electronic-9.jpg'],
    isFeatured: true,
    createdAt: new Date('2026-01-20'),
    variants: [
      { id: 'var-20-1', sku: 'MBA15-M3-8-256-MN', price: 1299, salePrice: null, inStock: 25, cpu: 'Apple M3', cpuSlug: 'apple-m3', ram: '8GB', ramSlug: '8gb', storage: '256GB', storageSlug: '256gb', color: 'Midnight', colorSlug: 'midnight' },
      { id: 'var-20-2', sku: 'MBA15-M3-16-512-SL', price: 1699, salePrice: 1599, inStock: 18, cpu: 'Apple M3', cpuSlug: 'apple-m3', ram: '16GB', ramSlug: '16gb', storage: '512GB', storageSlug: '512gb', color: 'Starlight', colorSlug: 'starlight' },
    ],
  },
];

export function getLowestPrice(product: MockProduct): number {
  const prices = product.variants.map(v => v.salePrice ?? v.price);
  return Math.min(...prices);
}

export function getOriginalPrice(product: MockProduct): number | undefined {
  const defaultVariant = product.variants[0];
  if (defaultVariant.salePrice) {
    return defaultVariant.price;
  }
  return undefined;
}

export function getDefaultVariant(product: MockProduct): ProductVariant {
  return product.variants[0];
}

export function hasDiscount(product: MockProduct): boolean {
  return product.variants.some(v => v.salePrice !== null);
}
