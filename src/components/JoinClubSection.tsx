const JoinClubSection = () => {
    return (
      <section className="py-8 sm:py-16 bg-[#F9F9F9] flex justify-center items-center">
        <div className="text-center bg-white w-[95%] sm:w-[90%] md:w-[80%] p-4 sm:p-8 rounded-2xl max-w-4xl mx-auto">
          {/* Heading */}
          <h2 
            style={{ fontFamily: 'ClashDisplay' }} 
            className="text-2xl sm:text-3xl md:text-[36px] font-normal mt-4 sm:mt-[38px] text-[#2A254B] mb-4 leading-tight"
          >
            Join the club and get the benefits
          </h2>
          
          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base text-[#2A254B] mb-6 sm:mb-8 px-2 sm:px-0">
            Sign up for our newsletter and receive exclusive offers on new ranges, 
            sales, pop up stores and more
          </p>
          
          {/* Email Input & Button */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 bg-[#F9F9F9] rounded-md overflow-hidden max-w-lg mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full sm:flex-1 py-2 sm:py-3 px-4 text-xs sm:text-sm text-[#2A254B] 
                         bg-[#F9F9F9] border-none focus:outline-none 
                         placeholder:text-[#B3B3B3] sm:h-[56px] rounded-md sm:rounded-none"
            />
            <button 
              className="w-full sm:w-auto py-2 sm:py-3 px-6 sm:px-8 bg-[#2A254B] 
                         text-white text-xs sm:text-sm font-medium 
                         rounded-md sm:rounded-none hover:bg-[#3a3475] transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default JoinClubSection;