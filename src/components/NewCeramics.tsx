'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";  
import { Product } from "types/products";
import { four } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const NewCeramics = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchproduct() {
      const fetchedProduct: Product[] = await client.fetch(four);
      setProducts(fetchedProduct);
    }

    fetchproduct();
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16">
      <h2
        style={{ fontFamily: "ClashDisplay" }}
        className="text-xl sm:text-2xl md:text-3xl font-normal text-[#2A254B] mb-6 sm:mb-8 text-center sm:text-left"
      >
        New ceramics
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-center">
        {products.map((product) => (
          <Link 
            key={product._id} 
            href={`/products/${product._id}`} 
            passHref 
            className="flex flex-col gap-2 sm:gap-4 w-full max-w-[300px] mx-auto"
          >
            {product.image && (
              <div className="relative w-full aspect-square">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex flex-col gap-1 sm:gap-2 text-center sm:text-left">
              <h3 className="text-sm sm:text-base md:text-xl font-normal text-[#2A254B] truncate">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-lg text-[#2A254B]">
                £{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 sm:mt-8 md:mt-12 flex justify-center">
        <Link href="/ProductListing">
          <button className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 
            border border-[#2A254B] text-[#2A254B] 
            text-xs sm:text-sm md:text-base
            hover:bg-gray-100 transition-colors rounded-md">
            View collection
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NewCeramics;