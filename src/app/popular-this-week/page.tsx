'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductListing from "@/components/ProductListing";
import { toast } from 'sonner';

export default function PopularThisWeekPage() {
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

    const handleExploreTrending = () => {
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
              Popular This Week
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
                Filter options coming soon! We&apos;re working on enhancing your shopping experience.
              </p>
            </div>
          )}
          
          <ProductListing />
          
          <div className="mt-8 text-center bg-[#F9F9F9] py-12 rounded-lg">
            <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl text-[#2A254B] mb-4">
              Trending This Week
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
              <div className="text-center">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2A254B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "ClashDisplay" }} className="text-lg text-[#2A254B] mb-2">Fastest Selling</h3>
                <p className="text-sm text-gray-600">Products flying off the shelves</p>
              </div>
              <div className="text-center">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2A254B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "ClashDisplay" }} className="text-lg text-[#2A254B] mb-2">Customer Favorites</h3>
                <p className="text-sm text-gray-600">Most loved by our community</p>
              </div>
              <div className="text-center">
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2A254B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "ClashDisplay" }} className="text-lg text-[#2A254B] mb-2">Top Rated</h3>
                <p className="text-sm text-gray-600">Highest customer satisfaction</p>
              </div>
            </div>
            <button 
              onClick={handleExploreTrending}
              className="mt-6 bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Explore Trending Collection
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
}