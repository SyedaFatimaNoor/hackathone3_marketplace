"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item: any) => {
    try {
      addToCart({
        id: item._id,
        image: item.imageUrl || '/placeholder-image.png',
        title: item.name,
        price: item.price,
        quantity: 1,
        description: item.description
      });
      toast.success('Added to cart', {
        description: `${item.name} has been added to your cart`
      });
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </Link>
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <p className="text-xl text-gray-600">Your wishlist is empty</p>
          <Link 
            href="/" 
            className="mt-4 inline-block bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-[#4A4262] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item._id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
            >
              <Link href={`/product/${item._id}`} className="block">
                <div className="relative w-full aspect-square">
                  <Image 
                    src={item.imageUrl || '/placeholder-image.png'} 
                    alt={item.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-4 space-y-2">
                <Link href={`/product/${item._id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-gray-700">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    £{item.price.toFixed(2)}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Heart className="w-6 h-6 fill-red-500" />
                    </button>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="bg-[#2A254B] text-white p-2 rounded-full hover:bg-[#4A4262] transition-colors group/cart relative"
                    >
                      <ShoppingCart className="w-5 h-5 group-hover/cart:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}