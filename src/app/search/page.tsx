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
  const query = searchParams.get('q');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        router.push('/404');
        return;
      }

      try {
        
        const searchQuery = `*[_type == "product" && name match "*${query}*"] {
          _id,
          name,
          price,
          image
        }`;
        
        const results = await client.fetch(searchQuery);
        setProducts(results);
        
         
        if (results.length === 0) {
          router.push('/404');
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        router.push('/404');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearchResults();
  }, [query, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <h1 className="text-3xl font-normal text-[#2A254B] mb-8">
          Search Results for &ldquo;{query}&rdquo;
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}  
              image={product.image ? urlFor(product.image).url() : '/placeholder.svg'}
              title={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}