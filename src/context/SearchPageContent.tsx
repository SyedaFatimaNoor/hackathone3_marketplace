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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-blue-200 rounded-full focus:outline-none focus:ring-3 focus:ring-blue-500 shadow-md transition-all duration-300 ease-in-out"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Search className="text-blue-500 w-6 h-6" />
            </button>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-6 h-6" />
          </form>
          {searchParams.get('q') && (
            <p className="text-center text-gray-600 mt-4">
              Showing results for: <span className="font-bold text-blue-600">{searchParams.get('q') || ''}</span>
            </p>
          )}
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl border border-gray-100">
            <ShoppingBag className="h-24 w-24 text-blue-300 mb-6 animate-pulse" />
            <p className="text-2xl text-gray-700 font-semibold mb-2">No products found</p>
            <p className="text-gray-500 text-lg">Try searching with different keywords</p>
            <p className="text-gray-400 mt-4 italic">Suggestions:
              <span className="ml-2 text-blue-500">Try product name, category, or description</span>
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {products.length} Product{products.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="flex space-x-2 text-gray-600">
                <span>Sort by:</span>
                <select className="border rounded px-2 py-1">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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