'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addProductToCart: (newProduct: CartItem) => void;
  removeProductFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getTotalItems: () => number;
  clearCart: () => void; // Add clearCart to the interface
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
        }
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      toast.error('Error loading your cart');
    }
  }, []);

  // Save cart items to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && isInitialized) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      toast.error('Error saving your cart');
    }
  }, [cartItems, isInitialized]);

  const addProductToCart = (newProduct: CartItem) => {
    try {
      setCartItems((prevItems) => {
        const existingProductIndex = prevItems.findIndex((item) => item.id === newProduct.id);
        if (existingProductIndex > -1) {
          const updatedCartItems = [...prevItems];
          updatedCartItems[existingProductIndex].quantity += newProduct.quantity;
          return updatedCartItems;
        }
        return [...prevItems, newProduct];
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Error adding product to cart');
    }
  };

  const removeProductFromCart = (id: number) => {
    try {
      setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Error removing product from cart');
    }
  };

  const increaseQuantity = (id: number) => {
    try {
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.error('Error increasing quantity:', error);
      toast.error('Error updating quantity');
    }
  };

  const decreaseQuantity = (id: number) => {
    try {
      setCartItems((prevItems) =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        )
      );
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      toast.error('Error updating quantity');
    }
  };

  const getTotalItems = () => {
    try {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      console.error('Error calculating total items:', error);
      return 0;
    }
  };

  // Implement clearCart function
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addProductToCart,
      removeProductFromCart,
      increaseQuantity,
      decreaseQuantity,
      getTotalItems,
      clearCart,  
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};