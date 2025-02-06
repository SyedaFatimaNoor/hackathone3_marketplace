'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import StripeCheckout from '@/components/Checkout';
import Image from 'next/image';
import { FaShoppingCart, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const { cartItems, calculateTotal, clearCart } = useCart();
  const [paymentCompleted, setPaymentCompleted] = useState(false);


  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    clearCart();  
  };

  if (paymentCompleted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F9F5F0]">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-[#E6E2D9]">
            <div className="p-6 sm:p-8">
              <div className="flex items-center mb-6 border-b pb-4 border-[#E6E2D9]">
                <FaCheckCircle className="text-2xl mr-3 text-[#2A254B]" />
                <h2 className="text-xl font-bold text-[#2A254B]">Payment Successful!</h2>
              </div>
              <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
              <button 
                onClick={() => window.location.href = '/'} 
                className="bg-[#2A254B] text-white px-6 py-2 rounded-lg hover:bg-[#2A254B] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F5F0]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-[#E6E2D9]">
          {/* Header */}
          <div className="bg-[#2A254B] text-white p-6 flex items-center">
            <FaShoppingCart className="text-3xl mr-4" />
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      width={80} 
                      height={80} 
                      className="rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total */}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-[#2A254B]">₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-gray-50 p-6">
            <div className="flex items-center mb-4">
              <FaCreditCard className="text-2xl mr-3 text-[#2A254B]" />
              <h2 className="text-xl font-semibold text-[#2A254B]">Payment Details</h2>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-[#2A254B]">
                <span>Subtotal</span>
                <span>${(calculateTotal() / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#2A254B] font-bold">
                <span>Total</span>
                <span>${(calculateTotal() / 100).toFixed(2)}</span>
              </div>
            </div>

            <StripeCheckout 
              amount={calculateTotal()} 
              onPaymentSuccess={handlePaymentSuccess} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}