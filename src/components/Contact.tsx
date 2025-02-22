"use client"

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      formRef.current?.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Sorry, something went wrong. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 style={{ fontFamily: 'ClashDisplay' }} className="text-3xl font-bold text-[#2A254B] mb-4">
          Send Us a Message
        </h2>
        <p className="text-gray-600">
          Have a question or want to work together? Drop us a message!
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              id="name"
              required
              className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#2A254B] focus:ring-[#2A254B]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#2A254B] focus:ring-[#2A254B]"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#2A254B] focus:ring-[#2A254B]"
            placeholder="What is this regarding?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#2A254B] focus:ring-[#2A254B]"
            placeholder="Your message here..."
          />
        </div>

        {status.message && (
          <div
            className={`p-4 rounded-md ${
              status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#2A254B] text-white py-4 px-6 rounded-md hover:bg-[#2A254B]/90 transition-colors
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
