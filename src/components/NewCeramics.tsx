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
    <section className="py-16 px-8 md:px-16">
      <h2
        style={{ fontFamily: "ClashDisplay" }}
        className="text-2xl md:text-3xl font-normal text-[#2A254B] mb-8"
      >
        New ceramics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`} passHref>
            <div
              className="flex flex-col gap-4"
              style={{ width: "281px", height: "445px" }}
            >
              {product.image && (
                <div className="relative w-[281px] h-[300px]">
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-normal text-[#2A254B]">{product.name}</h3>
                <p className="text-lg text-[#2A254B]">£{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
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

export default NewCeramics;