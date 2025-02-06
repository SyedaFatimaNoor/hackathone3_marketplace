import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Your Company Name',
  description: 'Get in touch with us. We\'d love to hear from you!',
  keywords: ['contact', 'support', 'reach out'],
  openGraph: {
    title: 'Contact Us',
    description: 'Connect with our team',
    type: 'website',
  }
};

export default function Home() {
    return (
      <>
      <Banner />
        <Navbar />
        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `url('/images/header.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="relative h-[209px] flex items-center px-8 md:px-16"
        >
          <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-white text-4xl font-normal font-clash">
            Contact Us
          </h1>
        </div>
        <div className="w-full">
          <Contact />
        </div>
        <Footer />
      </>
    );
  }