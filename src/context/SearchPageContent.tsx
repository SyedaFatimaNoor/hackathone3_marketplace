'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/types/products";
import { Search, ShoppingBag } from 'lucide-react';

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    
    if (!searchQuery) {
      setProducts([]);
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      try {
        const query = `*[_type == "product" && (
          lower(name) match lower("${searchQuery}") ||
          lower(category) match lower("${searchQuery}") ||
          lower(description) match lower("${searchQuery}")
        )] {
          _id,
          name,
          price,
          image,
          category,
          description
        }`;

        const results = await client.fetch<Product[]>(query);
        
        setProducts(results);
        setLoading(false);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchParams.get('q') || ''}
              readOnly
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
            <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No products found</p>
            <p className="text-gray-500 mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image ? urlFor(product.image).url() : ''}
              />
            ))}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}