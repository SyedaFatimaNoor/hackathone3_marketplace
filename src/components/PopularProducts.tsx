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
    <section className="py-16 px-8 md:px-16">
      <h2 className="text-2xl md:text-3xl font-normal text-[#2A254B] mb-8">
        Our popular products
      </h2>

      {/* Grid layout for large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* First Product */}
        {products.length > 0 && (
          <Link href={`/products/${products[0]._id}`} passHref>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div
                className="bg-[#F5F5F5] mx-auto"
                style={{ maxWidth: "100%", height: "375px" }}
                key={products[0]._id}
              >
                {products[0].image && (
                  <Image
                    src={urlFor(products[0].image).url()}
                    alt={products[0].name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 text-center">
                <h3 className="text-xl font-normal text-[#2A254B]">
                  {products[0].name}
                </h3>
                <p className="text-lg text-[#2A254B]">£{products[0].price}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Other Products */}
        {products.length > 1 && (
          <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {products.slice(1).map((product) => (
              <Link key={product._id} href={`/products/${product._id}`} passHref>
                <div className="flex flex-col gap-6">
                  <div
                    className="bg-[#F5F5F5] mx-auto"
                    style={{ maxWidth: "100%", height: "375px" }}
                  >
                    {product.image && (
                      <Image
                        src={urlFor(product.image).url()}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 text-center">
                    <h3 className="text-xl font-normal text-[#2A254B]">
                      {product.name}
                    </h3>
                    <p className="text-lg text-[#2A254B]">£{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* View Collection Button */}
      <div className="mt-12 flex justify-center">
        <Link href="/ProductListing">
          <button className="px-8 py-4 border border-[#2A254B] text-[#2A254B] hover:bg-gray-100">
            View collection
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PopularProducts;
