const JoinClubSection = () => {
    return (
      <section className="py-16 bg-[#F9F9F9] flex justify-center items-center">
        <div className="text-center bg-white w-[94%] h-80 md:w-[80%] p-8 rounded-2xl">
          {/* Heading */}
          <h2 style={{ fontFamily: 'ClashDisplay' }} className=" text-[36px] md:text-3xl font-normal mt-[38px] text-[#2A254B] mb-4">
            Join the club and get the benefits
          </h2>
          {/* Subheading */}
          <p className=" h-[38px] text-sm md:text-base text-[#2A254B] mb-8">
            Sign up for our newsletter and receive exclusive offers on new <br /> ranges,
            sales, pop up stores and more
          </p>
          {/* Email Input & Button */}
          <div className="flex justify-center items-center gap-0 bg-[#F9F9F9] rounded-md overflow-hidden max-w-lg mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 py-3 px-4 text-sm text-[#2A254B] bg-[#F9F9F9] border-none focus:outline-none placeholder:text-[#B3B3B3] w-[472px] h-[56px] "
            />
            <button className="py-3 h-[56px] px-8 bg-[#2A254B] text-white text-sm font-medium">
              Sign up
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default JoinClubSection;
  