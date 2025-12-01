import React from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";

const sampleProducts = [
  {
    id: 1,
    title: "JBL Flip 6 Bluetooth speakers - Black",
    image: "/laptops/electronic-1.jpg",
    price: 74.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 32,
    badge: "Sale",
    category: "Audio",
    brand: "JBL",
  },
  {
    id: 2,
    title: 'HP EliteBook 830 G7 13" - Intel Core i5',
    image: "/laptops/electronic-2.jpg",
    price: 389.0,
    originalPrice: 449.0,
    rating: 4.5,
    reviewCount: 442,
    category: "Laptops",
    brand: "HP",
  },
  {
    id: 3,
    title: 'MacBook Air 13" 2022, M2 - Starlight',
    image: "/laptops/electronic-3.jpg",
    price: 649.0,
    rating: 4.5,
    reviewCount: 1984,
    badge: "Popular",
    category: "Laptops",
    brand: "Apple",
  },
  {
    id: 4,
    title: "Anker Soundcore Flare 2 Bluetooth speakers - Black",
    image: "/laptops/electronic-4.jpg",
    price: 77.0,
    rating: 4.5,
    reviewCount: 15,
    badge: "New",
    category: "Audio",
    brand: "Anker",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* <main className="flex-1 bg-light-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-heading-2 text-dark-900 mb-8">
            Featured Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>

          <h2 className="text-heading-3 text-dark-900 mt-12 mb-6">
            Compact Cards
          </h2>
          <div className="space-y-4 max-w-md">
            {sampleProducts.slice(0, 2).map((product) => (
              <Card
                key={`compact-${product.id}`}
                {...product}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </main> */}

      <CategoryGrid />

      <Footer />
    </div>
  );
};

export default Home;
