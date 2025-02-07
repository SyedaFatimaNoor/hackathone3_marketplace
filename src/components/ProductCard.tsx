"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { urlFor } from "@/sanity/lib/image";

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

  // Convert Sanity image object to URL
  const getImageUrl = (img: string | SanityImageObject) => {
    if (typeof img === 'string') return img;
    
    // Handle Sanity image object
    return urlFor({ 
      asset: img.asset || { _ref: img._ref, _type: 'image' } 
    }).width(300).height(300).url();
  };

  const handleAddToCart = () => {
    try {
      const cartItem = {
        id,
        image: getImageUrl(image),
        title,
        description: '',
        price,
        quantity: 1
      };
      addToCart(cartItem);
      toast.success(`${title} added to cart`);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleProductClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div onClick={handleProductClick} className="cursor-pointer block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        <div className="relative w-full pt-[100%]">
          <Image 
            src={getImageUrl(image)} 
            alt={title} 
            fill 
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
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