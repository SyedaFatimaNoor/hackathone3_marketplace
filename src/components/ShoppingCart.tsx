"use client";
import Image from "next/image";
import { useCart } from '@/context/CartContext'; 
import { FaTrash } from 'react-icons/fa';  
import { toast } from 'sonner'; 
import { useRouter } from 'next/navigation';  
import { useState, useEffect } from 'react';

const ShoppingCart = () => {
  const [isClient, setIsClient] = useState(false);
  const { cartItems, removeProductFromCart, increaseQuantity, decreaseQuantity } = useCart();  
  const router = useRouter();  

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = isClient 
    ? cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    : 0;

  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity === 1) {
      removeProductFromCart(id);
      toast.success(`${item.title} has been removed from your cart!`);  
    } else {
      decreaseQuantity(id);
    }
  };

  const handleRemoveProduct = (id: string, title: string) => {
    removeProductFromCart(id);
    toast.success(`${title} has been removed from your cart!`);  
  };

  if (!isClient) {
    return (
      <section className="p-4 sm:p-8 bg-white w-full max-w-4xl mx-auto rounded-lg shadow-md">
        <h1 style={{ fontFamily: "ClashDisplay" }} className="text-2xl sm:text-3xl font-normal text-[#2A254B] mb-4 sm:mb-8">
          Your shopping cart
        </h1>
        <p className="text-center text-sm sm:text-base text-[#505977]">Loading cart...</p>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-8 bg-white w-full max-w-4xl mx-auto rounded-lg shadow-md">
      <h1 style={{ fontFamily: "ClashDisplay" }} className="text-2xl sm:text-3xl font-normal text-[#2A254B] mb-4 sm:mb-8">
        Your shopping cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-sm sm:text-base text-[#505977]">Your cart is empty.</p>
      ) : (
        <>
          <div className="w-full border-b border-gray-300 mb-4 hidden sm:block">
            <div style={{ fontFamily: "ClashDisplay" }} className="grid grid-cols-4 text-xs sm:text-sm font-medium text-[#505977]">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-2 sm:grid-cols-4 items-center py-4 border-b border-gray-200 gap-4">
              <div className="flex items-start col-span-2 sm:col-span-1">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                />
                <div className="ml-2 sm:ml-4">
                  <h2 style={{ fontFamily: "ClashDisplay" }} className="text-base sm:text-lg font-normal text-[#2A254B]">
                    {item.title}
                  </h2>
                  <span className="text-xs sm:text-sm font-medium text-[#2A254B]">£{item.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-center sm:col-auto">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="bg-gray-200 border border-gray-300 rounded-lg px-2 py-1 hover:bg-gray-300 text-sm"
                >
                  -
                </button>
                <span className="mx-2 text-base">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-200 border border-gray-300 rounded-lg px-2 py-1 hover:bg-gray-300 text-sm"
                >
                  +
                </button>
              </div>
              <div className="text-right text-base sm:text-lg text-[#2A254B] font-medium sm:col-auto">£{item.price * item.quantity}</div>
              <div className="text-center sm:col-auto">
                <button
                  onClick={() => handleRemoveProduct(item.id, item.title)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-xs sm:text-sm text-[#505977] text-center sm:text-left w-full sm:w-auto">
              Taxes and shipping are calculated at checkout
            </div>
            <div className="text-right w-full sm:w-auto">
              <p className="text-xs sm:text-sm text-[#505977]">Subtotal</p>
              <p className="text-xl sm:text-2xl font-semibold text-[#2A254B]">£{subtotal}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-8">
            <button 
              onClick={() => router.push('/checkout')}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-[#2A254B] text-white text-xs sm:text-sm font-medium rounded hover:bg-[#3a3475]"
            >
              Go to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ShoppingCart;
