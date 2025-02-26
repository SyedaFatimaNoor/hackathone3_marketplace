'use client';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReturnsPolicy() {
    return (
      <>
        <Banner />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 style={{ fontFamily: "ClashDisplay" }}
            className="text-2xl md:text-3xl font-normal text-[#2A254B] mb-8">Returns Policy</h1>
          <div className="prose max-w-full space-y-6 text-[#2A254B]">
            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                30-Day Hassle-Free Returns
              </h2>
              <p>At Artisan Haven, we want you to be completely satisfied with your purchase. If you&apos;re not happy with your item, we offer a straightforward return process.</p>
            </section>

            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                Eligibility Criteria
              </h2>
              <ul className="list-disc pl-6">
                <li>Returns must be initiated within 30 days of delivery</li>
                <li>Items must be unused, unwashed, and in original packaging</li>
                <li>Proof of purchase (receipt or order confirmation) is required</li>
                <li>Customized or personalized items are not eligible for return</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                Refund Process
              </h2>
              <p>Once we receive and inspect your returned item:</p>
              <ul className="list-disc pl-6">
                <li>Refunds are processed within 5-7 business days</li>
                <li>Original payment method will be credited</li>
                <li>Shipping costs for returns are the responsibility of the customer</li>
                <li>Damaged or defective items will receive full refund including shipping</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">
                How to Initiate a Return
              </h2>
              <ol className="list-decimal pl-6">
                <li>Log into your Artisan Haven account</li>
                <li>Go to &apos;Order History&apos; and select the item to return</li>
                <li>Choose reason for return and print return label</li>
                <li>Pack item securely in original packaging</li>
                <li>Drop off at nearest shipping location</li>
              </ol>
            </section>

            <p className="italic text-sm">
              Questions? Contact our customer support at support@artisanhaven.com
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
}