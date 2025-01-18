import Image from "next/image";
const Service = () => {
    return (
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Right Section (Image) */}
        <div className="h-[600px] bg-[#F5F5F5]">
          <Image
            src={"/images/services.jpg"}
            height={600}
            width={720}
            alt="About Avion"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Left Section (Text) */}
        <div className="px-8 md:px-16 py-16">
          <div className="max-w-xl">
            <h2 style={{ fontFamily: 'ClashDisplay' }} className="text-2xl font-normal text-[#2A254B] mb-6">
              Our service isn’t just personal, it’s actually
              hyper personally exquisite
            </h2>
            <p className="text-base text-[#505977] mb-8">
              When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. 
              <br />
              <br />
              <br />
              Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become 
              the hotbed for the London interior design community.
            </p>
            <button className="mt-[125px] px-8 py-4 border border-[#2A254B] text-[#2A254B] hover:bg-gray-100">
              Get in touch
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default Service;
  