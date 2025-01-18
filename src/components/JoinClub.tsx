import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid"; 

const JoinClubSection = () => {
  return (
    <section className="relative text-center py-20 px-4">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/wall.jpg"
          alt="background"
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white">
         <h2 style={{ fontFamily: 'ClashDisplay' }} className=" text-[36px] md:text-3xl font-normal mt-[38px] mb-4">
            Join the club and get the benefits
          </h2>
          {/* Subheading */}
          <p className=" h-[38px] text-sm md:text-base mb-8">
            Sign up for our newsletter and receive exclusive offers on new <br /> ranges,
            sales, pop up stores and more
          </p>

        {/* Benefits List */}
        <div className="flex justify-center space-x-8 text-sm md:text-base mb-8">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-6 w-6 text-white" />  
            <span>Exclusive offers</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-6 w-6 text-white" />
            <span>Free events</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-6 w-6 text-white" />
            <span>Large discounts</span>
          </div>
        </div>

        {/* Email Signup */}
        <form className="flex justify-center items-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 py-3 px-4 rounded-l-md text-gray-600 outline-none"
            required
          />
          <button
            type="submit"
            className="bg-[#252354] text-white py-3 px-6 rounded-r-md font-medium hover:bg-[#1a1a3a]"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinClubSection;
