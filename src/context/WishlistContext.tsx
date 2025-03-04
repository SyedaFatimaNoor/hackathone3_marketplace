'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProductType } from '@/types/types';
import toast from 'react-hot-toast';

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
    // Ensure this runs only on client side
    if (typeof window !== 'undefined') {
      try {
        const savedWishlist = localStorage.getItem('wishlistItems');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Sync wishlist with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    }
  }, [wishlistItems]);

  const addToWishlist = (item: ProductType) => {
    setWishlistItems((prevItems) => {
      // Detailed logging for debugging
      console.log('Current Wishlist:', prevItems);
      console.log('Attempting to add item:', item);

      // More robust check for existing items
      const isAlreadyInWishlist = prevItems.some(
        (existingItem) => existingItem._id === item._id
      );

      if (isAlreadyInWishlist) {
        toast.error('Item is already in your favorites', {
          position: 'top-right',
          duration: 2000
        });
        return prevItems;
      }

      // Add new item
      const updatedWishlist = [...prevItems, item];
      
      toast.success('Added to favorites!', {
        position: 'top-right',
        duration: 2000
      });

      return updatedWishlist;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => {
      const updatedWishlist = prevItems.filter((item) => item._id !== id);
      
      toast.success('Removed from favorites', {
        position: 'top-right',
        duration: 2000
      });

      return updatedWishlist;
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