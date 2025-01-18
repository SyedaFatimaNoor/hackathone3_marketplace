import Image from "next/image";
import Link from "next/link";

const StorySection = () => {
  return (
    <section className="w-full h-full grid grid-cols-1 gap-5 p-8 md:grid-cols-2">
      {/* Left Column with Text */}
      <div className="h-[598px] bg-[#2A254B] text-white flex flex-col justify-center p-12 md:p-16">
        <h2
          className="font-light text-[32px] leading-[45px] mb-3 text-2xl md:text-3xl"
          style={{ fontFamily: "ClashDisplay" }}
        >
          It started with a small idea
        </h2>
        <p className="text-[#FFFFFF] font-light --font-Satoshi text-sm md:text-base mb-8 leading-relaxed">
          A global brand with local beginnings, our story began in a small
          studio in South London in early 2014
        </p>
        <Link href="/ProductListing">
            <button  className="bg-[#F9F9F926] mt-28 text-[#fffff] px-8 py-4 hover:bg-gray-100 hover:text-black mb-10">
                View collection
            </button>
        </Link>
      </div>

      {/* Right Column with Image */}
      <div className="relative">
        <Image
          src="/images/story.png"  
          alt="Story Image"
          fill
          objectFit="cover"
          loading="lazy"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default StorySection;