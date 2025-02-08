"use client"
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { client as sanityClient } from "@/sanity/lib/client";
import { ProductType as Product } from "@/types/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [isClient, setIsClient] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsClient(true);

    async function fetchProduct() {
      if (!params.id) return;

      const productQuery = `*[_type == "product" && _id == "${params.id}"]
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

      try {
        const fetchedProduct = await sanityClient.fetch(productQuery);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  // Server-side rendering fallback
  if (!isClient) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div>Loading product details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div>Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div>Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product._id)) {
        removeFromWishlist(product._id);
      } else {
        addToWishlist(product);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 relative">
          <div className="relative h-96">
            <Image 
              src={product.image?.url || product.imageUrl || '/images/Photo.png'} 
              alt={product.name} 
              fill 
              className="object-cover rounded-lg"
            />
            <button 
              onClick={handleWishlistToggle}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
            >
              <Heart 
                size={24} 
                fill={isInWishlist(product._id) ? 'red' : 'none'} 
                color={isInWishlist(product._id) ? 'red' : 'black'}
                strokeWidth={1.5}
              />
            </button>
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
