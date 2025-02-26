'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewCeramics from "@/components/NewCeramics";
import { toast } from 'sonner';

export default function NewArrivalsPage() {
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

    const handleExploreCollection = () => {
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
              New Arrivals
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
          
          <NewCeramics />
          
          <div className="mt-8 text-center bg-[#F9F9F9] py-12 rounded-lg">
            <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl text-[#2A254B] mb-4">
              Discover Our Latest Collection
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
              Each piece tells a unique story, crafted with passion and precision by skilled artisans from around the world.
            </p>
            <button 
              onClick={handleExploreCollection}
              className="bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Explore Full Collection
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
}