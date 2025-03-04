import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 flex items-center">
          <div className="max-w-xl mx-auto">
            <h2 
              style={{ fontFamily: 'ClashDisplay' }} 
              className="text-xl sm:text-2xl md:text-3xl font-normal text-[#2A254B] mb-4 sm:mb-6"
            >
              From a studio in London to a global brand with over 400 outlets
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#505977] mb-6 sm:mb-8 leading-relaxed">
              When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. 
              
              Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become 
              the hotbed for the London interior design community.
            </p>
            <Link href="/ContactUs" className="block">
              <button 
                className="mt-4 sm:mt-6 md:mt-8 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 
                border border-[#2A254B] text-[#2A254B] 
                text-xs sm:text-sm md:text-base
                hover:bg-gray-100 transition-colors rounded-md"
              >
                Get in touch
              </button>
            </Link>
          </div>
        </div>
        <div className="relative w-full aspect-square md:aspect-auto md:h-full bg-[#F5F5F5]">
          <Image
            src={"/images/about.png"}
            alt="About Avion"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>
    );
  };
  
  export default AboutSection;