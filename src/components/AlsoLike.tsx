import Image from "next/image";
interface ProductCardProps {
    image: string;
    title: string;
    price: string;
  }
  
  const ProductCard = ({ image, title, price }: ProductCardProps) => (
    <div className="flex flex-col gap-6">
      <div className="bg-[#F5F5F5] aspect-[4/5]">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-normal text-[#2A254B]">{title}</h3>
        <p className="text-lg text-[#2A254B]">£{price}</p>
      </div>
    </div>
  );
  
  const AlsoLike = () => {
    const products = [
      {
        image: "/images/Photo.png",
        title: "The Dandy chair",
        price: "250"
      },
      {
        image: "/images/Photo2.png",
        title: "Rustic Vase Set",
        price: "155"
      },
      {
        image: "/images/Photo3.png",
        title: "The Silky Vase",
        price: "125"
      },
      {
        image: "/images/Photo4.png",
        title: "The Lucy Lamp",
        price: "399"
      }
    ];
  
    return (
      <section className="py-16 px-8 md:px-16">
        <h2 style={{fontFamily: "ClashDisplay"}} className="text-2xl md:text-3xl font-normal text-[#2A254B] mb-8">
          You may also like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-4 border border-[#2A254B] text-[#2A254B] hover:bg-gray-100">
            View collection
          </button>
        </div>
      </section>
    );
  };
  
  export default AlsoLike;