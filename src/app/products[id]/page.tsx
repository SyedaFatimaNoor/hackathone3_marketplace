"use client"
import { Suspense } from "react";
import { useParams } from "next/navigation";
import { client as sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

async function ProductDetailsContent() {
  const params = useParams();
  const id = params.id as string;

  const productQuery = `*[_type == "product" && _id == "${id}"]
  {
    _id,
    name,
    price,
    description,
    "image": image.asset->{
      _ref,
      url
    },
    dimensions
  }[0]`;

  const product: Product = await sanityClient.fetch(productQuery);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-96">
          <Image 
            src={product.image?.asset ? urlFor(product.image.asset).url() : '/placeholder-image.png'} 
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
  );
}

export default function ProductDetailsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetailsContent />
      </Suspense>
      <Footer />
    </>
  );
}
