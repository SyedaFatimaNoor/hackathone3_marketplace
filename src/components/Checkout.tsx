"use client";

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const { cartItems, clearCart } = useCart(); // Use clearCart from context
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order placement (you can replace this with actual API call)
    setTimeout(() => {
      clearCart(); // Clear the cart
      toast.success('Congratulations! Your order has been placed.');
      router.push('/'); // Redirect to home page
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-[#2A254B]">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-[#505977]">Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#2A254B] text-white py-2 rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
