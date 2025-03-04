'use client';
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FilterSection from "@/components/FilterSection";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

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

  // Category Filtering Function
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    const filtered = products.filter(product => 
      product.category === category
    );
    
    setFilteredProducts(filtered);
    setVisibleCount(6);  // Reset visible count
    setIsMobileFilterOpen(false);  // Close mobile filter on selection
  };

  // Price Range Filtering Function
  const handlePriceChange = (range: string) => {
    setSelectedPriceRange(range);
    
    const [min, max] = range.split('-').map(Number);
    
    const filtered = products.filter(product => 
      product.price >= min && product.price <= max
    );
    
    setFilteredProducts(filtered);
    setVisibleCount(6);  // Reset visible count
    setIsMobileFilterOpen(false);  // Close mobile filter on selection
  };

  const loadMoreProducts = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const toggleMobileSort = () => {
    setIsMobileSortOpen(!isMobileSortOpen);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      {/* Mobile Top Bar */}
      <div className="block lg:hidden">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#2A254B]">
            Our Products
          </h1>
          <div className="flex space-x-2">
            {/* Mobile Filter Button */}
            <button 
              onClick={toggleMobileFilter} 
              className="flex items-center gap-1 sm:gap-2 bg-[#2A254B] text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              Filters
            </button>
            
            {/* Mobile Sort Button */}
            <button 
              onClick={toggleMobileSort} 
              className="flex items-center gap-1 sm:gap-2 bg-[#2A254B] text-white px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm"
            >
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              Sort
            </button>
          </div>
        </div>

        {/* Mobile Sort Dropdown */}
        {isMobileSortOpen && (
          <div className="absolute left-0 right-0 bg-white shadow-lg z-40 p-4">
            <div className="flex flex-col space-y-2">
              <button className="text-left py-2 hover:bg-gray-100">
                Price: Low to High
              </button>
              <button className="text-left py-2 hover:bg-gray-100">
                Price: High to Low
              </button>
              <button className="text-left py-2 hover:bg-gray-100">
                Newest Arrivals
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto">
          <div className="h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={toggleMobileFilter}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterSection 
              selectedCategory={selectedCategory}
              selectedPriceRange={selectedPriceRange}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
            />
          </div>
        </div>
      )}

      {/* Desktop and Mobile Layout */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <FilterSection 
            selectedCategory={selectedCategory}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
          />
        </div>

        {/* Products Grid */}
        <div className="w-full lg:w-3/4">
          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))}
          </div>

          {/* No Products Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 sm:py-16 md:py-20 text-gray-600">
              <p className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                No products found
              </p>
              <p className="text-xs sm:text-sm md:text-base">
                Try adjusting your filters or check back later
              </p>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="text-center mt-6 sm:mt-8 md:mt-10">
              <button 
                onClick={loadMoreProducts} 
                className="bg-[#2A254B] text-white 
                  px-4 sm:px-6 md:px-8 
                  py-2 sm:py-3 md:py-4 
                  rounded-lg 
                  text-xs sm:text-sm md:text-base
                  hover:bg-opacity-90 transition-all"
              >
                Load More Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}