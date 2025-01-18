import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LogoutPage() {
  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center h-auto bg-gray-100">
      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto p-8">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <Image
            src="/images/logout.png" 
            alt="Logout"
            width={300}
            height={500}
            priority
          />
        </div>

        {/* Text Section */}
        <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
          <h1  style={{ fontFamily: "ClashDisplay" }} className="text-2xl font-bold text-[#2A254B]">You’re Logged Out</h1>
          <p className="text-lg text-gray-600 mt-4">
            You have successfully logged out. Come back soon!
          </p>
          <Link href="/login">
            <button className="mt-6 px-6 py-3 bg-[#2A254B] text-white font-medium rounded">
              Log In Again
            </button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
