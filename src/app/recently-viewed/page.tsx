'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductListing from "@/components/ProductListing";
import { toast } from 'sonner';

export default function RecentlyViewedPage() {
    const router = useRouter();
    const [isHistoryCleared, setIsHistoryCleared] = useState(false);

    const handleClearHistory = () => {
        setIsHistoryCleared(true);
        toast.success('Recently viewed items have been cleared', {
            description: 'Your browsing history is now empty.'
        });
    };

    const handleContinueShopping = () => {
        router.push('/ProductListing');
    };

    const handleCreateWishlist = () => {
        router.push('/wishlist');
        toast.info('Wishlist feature is coming soon!');
    };

    return (
      <>
        <Banner />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 style={{ fontFamily: "ClashDisplay" }}
              className="text-2xl md:text-3xl font-normal text-[#2A254B]">
              Recently Viewed
            </h1>
            <div className="flex space-x-4">
              <button 
                onClick={handleClearHistory}
                className="text-sm text-[#2A254B] border border-[#2A254B] px-4 py-2 rounded-lg hover:bg-[#2A254B] hover:text-white transition-colors"
                disabled={isHistoryCleared}
              >
                {isHistoryCleared ? 'History Cleared' : 'Clear History'}
              </button>
            </div>
          </div>
          
          {isHistoryCleared && (
            <div className="bg-[#F9F9F9] p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">
                Your recently viewed items list is empty.
              </p>
            </div>
          )}
          
          <ProductListing />
          
          <div className="mt-8 text-center bg-[#F9F9F9] py-12 rounded-lg">
            <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl text-[#2A254B] mb-4">
              Rediscover Your Favorite Pieces
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
              Your recently viewed items are a reflection of your unique taste. 
              Take another look at these pieces that caught your eye.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleContinueShopping}
                className="bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Continue Shopping
              </button>
              <button 
                onClick={handleCreateWishlist}
                className="border border-[#2A254B] text-[#2A254B] px-6 py-3 rounded-lg hover:bg-[#2A254B] hover:text-white transition-colors"
              >
                Create Wishlist
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}