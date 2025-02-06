'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { Product } from "types/products";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q')?.trim().toLowerCase() || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setError("Please enter a search term");
        setIsLoading(false);
        return;
      }

      try {
        // More flexible search across multiple fields
        const searchQuery = `*[_type == "product" && (
          lower(name) match "*${query}*" || 
          lower(category) match "*${query}*" || 
          lower(description) match "*${query}*"
        )] {
          _id,
          name,
          price,
          image,
          category
        }`;
        
        const results = await client.fetch(searchQuery);
        setProducts(results);
        
        if (results.length === 0) {
          setError(`No results found for "${query}"`);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("An error occurred while searching");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchResults();
  }, [query, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-xl">Searching...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}  
                image={product.image ? urlFor(product.image).url() : '/placeholder.svg'}
                title={product.name}
                price={product.price}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}