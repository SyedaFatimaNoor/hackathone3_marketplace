"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="bg-[#2a254b] text-white text-sm relative flex justify-between items-center px-4 py-2">
        <div className="flex-grow flex items-center justify-center space-x-2">
          <Image
            src="/images/Delivery.png"
            alt="Delivery"
            width={20}
            height={20}
            className="inline-block"
          />
          <span>
            Free delivery on all orders over €50 with code <strong>easter</strong> at checkout
          </span>
        </div>
        <button
          onClick={handleClose}
          className="text-white bg-transparent border-none cursor-pointer"
          aria-label="Close banner"
        >
          <X size={18} />
        </button>
      </div>
    )
  );
};

export default Banner;
