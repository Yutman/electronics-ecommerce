export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ConditionOption {
  id: string;
  label: string;
  description: string;
  priceDiff: number;
}

export interface VariantOption {
  id: string;
  label: string;
  priceDiff: number;
}

export interface SpecSection {
  title: string;
  specs: { label: string; value: string }[];
}

export interface CrossSellProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  category: string;
  brand: string;
}

export interface MockProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  basePrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  sku: string;
  images: ProductImage[];
  conditions: ConditionOption[];
  cpuOptions: VariantOption[];
  storageOptions: VariantOption[];
  ramOptions: VariantOption[];
  screenSizes: VariantOption[];
  specSections: SpecSection[];
  highlights: string[];
  shippingEstimate: string;
  shippingDateRange: string;
  warrantyInfo: string;
}

export const mockProduct: MockProduct = {
  id: "prod-001",
  name: 'HP EliteBook 840 G8 Notebook PC 14"',
  brand: "HP",
  category: "Laptops",
  categorySlug: "laptops",
  basePrice: 504.11,
  originalPrice: 699.99,
  rating: 4.5,
  reviewCount: 442,
  sku: "SKU-MFDAMWJ2FPT",
  images: [
    {
      id: "img-1",
      url: "/laptops/electronic-2.jpg",
      alt: "HP EliteBook 840 G8 front view",
    },
    {
      id: "img-2",
      url: "/laptops/electronic-3.jpg",
      alt: "HP EliteBook 840 G8 side view",
    },
    {
      id: "img-3",
      url: "/laptops/electronic-5.jpg",
      alt: "HP EliteBook 840 G8 keyboard view",
    },
    {
      id: "img-4",
      url: "/laptops/electronic-8.jpg",
      alt: "HP EliteBook 840 G8 ports view",
    },
    {
      id: "img-5",
      url: "/laptops/electronic-10.jpg",
      alt: "HP EliteBook 840 G8 back view",
    },
  ],
  conditions: [
    {
      id: "cond-new",
      label: "New",
      description: "Factory sealed, full manufacturer warranty",
      priceDiff: 150,
    },
    {
      id: "cond-refurbished",
      label: "Refurbished",
      description: "Tested & certified, like-new condition",
      priceDiff: 0,
    },
    {
      id: "cond-exuk",
      label: "EX-UK/US",
      description: "Imported, inspected & graded",
      priceDiff: -60,
    },
  ],
  cpuOptions: [
    { id: "cpu-i5-1135", label: "Intel Core i5 11th Gen", priceDiff: 0 },
    { id: "cpu-i5-1145", label: "Intel Core i5 vPro 11th Gen", priceDiff: 40 },
    { id: "cpu-i7-1165", label: "Intel Core i7 11th Gen", priceDiff: 95 },
  ],
  storageOptions: [
    { id: "storage-256", label: "256GB", priceDiff: 0 },
    { id: "storage-512", label: "512GB", priceDiff: 50 },
    { id: "storage-1tb", label: "1TB", priceDiff: 120 },
  ],
  ramOptions: [
    { id: "ram-8", label: "8GB", priceDiff: 0 },
    { id: "ram-16", label: "16GB", priceDiff: 45 },
    { id: "ram-32", label: "32GB", priceDiff: 110 },
  ],
  screenSizes: [
    { id: "screen-14", label: '14"', priceDiff: 0 },
  ],
  specSections: [
    {
      title: "Product Details",
      specs: [
        { label: "Brand", value: "HP" },
        { label: "Model", value: "EliteBook 840 G8" },
        { label: "Form Factor", value: "Notebook" },
        { label: "Year Released", value: "2021" },
        { label: "Color", value: "Silver" },
        { label: "Weight", value: "1.33 kg (2.93 lbs)" },
        { label: "Dimensions", value: "322.2 x 214.6 x 17.9 mm" },
      ],
    },
    {
      title: "Technical Specifications",
      specs: [
        { label: "Processor", value: "Intel Core i5-1135G7 @ 2.40 GHz" },
        { label: "Processor Cores", value: "4 Cores, 8 Threads" },
        { label: "Cache", value: "Smart Cache: 8 MB" },
        { label: "RAM", value: "16 GB DDR4" },
        { label: "Storage", value: "512 GB NVMe SSD" },
        { label: "Screen Size", value: '14" FHD' },
        { label: "Screen Resolution", value: "1920 x 1080" },
        { label: "Display Type", value: "IPS, Anti-glare" },
        { label: "Graphics", value: "Intel Iris Xe Graphics" },
        { label: "Operating System", value: "Windows 11 Pro" },
        { label: "Battery", value: "3-cell, 53 Wh Li-ion" },
        { label: "Webcam", value: "720p HD with IR" },
        { label: "Ports", value: "2x USB-C Thunderbolt 4, 2x USB-A 3.1, HDMI 2.0, 3.5mm Audio" },
        { label: "Wireless", value: "Wi-Fi 6 (802.11ax), Bluetooth 5.2" },
        { label: "Security", value: "Fingerprint Reader, TPM 2.0, IR Camera" },
      ],
    },
  ],
  highlights: [
    "Intel Core i5-1135G7 @ 2.40 GHz",
    "16 GB DDR4 RAM",
    '14" FHD IPS Anti-glare Display',
    "512 GB NVMe SSD",
    "Smart Cache: 8 MB",
    "4 Cores, 8 Threads",
    "Intel Iris Xe Graphics",
  ],
  shippingEstimate: "FREE delivery by March 30 - April 2",
  shippingDateRange: "March 30 - April 2",
  warrantyInfo: "Certified Pre-owned with inspection report",
};

export const customersAlsoViewed: CrossSellProduct[] = [
  {
    id: "cs-1",
    title: "iPhone 14",
    image: "/laptops/electronic-4.jpg",
    price: 499.0,
    originalPrice: 599.0,
    rating: 4.5,
    reviewCount: 1250,
    category: "Smartphones",
    brand: "Apple",
  },
  {
    id: "cs-2",
    title: "iPhone 15 Pro Max",
    image: "/laptops/electronic-5.jpg",
    price: 899.0,
    originalPrice: 1099.0,
    rating: 4.8,
    reviewCount: 892,
    badge: "Popular",
    category: "Smartphones",
    brand: "Apple",
  },
  {
    id: "cs-3",
    title: "iPhone 15 Pro",
    image: "/laptops/electronic-6.jpg",
    price: 799.0,
    rating: 4.7,
    reviewCount: 634,
    category: "Smartphones",
    brand: "Apple",
  },
  {
    id: "cs-4",
    title: 'iPad 9th Gen 10.2" WiFi 64GB',
    image: "/laptops/electronic-7.jpg",
    price: 249.0,
    originalPrice: 329.0,
    rating: 4.6,
    reviewCount: 2100,
    badge: "Sale",
    category: "Tablets",
    brand: "Apple",
  },
  {
    id: "cs-5",
    title: "iPhone 14 Pro Max",
    image: "/laptops/electronic-8.jpg",
    price: 649.0,
    rating: 4.6,
    reviewCount: 1830,
    category: "Smartphones",
    brand: "Apple",
  },
  {
    id: "cs-6",
    title: "iPhone 15 Plus 128GB",
    image: "/laptops/electronic-9.jpg",
    price: 699.0,
    originalPrice: 799.0,
    rating: 4.5,
    reviewCount: 445,
    category: "Smartphones",
    brand: "Apple",
  },
];

export const bestSellers: CrossSellProduct[] = [
  {
    id: "bs-1",
    title: 'HP EliteBook 840 G8 Notebook PC 14" - Silver',
    image: "/laptops/electronic-2.jpg",
    price: 504.11,
    rating: 4.5,
    reviewCount: 442,
    badge: "Restocked",
    category: "Laptops",
    brand: "HP",
  },
  {
    id: "bs-2",
    title: 'HP EliteBook 830 G7 Notebook PC 13"',
    image: "/laptops/electronic-10.jpg",
    price: 352.0,
    originalPrice: 449.0,
    rating: 4.3,
    reviewCount: 289,
    badge: "Restocked",
    category: "Laptops",
    brand: "HP",
  },
  {
    id: "bs-3",
    title: 'HP EliteBook 840 G7 Notebook PC 14"',
    image: "/laptops/electronic-11.jpg",
    price: 358.0,
    originalPrice: 429.0,
    rating: 4.4,
    reviewCount: 178,
    badge: "Restocked",
    category: "Laptops",
    brand: "HP",
  },
  {
    id: "bs-4",
    title: 'HP EliteBook 840 G8 Notebook PC 14" - Black',
    image: "/laptops/electronic-12.jpg",
    price: 435.11,
    rating: 4.5,
    reviewCount: 125,
    badge: "Restocked",
    category: "Laptops",
    brand: "HP",
  },
  {
    id: "bs-5",
    title: 'HP EliteBook x360 1040 G7 14"',
    image: "/laptops/electronic-13.jpg",
    price: 499.99,
    originalPrice: 649.0,
    rating: 4.6,
    reviewCount: 98,
    category: "Laptops",
    brand: "HP",
  },
  {
    id: "bs-6",
    title: 'HP ZBook Studio G8 15.6"',
    image: "/laptops/electronic-14.jpg",
    price: 556.0,
    originalPrice: 799.0,
    rating: 4.7,
    reviewCount: 67,
    badge: "Restocked",
    category: "Laptops",
    brand: "HP",
  },
];
