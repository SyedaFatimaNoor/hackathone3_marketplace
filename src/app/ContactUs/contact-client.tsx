'use client';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactClient() {
  return (
    <>
      <Banner />
      <Navbar />
      
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(42, 37, 75, 0.7), rgba(42, 37, 75, 0.7)), url('/images/header.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative h-[300px] flex items-center justify-center px-8 md:px-16"
      >
        <div className="text-center">
          <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-white text-5xl font-normal mb-4">
            Contact Us
          </h1>
          <p className="text-white text-lg opacity-90">Get in touch with our team</p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="bg-[#2A254B]/10 p-4 rounded-full w-fit mb-6">
              <MapPin className="w-8 h-8 text-[#2A254B]" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-[#2A254B]">Our Location</h3>
            <p className="text-gray-600">123 Avion Street, Karachi, Pakistan</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="bg-[#2A254B]/10 p-4 rounded-full w-fit mb-6">
              <Phone className="w-8 h-8 text-[#2A254B]" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-[#2A254B]">Phone Number</h3>
            <p className="text-gray-600">+92 (300) 373-8600</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="bg-[#2A254B]/10 p-4 rounded-full w-fit mb-6">
              <Mail className="w-8 h-8 text-[#2A254B]" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-[#2A254B]">Email Address</h3>
            <p className="text-gray-600">syedanoor610@gmail.com</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
            <div className="bg-[#2A254B]/10 p-4 rounded-full w-fit mb-6">
              <Clock className="w-8 h-8 text-[#2A254B]" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-[#2A254B]">Working Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9AM to 5PM</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542156477359!2d-0.12985968422955556!3d51.50736731882254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1645000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-50 py-16">
        <Contact />
      </div>

      <Footer />
    </>
  );
} 