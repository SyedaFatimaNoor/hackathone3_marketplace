import Image from "next/image";

const FeaturesSection = () => {
  const features = [
    {
      icon: "/images/Delivery.png",
      title: "Next day as standard",
      description: "Order before 3pm and get your order the next day as standard"
    },
    {
      icon: "/images/Checkmark--outline.png",
      title: "Made by true artisans",
      description: "Handmade crafted goods made with real passion and craftsmanship"
    },
    {
      icon: "/images/Purchase.png",
      title: "Unbeatable prices",
      description: "For our materials and quality you won't find better prices anywhere"
    },
    {
      icon: "/images/Sprout.png",
      title: "Recycled packaging",
      description: "We use 100% recycled packaging to ensure our footprint is manageable"
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16">
      <h2 
        style={{ fontFamily: 'ClashDisplay' }} 
        className="text-xl sm:text-2xl md:text-3xl font-normal text-[#2A254B] mb-6 sm:mb-8 md:mb-12 text-center"
      >
        What makes our brand different
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-4"
          >
            {/* Icon */}
            <div className="flex justify-center items-center bg-[#F5F5F5] rounded-full w-10 h-10 sm:w-12 sm:h-12 mb-2">
              <Image
                src={feature.icon}
                alt={feature.title}
                className="w-5 h-5 sm:w-6 sm:h-6"
                width={24}
                height={24}
              />
            </div>

            {/* Text Section */}
            <div className="max-w-[266px] px-2 sm:px-0">
              <h3 
                style={{ fontFamily: 'ClashDisplay' }} 
                className="text-sm sm:text-base md:text-lg font-medium text-[#2A254B] mb-1"
              >
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#2A254B]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
