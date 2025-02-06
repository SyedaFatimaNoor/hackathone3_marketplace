'use client';
import Image from "next/image";
import Link from "next/link";
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
}

const ProductCard = ({ id, image, title, price }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    try {
      const cartItem = {
        id,
        image,
        title,
        description: '',
        price,
        quantity: 1,
      };
      
      addToCart(cartItem);
      toast.success(`${title} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="flex flex-col gap-6 cursor-pointer group transition duration-300 hover:shadow-lg hover:scale-105">
      <Link href={`/products/${id}`} passHref>
        <div className="bg-[#F5F5F5] aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover transition duration-300 transform group-hover:scale-110"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal text-[#2A254B]">{title}</h3>
        <p className="text-lg text-[#2A254B]">£{price}</p>
        <button 
          onClick={handleAddToCart} 
          className="mt-2 px-4 py-2 bg-[#2A254B] text-white rounded hover:bg-[#3a3475] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;