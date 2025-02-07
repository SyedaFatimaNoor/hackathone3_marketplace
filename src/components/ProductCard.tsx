"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { urlFor } from "@/sanity/lib/image";
import React, { useState } from 'react';

interface SanityImageObject {
  _type: string;
  _ref?: string;
  asset?: {
    _ref?: string;
    _type: string;
  };
}

interface ProductCardProps {
  id: string;
  image: string | SanityImageObject;
  title: string;
  price: number;
}

const ProductCard = ({ id, image, title, price }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const [imageSrc, setImageSrc] = useState(
    image 
      ? urlFor(image).width(400).height(300).url() 
      : '/placeholder-image.png'
  );

  const handleImageError = () => {
    setImageSrc('/placeholder-image.png');
  };

  const handleAddToCart = () => {
    try {
      const cartItem = {
        id,
        image: imageSrc,
        title,
        description: '',
        price,
        quantity: 1
      };
      addToCart(cartItem);
      toast.success(`${title} added to cart`);
    } catch {
      toast.error('Failed to add item to cart');
    }
  };

  const handleProductClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div onClick={handleProductClick} className="cursor-pointer block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        <div className="relative w-full h-48">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300" 
            onError={handleImageError}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-bold text-gray-900">£{price.toFixed(2)}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation when adding to cart
                handleAddToCart();
              }} 
              className="bg-[#2A254B] text-white px-3 py-1 rounded hover:bg-[#3a3475] transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;