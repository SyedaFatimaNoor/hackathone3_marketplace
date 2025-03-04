'use client';
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FilterSection from "@/components/FilterSection";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Sanity Client Config:', {
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
          apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
        });
        
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        
        console.log('Raw Fetched Products:', fetchedProducts);
        
        if (!fetchedProducts || fetchedProducts.length === 0) {
          console.warn('No products found in Sanity');
        }
        
        setProducts(fetchedProducts || []);
        setFilteredProducts(fetchedProducts || []);
      } catch (error) {
        console.error("Detailed Error fetching products:", {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : 'No stack trace',
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
        });
        
        // Set empty array to prevent undefined state
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handlePriceFilter = (range: string) => {
    setSelectedPriceRange(range === selectedPriceRange ? '' : range);
  };

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.price;
        if (max) {
          return price >= min && price <= max;
        }
        return price >= min;
      });
    }

    setFilteredProducts(filtered);
    setVisibleCount(6); // Reset visible count when filters change
  }, [selectedCategory, selectedPriceRange, products]);

  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Responsive */}
      <div
       style={{
        backgroundImage: `linear-gradient(rgba(42, 37, 75, 0.7), rgba(42, 37, 75, 0.7)), url('/images/header.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative h-[300px] flex items-center justify-center px-8 md:px-16"
      >
      <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-white text-5xl font-normal mb-4">
          All products
        </h1>
      </div>

      {/* Main Content - Responsive Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Filters - Responsive Dropdown on Mobile */}
          <div className="lg:w-[385px] lg:border-r lg:border-[#DBDBDB]">
            <div className="block lg:hidden mb-4">
              <FilterSection 
                selectedCategory={selectedCategory}
                selectedPriceRange={selectedPriceRange}
                onCategoryChange={handleCategoryFilter}
                onPriceChange={handlePriceFilter}
                isMobile={true}
              />
            </div>
            <div className="hidden lg:block">
              <FilterSection 
                selectedCategory={selectedCategory}
                selectedPriceRange={selectedPriceRange}
                onCategoryChange={handleCategoryFilter}
                onPriceChange={handlePriceFilter}
                isMobile={false}
              />
            </div>
          </div>

          {/* Products Grid - Responsive */}
          <div className="flex-1 py-4 sm:py-8">
            {isLoading ? (
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#2A254B] mx-auto mb-4"></div>
                  <p className="text-sm sm:text-base text-[#2A254B]">
                    Loading Products...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-600">
                      No products found in this category
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {filteredProducts.slice(0, visibleCount).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id} 
                        image={product.image ? urlFor(product.image).url() : '/placeholder.svg'}
                        name={product.title}
                        price={product.price}
                        description={product.description || 'No description available'}
                      />
                    ))}
                  </div>
                )}

                {/* Load More Button - Responsive */}
                {visibleCount < filteredProducts.length && (
                  <div className="flex justify-center mt-8 sm:mt-12">
                    <button
                      className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border border-[#2A254B] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition duration-200"
                      onClick={loadMoreProducts}
                    >
                      Load more products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}