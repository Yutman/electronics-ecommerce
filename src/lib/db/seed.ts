import { db } from './index';
import { products } from './schema';

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    price: '999.00',
    category: 'Smartphones',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    stock: 50,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen, 200MP camera, and AI features',
    price: '1199.00',
    category: 'Smartphones',
    brand: 'Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    stock: 30,
  },
  {
    name: 'MacBook Pro 14"',
    description: 'Powerful laptop with M3 chip, Liquid Retina XDR display, and all-day battery life',
    price: '1999.00',
    category: 'Laptops',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    stock: 25,
  },
  {
    name: 'Dell XPS 13',
    description: 'Ultra-portable laptop with Intel Core i7, 13.4" InfinityEdge display',
    price: '1299.00',
    category: 'Laptops',
    brand: 'Dell',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    stock: 40,
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support',
    price: '1099.00',
    category: 'Tablets',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    stock: 35,
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life',
    price: '399.00',
    category: 'Audio',
    brand: 'Sony',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 60,
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Hybrid gaming console with vibrant OLED screen and versatile gameplay modes',
    price: '349.00',
    category: 'Gaming',
    brand: 'Nintendo',
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    stock: 45,
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring, fitness tracking, and cellular connectivity',
    price: '429.00',
    category: 'Wearables',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
    stock: 55,
  },
];

export async function seedDatabase() {
  try {
    console.log('Seeding database...');
    
    // Insert sample products
    await db.insert(products).values(sampleProducts);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}