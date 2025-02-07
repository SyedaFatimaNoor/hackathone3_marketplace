"use client"
import { Suspense } from "react";
import { client as sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

async function fetchProduct(id: string) {
  const productQuery = `*[_type == "product" && _id == "${id}"]
  {
    _id,
    name,
    price,
    description,
    "image": {
      "url": image.asset->url,
      "_ref": image.asset->_ref,
      "_type": image.asset->_type
    },
    dimensions
  }[0]`;

  return await sanityClient.fetch(productQuery);
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product: Product = await fetchProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image 
              src={typeof product.image === 'string' 
                ? product.image 
                : product.image?.url || '/images/Photo.png'} 
              alt={product.name} 
              fill 
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">£{product.price}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
