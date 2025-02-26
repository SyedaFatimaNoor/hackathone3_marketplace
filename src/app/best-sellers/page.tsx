'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductListing from "@/components/ProductListing";
import { toast } from 'sonner';

export default function BestSellersPage() {
    const router = useRouter();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortOption, setSortOption] = useState('default');

    const handleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
        toast.info('Filter options will be implemented soon!');
    };

    const handleSort = () => {
        const sortOptions = ['default', 'price-low', 'price-high', 'newest'];
        const currentIndex = sortOptions.indexOf(sortOption);
        const nextIndex = (currentIndex + 1) % sortOptions.length;
        setSortOption(sortOptions[nextIndex]);
        
        toast.success(`Sorted by: ${sortOptions[nextIndex]}`, {
            description: 'Sorting will be fully implemented in a future update.'
        });
    };

    const handleExploreBestSellers = () => {
        router.push('/ProductListing');
    };

    return (
      <>
        <Banner />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 style={{ fontFamily: "ClashDisplay" }}
              className="text-2xl md:text-3xl font-normal text-[#2A254B]">
              Best Sellers
            </h1>
            <div className="flex space-x-4">
              <button 
                onClick={handleFilter}
                className="text-sm text-[#2A254B] border border-[#2A254B] px-4 py-2 rounded-lg hover:bg-[#2A254B] hover:text-white transition-colors"
              >
                Filter
              </button>
              <button 
                onClick={handleSort}
                className="text-sm text-[#2A254B] border border-[#2A254B] px-4 py-2 rounded-lg hover:bg-[#2A254B] hover:text-white transition-colors"
              >
                Sort: {sortOption === 'default' ? 'Default' : 
                       sortOption === 'price-low' ? 'Price: Low to High' : 
                       sortOption === 'price-high' ? 'Price: High to Low' : 
                       'Newest'}
              </button>
            </div>
          </div>
          
          {isFilterOpen && (
            <div className="bg-[#F9F9F9] p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">
                Filter options coming soon! We're working on enhancing your shopping experience.
              </p>
            </div>
          )}
          
          <ProductListing />
          
          <div className="mt-8 text-center bg-[#F9F9F9] py-12 rounded-lg">
            <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl text-[#2A254B] mb-4">
              Why Our Best Sellers Are Customer Favorites
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
              <div className="text-center">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2A254B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "ClashDisplay" }} className="text-lg text-[#2A254B] mb-2">Unique Design</h3>
                <p className="text-sm text-gray-600">Handcrafted pieces that stand out</p>
              </div>
              <div className="text-center">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2A254B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "ClashDisplay" }} className="text-lg text-[#2A254B] mb-2">Quality Materials</h3>
                <p className="text-sm text-gray-600">Premium ceramics that last</p>
              </div>
              <div className="text-center">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2A254B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "ClashDisplay" }} className="text-lg text-[#2A254B] mb-2">Timeless Appeal</h3>
                <p className="text-sm text-gray-600">Classic styles that never go out of fashion</p>
              </div>
            </div>
            <button 
              onClick={handleExploreBestSellers}
              className="mt-6 bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Explore Best Sellers
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
}