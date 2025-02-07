'use client';
import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { Product } from "types/products";
import { urlFor } from "@/sanity/lib/image";
import { Search, Filter, ShoppingBag, X } from 'lucide-react';
import { debounce } from 'lodash';
import { groq } from 'next-sanity';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        setError("Please enter a search term");
        setProducts([]);
        setFilteredProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchQuery = `*[_type == "product" && (
          lower(name) match lower("${searchTerm}") ||
          lower(category) match lower("${searchTerm}") || 
          lower(description) match lower("${searchTerm}")
        )] {
          _id,
          name,
          price,
          image,
          category,
          description
        }`;

        const results = await client.fetch(searchQuery);
        
        if (results.length === 0) {
          setError(`No results found for "${searchTerm}"`);
        }
        
        setProducts(results);
        setFilteredProducts(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("An error occurred while searching. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [client, setProducts, setFilteredProducts, setError, setIsLoading]
  );

  const handleCategoryFilter = (_category: string) => {
    setSelectedCategory(_category);
    const filtered = products.filter(product => 
      product.category && 
      typeof product.category === 'string' && 
      product.category.toLowerCase() === _category.toLowerCase()
    );
    setFilteredProducts(filtered);
  };

  const resetFilter = () => {
    setSelectedCategory(null);
    setFilteredProducts(products);
  };

  const handleQueryChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = _e.target.value;
    setQuery(newQuery);
    router.replace(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const clearSearch = () => {
    setQuery('');
    router.replace('/search');
  };

  const uniqueCategories = useMemo(() => {
    const categories = products
      .map((p: Product) => p.category)
      .filter((category): category is string => 
        category !== undefined && 
        category !== null && 
        typeof category === 'string' && 
        category.trim() !== ''
    );
    return [...new Set(categories)];
  }, [products]);

  useEffect(() => {
    const searchQuery = searchParams.get('q')?.trim().toLowerCase() || '';
    setQuery(searchQuery);
    debouncedSearch(searchQuery);
  }, [searchParams, debouncedSearch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Search Input */}
        <div className="mb-6 relative">
          <div className="flex items-center">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={query}
                onChange={handleQueryChange}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {query && (
                <button 
                  onClick={clearSearch} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {query ? `Search Results for "${query}"` : 'All Products'}
          </h1>
          
          {/* Category Filter */}
          {uniqueCategories.length > 0 && (
            <div className="relative group">
              <button 
                className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
                aria-label="Filter Categories"
              >
                <Filter className="h-6 w-6 text-gray-700" />
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
              {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  selectedCategory === category ? 'bg-gray-200' : ''
                }`}
              >
                {category}
              </button>
            ))}
                {selectedCategory && (
                  <button
                    onClick={resetFilter}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center mb-4">
            <Search className="mr-2 h-6 w-6" />
            <span>{error}</span>
          </div>
        )}

        {/* No Results State */}
        {filteredProducts.length === 0 && !error && query && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
            <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No products match your search</p>
            <p className="text-gray-500 mt-2">Try a different search term or category</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            product && typeof product === 'object' && product._id ? (
              <ProductCard 
                key={product._id} 
                id={product._id}
                title={product.name || ''} 
                price={product.price || 0} 
                image={product.image?.asset?._ref || ''} 
              />
            ) : null
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}