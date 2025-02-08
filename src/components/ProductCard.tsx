'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import { urlFor } from "@/sanity/lib/image";
import { Heart, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SanityImageObject {
  _type: string;
  _ref?: string;
  asset?: {
    _ref?: string;
    _type: string;
  };
}

interface ProductCardProps {
  key?: string;
  id: string;
  name: string;
  price: number;
  image: string | SanityImageObject;
  description?: string;
}

const ProductCard = ({ 
  key, 
  id, 
  name, 
  price, 
  image, 
  description 
}: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Use a state that only runs on client-side
  const [isLiked, setIsLiked] = useState(false);

  // Use useEffect to set the correct initial state
  useEffect(() => {
    setIsLiked(isInWishlist(id));
  }, [id, isInWishlist]);

  // Convert Sanity image object to URL
  const getImageUrl = (img: string | SanityImageObject) => {
    if (typeof img === 'string') {
      return img.startsWith('http') || img.startsWith('/') 
        ? img 
        : '/placeholder-image.png';
    }

    try {
      if (img.asset && img.asset._ref) {
        return urlFor({ asset: img.asset }).width(400).height(400).url() || '/placeholder-image.png';
      }

      if (img._ref) {
        return urlFor({ asset: { _ref: img._ref, _type: 'image' } }).width(400).height(400).url() || '/placeholder-image.png';
      }
    } catch (error) {
      console.error('Image URL generation error:', error);
    }

    return '/placeholder-image.png';
  };

  const handleAddToCart = () => {
    try {
      const cartItem = {
        id,
        image: getImageUrl(image),
        title: name,
        price,
        quantity: 1,  
        description: description || 'No description available'
      };
      
      addToCart(cartItem);
      toast.success('Added to cart', {
        description: `${name} has been added to your cart`
      });
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling to parent elements
    setIsLiked(!isLiked);
    if (isLiked) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        _id: id,
        name,
        price,
        description: description ?? '', 
        imageUrl: typeof image === 'string' 
          ? image 
          : image?.asset?._ref 
            ? urlFor({ asset: image.asset }).width(400).height(400).url() ?? '/placeholder-image.png'
            : '/placeholder-image.png'
      });
    }
  };

  const handleProductClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div 
      onClick={handleProductClick} 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg overflow-hidden"
    >
      {/* Image Container */}
      <div 
        className="relative w-full aspect-square"
      >
        <Image 
          src={getImageUrl(image)} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          priority
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={handleLike}
          className="absolute top-4 right-4 z-10 bg-white/70 p-2 rounded-full hover:bg-white transition-colors"
        >
          {isLiked ? (
            <Heart className="w-6 h-6 fill-red-500 text-red-500" />
          ) : (
            <Heart className="w-6 h-6 text-gray-500 hover:fill-red-500 hover:text-red-500" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <h3 
          className="text-lg font-semibold text-gray-900 line-clamp-2"
        >
          {name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          
          <button 
            onClick={handleAddToCart}
            className="bg-[#2A254B] text-white p-2 rounded-full hover:bg-[#4A4262] transition-colors group/cart relative"
          >
            <ShoppingCart className="w-5 h-5 group-hover/cart:scale-110 transition-transform" />
            <span className="absolute inset-0 group-hover/cart:bg-black/10 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;