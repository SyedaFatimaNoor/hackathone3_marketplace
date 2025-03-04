import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
      <section className="w-full px-4 sm:px-8 md:px-0 py-8 sm:py-12 md:py-0">
        <div className="w-full">
          {/* Mobile and Tablet Hero */}
          <div className="md:hidden bg-[#2A254B] px-4 sm:px-8 py-8 sm:py-12">
            <div className="text-white max-w-xl mx-auto">
              <h1 className="font-normal text-2xl sm:text-3xl leading-tight mb-6 sm:mb-8 text-center">
                The furniture brand for the future, with timeless designs
              </h1>
              <div className="flex justify-center mb-6 sm:mb-8">
                <Link href="/ProductListing">
                  <button className="bg-white text-[#2A254B] px-6 sm:px-8 py-3 sm:py-4 hover:bg-gray-100 rounded-md">
                    View collection
                  </button>
                </Link>
              </div>
              <p className="text-[#FFFFFF] opacity-80 text-sm sm:text-base leading-relaxed text-center">
                A new era in eco-friendly furniture with Avion, the French luxury retail brand with nice fonts, tasteful colors, and a beautiful way to display things digitally using modern web technologies.
              </p>
            </div>
          </div>
   
          {/* Desktop Hero */}
          <div className="hidden md:grid md:grid-cols-2 bg-[#2A254B] min-h-screen">
            {/* Left Content - 50% width */}
            <div className="text-white flex items-center px-8 lg:px-16 py-12 md:py-0">
              <div className="max-w-[513px] mx-auto">
                <h1 
                  style={{ fontFamily: 'ClashDisplay' }} 
                  className="font-light text-3xl lg:text-[40px] leading-tight mb-8 lg:mb-10"
                >
                  The furniture brand for the <br /> future, with timeless designs
                </h1>
                <Link href="/ProductListing">
                  <button 
                    className="bg-[#F9F9F926] text-white px-8 py-4 text-lg hover:bg-gray-100 hover:text-black mb-8 lg:mb-10 rounded-md transition-colors"
                  >
                    View collection
                  </button>
                </Link>
                <p className="text-[#FFFFFF] text-base lg:text-lg font-light leading-relaxed">
                  A new era in eco-friendly furniture with Avion, the French luxury retail brand with nice fonts, tasteful colors, and a beautiful way to display things digitally using modern web technologies.
                </p>
              </div>
            </div>
   
            {/* Right Image - 50% width */}
            <div className="bg-[#2A254B] flex items-center justify-center">
              <div className="w-full h-full relative">
                <Image
                  src={"/images/Right Image.png"}
                  alt={"Featured Furniture"}
                  fill
                  className="object-cover w-full h-full"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;