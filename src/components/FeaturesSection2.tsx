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
    <section className="py-16 px-8 md:px-16">
      <h2
        style={{ fontFamily: "ClashDisplay" }}
        className="text-2xl md:text-3xl font-normal text-[#2A254B] mb-12 text-center"
      >
        What makes our brand different
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-start text-left w-[305px] bg-[#F9F9F9] p-6 rounded-lg shadow-sm"
          >
            {/* Icon */}
            <div className="flex justify-center items-center bg-[#F5F5F5] rounded-full w-12 h-12 mb-4">
              <Image
                src={feature.icon}
                alt={feature.title}
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>

            {/* Text Section */}
            <div className="w-[266px]">
              <h3
                style={{ fontFamily: "ClashDisplay" }}
                className="text-lg font-medium text-[#2A254B]"
              >
                {feature.title}
              </h3>
              <p className="text-sm text-[#2A254B] mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
