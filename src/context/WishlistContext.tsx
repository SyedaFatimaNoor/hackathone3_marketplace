'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProductType } from '@/types/types';
import { toast } from 'sonner';

type WishlistContextType = {
  wishlistItems: ProductType[];
  addToWishlist: (item: ProductType) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getWishlistCount: () => number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<ProductType[]>(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlistItems');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    // Only update localStorage on client-side
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const addToWishlist = (item: ProductType) => {
    setWishlistItems((prevItems) => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex((i) => i._id === item._id);
      
      if (existingItemIndex !== -1) {
        // If item exists, do nothing
        toast.info('Item already in wishlist');
        return prevItems;
      }
      
      // If item doesn't exist, add it
      toast.success('Added to wishlist');
      return [...prevItems, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => {
      const newItems = prevItems.filter((item) => item._id !== id);
      toast.success('Removed from wishlist');
      return newItems;
    });
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item._id === id);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist,
        getWishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};