"use client";
import Image from "next/image";
import { useCart } from '@/context/CartContext'; 
import { FaTrash } from 'react-icons/fa';  
import { toast } from 'sonner'; 
import { useRouter } from 'next/navigation';  

const ShoppingCart = () => {
  const { cartItems, removeProductFromCart, increaseQuantity, decreaseQuantity } = useCart();  
  const router = useRouter();  

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

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

  return (
    <section className="p-8 bg-white max-w-4xl mx-auto rounded-lg shadow-md">
      <h1 style={{ fontFamily: "ClashDisplay" }} className="text-3xl font-normal text-[#2A254B] mb-8">
        Your shopping cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-[#505977]">Your cart is empty.</p>
      ) : (
        <>
          <div className="w-full border-b border-gray-300 mb-4">
            <div style={{ fontFamily: "ClashDisplay" }} className="grid grid-cols-4 text-sm font-medium text-[#505977]">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-4 items-center py-4 border-b border-gray-200">
              <div className="flex items-start">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-16 h-16 object-cover"
                />
                <div className="ml-4">
                  <h2 style={{ fontFamily: "ClashDisplay" }} className="text-lg font-normal text-[#2A254B]">
                    {item.title}
                  </h2>
                  <span className="text-sm font-medium text-[#2A254B]">£{item.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="bg-gray-200 border border-gray-300 rounded-lg px-2 py-1 hover:bg-gray-300"
                >
                  -
                </button>
                <span className="mx-2 text-lg">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-200 border border-gray-300 rounded-lg px-2 py-1 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div className="text-right text-lg text-[#2A254B] font-medium">£{item.price * item.quantity}</div>
              <div className="text-center">
                <button
                  onClick={() => handleRemoveProduct(item.id, item.title)} // Pass title for notification
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash /> {/* Using the trash icon */}
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-[#505977]">Taxes and shipping are calculated at checkout</div>
            <div className="text-right">
              <p className="text-sm text-[#505977]">Subtotal</p>
              <p className="text-2xl font-semibold text-[#2A254B]">£{subtotal}</p>
            </div>
          </div>
          <div className="mt-8">
            <button 
              onClick={() => router.push('/checkout')}  // Navigate to checkout page
              className="w-full px-6 py-3 bg-[#2A254B] text-white text-sm font-medium rounded hover:bg-[#3a3475]"
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
