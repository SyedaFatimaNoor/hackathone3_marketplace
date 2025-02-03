import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import FAQComponent from "@/components/FAQ";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="bg-[#2A254B] text-white py-16">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16">
            <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-4xl md:text-5xl font-light mb-6">
              Help Center
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Find answers to common questions about our products, services, and policies. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQComponent />

        {/* Contact Section */}
        <div className="bg-[#F9F9F9] py-16">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
            <h2 style={{ fontFamily: 'ClashDisplay' }} className="text-2xl font-normal text-[#2A254B] mb-4">
              Still have questions?
            </h2>
            <p className="text-[#505977] mb-8">
              Our customer service team is here to help.
            </p>
            <Link href="/ContactUs">
            <button className="px-8 py-4 border border-[#2A254B] text-[#2A254B] hover:bg-gray-100">
              Contact Support
            </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
