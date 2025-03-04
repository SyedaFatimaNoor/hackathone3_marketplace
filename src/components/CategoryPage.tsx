"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/products";
import ProductCard from './ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CategoryPageProps {
  categoryName: string;
}

export default function CategoryPage({ categoryName }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        const query = `*[_type == "product" && category == "${categoryName}"]{
          _id,
          name, 
          price, 
          description,
          "imageUrl": image.asset->url,
          category
        }`;

        const results = await client.fetch<Product[]>(query);
        setProducts(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[70vh] w-full">
          <Image 
            src={
              categoryName === "Plant Pots" 
                ? "/images/plantpots.jpeg" 
                : categoryName === "Furniture"
                ? "/images/furniture.jpg"
                : categoryName === "Crockery"
                ? "/images/crockery.jpg"
                : categoryName === "Chairs"
                ? "/images/chairs.jpeg"
                : categoryName === "Homeware"
                ? "/images/homeware.jpeg"
                : categoryName 
                ? `/images/${categoryName.toLowerCase().replace(' ', '-')}-hero.jpg`
                : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' style='background-color: %232A254B'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='48'></text></svg>"
            }
            alt={`${categoryName || 'Category'} Collection`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
              {categoryName || 'Category'} Collection
            </h1>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-normal text-[#2A254B]">
              {categoryName || 'Category'} Products
            </h2>
            <div className="flex space-x-2 text-gray-600">
              <span className="hidden sm:inline">Sort by:</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600">
                No products found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
      
     
