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
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
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
      
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url('/images/header.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative h-[209px] flex items-center px-8 md:px-16"
      >
        <h1 className="text-white text-4xl font-normal font-clash">
          All products
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Filters */}
          <div className="lg:w-[385px] border-r border-[#DBDBDB]">
            <FilterSection 
              selectedCategory={selectedCategory}
              selectedPriceRange={selectedPriceRange}
              onCategoryChange={handleCategoryFilter}
              onPriceChange={handlePriceFilter}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 p-8">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id} 
                    image={product.image ? urlFor(product.image).url() : '/placeholder.svg'}
                    title={product.title}
                    price={product.price}
                    category={product.category}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-12">
                <button
                  className="px-8 py-4 border border-[#2A254B] text-[#2A254B] hover:bg-[#2A254B] hover:text-white transition duration-200"
                  onClick={loadMoreProducts}
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}