import Image from "next/image";
import Link from "next/link";
const HeroSection = () => {
    return (
      <section className="w-full p-[71px]">
        <div className="max-w-[1440px] mx-auto">
          {/* Mobile Hero */}
          <div className="md:hidden bg-[#2A254B] px-8 py-12">
            <div className="text-white max-w-xl">
              <h1 className="font-normal text-[32px] leading-[45px] mb-10">
                The furniture brand for the future, with timeless designs
              </h1>
              <button className="bg-white text-[#2A254B] px-8 py-4 hover:bg-gray-100 mb-10">
                View collection
              </button>
              <p className="text-[#FFFFFF] opacity-80 text-base leading-6">
                A new era in eco-friendly furniture with Avion, the French luxury retail brand with nice fonts, tasteful colors, and a beautiful way to display things digitally using modern web technologies.
              </p>
            </div>
          </div>
  
          {/* Desktop Hero */}
          <div className="hidden md:grid md:grid-cols-2 bg-[#2A254B]">
            {/* Left Content */}
            <div className="text-white p-16">
              <div className="max-w-[513px]">
                <h1 style={{ fontFamily: 'ClashDisplay' }} className="font-light text-[32px] leading-[45px] mb-10">
                     The furniture brand for the <br /> future, with timeless designs
                </h1>
                <Link href="/ProductListing">
                  <button  className="bg-[#F9F9F926] text-[#fffff] px-8 py-4 hover:bg-gray-100 hover:text-black mb-10">
                    View collection
                  </button>
                </Link>
                <p className="text-[#FFFFFF] mt-[350px] leading[27px] text-lg font-light --font-Satoshi leading-6">
                  A new era in eco-friendly furniture with Avion, the French luxury retail brand with nice fonts, tasteful colors, and a beautiful way to display things digitally using modern web technologies.
                </p>
              </div>
            </div>
  
            {/* Right Image */}
            <div className="bg-[#2A254B] flex items-center justify-center">
              <Image
                src={"/images/Right Image.png"}
                height={5000}
                width={5000}
                alt={"Featured Furniture"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;