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
import { useRouter } from 'next/navigation';

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    
    if (!searchQuery) {
      setProducts([]);
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      try {
        console.log('Fetching products with query:', searchQuery);
        
        const query = `*[_type == "product" && (
          name match "${searchQuery}*" || 
          category match "${searchQuery}*" || 
          description match "${searchQuery}*"
        )]{
          _id,
          name, 
          price, 
          description,
          "imageUrl": image.asset->url,
          category
        }`;

        console.log('Sanity Query:', query);

        const results = await client.fetch<Product[]>(query);
        
        console.log('Fetched Products:', results);
        
        if (results.length === 0) {
          console.warn('No products found for query:', searchQuery);
        }

        setProducts(results);
        setLoading(false);
      } catch (err) {
        console.error('Detailed Search Error:', {
          message: err instanceof Error ? err.message : String(err),
          query: searchQuery,
          stack: err instanceof Error ? err.stack : undefined
        });
        setError(`Failed to fetch products: ${err instanceof Error ? err.message : String(err)}`);
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
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 md:py-4 
                text-sm sm:text-base md:text-lg 
                border border-blue-200 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                shadow-sm transition-all duration-300 ease-in-out"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Search className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </form>
          {searchParams.get('q') && (
            <p className="text-center text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 md:mt-4">
              Showing results for: <span className="font-bold text-blue-600">{searchParams.get('q') || ''}</span>
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 bg-white rounded-2xl shadow-xl border border-gray-100">
            <ShoppingBag className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-blue-300 mb-4 sm:mb-5 md:mb-6 animate-pulse" />
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-semibold mb-2">No products found</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center px-4">Try searching with different keywords</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 sm:mt-3 md:mt-4 italic text-center px-4">
              Suggestions:
              <span className="ml-2 text-blue-500 block sm:inline">Try product name, category, or description</span>
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
                {products.length} Product{products.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                <span>Sort by:</span>
                <select className="border rounded px-2 py-1 text-xs sm:text-sm">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard 
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrl || '/default-product-image.png'}
                  description={product.description}
                />
              ))}
            </div>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}