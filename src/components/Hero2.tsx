import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full h-[704px] relative bg-[url('/images/Home.jpg')] bg-cover bg-center bg-no-repeat h-[calc(100vh-64px)]]">
       {/* Responsive White Content Box */}
       <div
          className="absolute bg-white w-[90%] md:w-[593px] h-auto md:h-[444px] top-1/2 left-1/2 md:top-[130px] md:left-[730px] transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 px-6 md:px-[56px] pt-[48px] pb-[46px] shadow-lg flex flex-col justify-center"
        >
          <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-2xl text-[#2A254B] md:text-3xl font-normal mb-4 leading-snug">
            Luxury homeware for people <br /> who love timeless design quality
          </h1>
          <p className="text-[#777373] text-lg font-normal mb-6">
            Shop the new Spring 2022 collection today
          </p>
          <Link href="/ProductListing">
          <button
            className="bg-[#F9F9F9] mt-24 text-[#fffff] px-8 py-4 hover:bg-gray-100 hover:text-black"
            aria-label="View collection"
          >
            View collection
          </button>
          </Link>
    </div>
    </section>
  );
};

export default HeroSection;

