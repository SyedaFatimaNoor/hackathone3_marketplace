'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";  
import { Product } from "types/products";
import { three } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct: Product[] = await client.fetch(three);
      setProducts(fetchedProduct);
    }

    fetchProduct();
  }, []);

  return (
    <section className="py-4 sm:py-8 md:py-12 px-4 sm:px-8 md:px-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-[#2A254B] mb-6 sm:mb-8 text-center md:text-left">
        Our popular products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* First Large Product */}
        {products.length > 0 && (
          <Link 
            href={`/products/${products[0]._id}`} 
            className="block md:col-span-1 space-y-4"
          >
            <div className="bg-[#F5F5F5] w-full h-[43%] aspect-square relative">
              {products[0].image && (
                <Image
                  src={urlFor(products[0].image).url()}
                  alt={products[0].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-md"
                />
              )}
            </div>
            <div className="text-center md:text-left mt-2 sm:mt-4">
              <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#2A254B] truncate">
                {products[0].name}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#2A254B]">
                £{products[0].price}
              </p>
            </div>
          </Link>
        )}

        {/* Other Products Grid */}
        {products.length > 1 && (
          <div className="md:col-span-1 grid grid-cols-2 gap-4 sm:gap-6">
            {products.slice(1).map((product) => (
              <Link 
                key={product._id} 
                href={`/products/${product._id}`} 
                className="block space-y-2 sm:space-y-4"
              >
                <div className="bg-[#F5F5F5] w-full aspect-square relative">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover rounded-md"
                    />
                  )}
                </div>
                <div className="text-center mt-2 sm:mt-4">
                  <h3 className="text-xs sm:text-sm md:text-base font-normal text-[#2A254B] truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[#2A254B]">
                    £{product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
