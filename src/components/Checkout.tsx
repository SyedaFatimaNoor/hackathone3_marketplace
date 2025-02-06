'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Ensure to replace with your actual publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  className?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, onPaymentSuccess, className }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card Element not found');
      }

      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      // Simulate payment success (replace with actual backend call)
      onPaymentSuccess();
      setIsProcessing(false);
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError('An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`
        ${className || ''} 
        font-satoshi 
        max-w-md 
        mx-auto 
        p-6 
        bg-white 
        rounded-xl 
        shadow-lg 
        border 
        border-gray-100
      `}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Complete Your Payment</h2>
      
      {paymentError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {paymentError}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card-element">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-md p-2">
          <CardElement 
            options={{
              style: {
                base: {
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '16px',
                  color: '#333',
                },
                invalid: {
                  color: '#dc2626',
                },
              },
            }} 
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isProcessing || !stripe}
        className={`
          w-full 
          py-3 
          rounded-lg 
          text-white 
          font-bold 
          transition 
          duration-300 
          ${isProcessing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }
        `}
      >
        {isProcessing ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

const StripeCheckout: React.FC<{
  amount: number;
  onPaymentSuccess: () => void;
}> = ({ amount, onPaymentSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  );
};

export default StripeCheckout;