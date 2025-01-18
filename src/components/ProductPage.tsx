import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <Image
            src={"/images/chair.png"}
            alt="The Dandy Chair"
            width={700}
            height={700}
            className="rounded shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 style={{fontFamily: "ClashDisplay"}} className="text-[36px] text-[#2A254B] font-normal ">The Dandy Chair</h1>
          <p className="text-xl font-medium text-gray-600 mb-4">£250</p>
          <div className="p-[40px]">
            <h1 style={{fontFamily: "ClashDisplay"}} className="text-base text-[#2A254B] font-normal mb-4">Description</h1>
          <p className="mb-4 text-gray-600">
            A timeless design, with premium materials features as one of our
            most popular and classic pieces. The dandy chair is perfect for any
            stylish living space with both large and smaller leather upholsters.
          </p>

          <ul className="list-disc pl-5 mb-6 text-gray-700">
            <li>Timeless design</li>
            <li>Premium materials</li>
            <li>Handcrafted upholstery</li>
            <li>Quality infused classic</li>
          </ul>

          <div className="mb-6">
            <h2 className="font-bold mb-2">Dimensions:</h2>
            <p>Height: 100cm</p>
            <p>Width: 75cm</p>
            <p>Depth: 50cm</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="border border-gray-300 rounded w-16 p-2 text-center"
            />
            <button className="bg-[#2A254B] w-[143px] h-[53px] text-white px-4 py-2 ml-[50%] shadow-md">
              Add to cart
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
