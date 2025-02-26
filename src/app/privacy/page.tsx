'use client';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
    return (
      <>
        <Banner />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 style={{ fontFamily: "ClashDisplay" }}
            className="text-2xl md:text-3xl font-normal text-[#2A254B] mb-8">Privacy Policy</h1>
          <div className="prose max-w-full space-y-6 text-[#2A254B]">
            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                Information We Collect
              </h2>
              <p>At Artisan Haven, we collect information to enhance your shopping experience. This may include:</p>
              <ul className="list-disc pl-6">
                <li>Personal details when you create an account</li>
                <li>Shipping and billing information</li>
                <li>Purchase history and preferences</li>
                <li>Device and browsing information</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                How We Use Your Information
              </h2>
              <p>We use your data to:</p>
              <ul className="list-disc pl-6">
                <li>Process and fulfill your orders</li>
                <li>Personalize your shopping experience</li>
                <li>Communicate about products, services, and promotions</li>
                <li>Improve our website and customer service</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                Data Protection
              </h2>
              <p>We implement industry-standard security measures to protect your personal information, including:</p>
              <ul className="list-disc pl-6">
                <li>Encryption of sensitive data</li>
                <li>Secure payment gateways</li>
                <li>Regular security audits</li>
                <li>Restricted access to personal information</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request deletion of your data</li>
              </ul>
            </section>

            <p className="italic text-sm">
              Last updated: February 2025
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
}