'use client';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewCeramics from "@/components/NewCeramics";
import JoinClubSection from "@/components/JoinClubSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ImageSlider, { SliderImage } from '@/components/ImageSlider';
import PopularProducts from '@/components/PopularProducts';

// Define slider images with responsive properties
const sliderImages: SliderImage[] = [
  {
    src: '/images/furniture.jpg',
    mobileSrc: '/images/furniture.jpg',
    alt: 'Modern Home Decor Collection',
    title: 'Elevate Your Space',
    description: 'Discover Elegant Furniture and Accessories'
  },
  {
    src: '/images/homeware.jpeg',
    mobileSrc: '/images/homeware.jpeg',
    alt: 'Minimalist Living Room Setup',
    title: 'Simplify Your Living',
    description: 'Curated Designs for Modern Lifestyles'
  },
  {
    src: '/images/chairs.jpeg',
    mobileSrc: '/images/chairs.jpeg',
    alt: 'Cozy Home Essentials',
    title: 'Comfort Meets Style',
    description: 'Transforming Spaces with Thoughtful Design'
  }
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <NewCeramics />
      <ImageSlider 
        images={sliderImages} 
        autoSlideInterval={5000} 
      />
      <JoinClubSection />
      <AboutSection />
      <Footer />
    </main>
  );
}