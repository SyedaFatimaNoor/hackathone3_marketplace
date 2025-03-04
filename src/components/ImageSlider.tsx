'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Define slider image type
export interface SliderImage {
  src: string;
  mobileSrc?: string;
  alt: string;
  title: string;
  description: string;
}

// Props interface for ImageSlider
interface ImageSliderProps {
  images: SliderImage[];
  autoSlideInterval?: number;
  height?: string;
  className?: string;
  contentPosition?: 'left' | 'center' | 'right';
  contentOverlay?: boolean;
  showNavigation?: boolean;
  showIndicators?: boolean;
}

export default function ImageSlider({ 
  images, 
  autoSlideInterval = 5000,
  height = 'h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]',
  className = '',
  contentPosition = 'center',
  contentOverlay = true,
  showNavigation = true,
  showIndicators = true
}: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive image selection and screen resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Automatic slide progression
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % images.length
      );
    }, autoSlideInterval);

    // Cleanup listeners
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(slideInterval);
    };
  }, [images, autoSlideInterval]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide + 1) % images.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const contentPositionClass = {
    'left': 'items-start justify-start text-left',
    'center': 'items-center justify-center text-center',
    'right': 'items-end justify-end text-right'
  }[contentPosition];

  return (
    <section className={`relative w-full ${height} overflow-hidden ${className}`}>
      {images.map((slide, index) => (
        <div 
          key={index}
          className={`
            absolute inset-0 transition-opacity duration-700 ease-in-out
            ${currentSlide === index ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Responsive Image */}
          <Image
            src={isMobile && slide.mobileSrc ? slide.mobileSrc : slide.src}
            alt={slide.alt}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover object-center"
          />

          {/* Overlay Content */}
          {contentOverlay && (
            <div className={`absolute inset-0 bg-black bg-opacity-40 flex ${contentPositionClass}`}>
              <div className={`text-white px-4 sm:px-6 md:px-8 max-w-xl`}>
                <h1 className="
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                  font-bold mb-2 sm:mb-3 md:mb-4
                  drop-shadow-lg
                ">
                  {slide.title}
                </h1>
                <p className="
                  text-sm sm:text-base md:text-lg lg:text-xl 
                  max-w-xl mx-auto
                  drop-shadow-md
                ">
                  {slide.description}
                </p>
                <Link href="/ProductListing">
                <button className="
                  mt-4 sm:mt-6 md:mt-8 
                  px-4 sm:px-6 md:px-8 
                  py-2 sm:py-3 md:py-4 
                  bg-white text-[#2A254B] 
                  rounded-lg 
                  text-xs sm:text-sm md:text-base
                  hover:bg-opacity-90 
                  transition-all
                ">
                  Shop Now
                </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      {showNavigation && (
        <>
          <button 
            onClick={prevSlide}
            className="
              absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 
              bg-white/50 hover:bg-white/70 
              rounded-full p-2 sm:p-3 
              z-10 transition-all
            "
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#2A254B]" />
          </button>
          <button 
            onClick={nextSlide}
            className="
              absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 
              bg-white/50 hover:bg-white/70 
              rounded-full p-2 sm:p-3 
              z-10 transition-all
            "
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#2A254B]" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && (
        <div className="
          absolute bottom-4 sm:bottom-6 md:bottom-8 
          left-1/2 -translate-x-1/2 
          flex space-x-2
        ">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                w-2 h-2 sm:w-3 sm:h-3 rounded-full
                ${currentSlide === index ? 'bg-white' : 'bg-white/50'}
                transition-all
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
}