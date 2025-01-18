import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center h-auto bg-gray-100">
      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto p-8">
        {/* Image Section */}
        <div className="flex-shrink-0">
          <Image
            src="/images/404.png"  
            alt="404 Error"
            width={300}
            height={300}
            priority
          />
        </div>

        {/* Text Section */}
        <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
          <h1 style={{ fontFamily: "ClashDisplay" }} className="text-5xl font-bold text-[#2A254B]">OOPS!</h1>
          <p className="text-lg text-gray-600 mt-4">
            Looks like Big Foot has broken the link
          </p>
          <Link href="/">
            <button className="mt-6 px-6 py-3 bg-[#2A254B] text-white font-medium rounded hover:bg-[#3a336b] transition">
              Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
