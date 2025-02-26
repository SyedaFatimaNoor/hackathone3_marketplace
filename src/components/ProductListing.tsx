'use client';
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        
        setProducts(fetchedProducts || []);
        setFilteredProducts(fetchedProducts || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            name={product.title}  // Changed from 'title' to 'name'
            price={product.price}
            image={product.image}
            description={product.description}
          />
        ))}
      </div>
      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-8">
          <button 
            onClick={loadMoreProducts} 
            className="bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}