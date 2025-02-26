'use client';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function VacanciesPage() {
    return (
      <>
        <Banner />
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 style={{ fontFamily: "ClashDisplay" }}
            className="text-2xl md:text-3xl font-normal text-[#2A254B] mb-8">Current Job Vacancies</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">Sales Representative</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Full-time position in our retail department</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium bg-[#2A254B] text-white px-3 py-1 rounded-full">Retail</span>
                  <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">Full-time</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Assist customers with product selection</li>
                  <li>Maintain store presentation</li>
                  <li>Process sales transactions</li>
                </ul>
                <button className="mt-4 w-full bg-[#2A254B] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              <h2 style={{ fontFamily: "ClashDisplay" }} className="text-xl font-semibold mb-4">Customer Support Specialist</h2>
              <div className="space-y-4">
                <p className="text-gray-600">Remote position with flexible hours</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium bg-[#2A254B] text-white px-3 py-1 rounded-full">Support</span>
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Remote</span>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>Provide excellent customer service</li>
                  <li>Resolve customer inquiries</li>
                  <li>Manage support tickets</li>
                </ul>
                <button className="mt-4 w-full bg-[#2A254B] text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p style={{ fontFamily: "ClashDisplay" }} className="text-lg text-[#2A254B] mb-4">
              Don't see a role that fits? Send us your resume!
            </p>
            <button className="bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              Send Resume
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
}