'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Product } from "types/products";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useCart } from '@/context/CartContext'; // Import the useCart hook
import Notification from '@/components/Notification'; // Import the Notification component

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { addToCart } = useCart(); // Get the addToCart function from context
  const [notification, setNotification] = useState<string | null>(null); // State for notification

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct: Product = await client.fetch(
          `*[_type == "product" && _id == $id][0]`,
          { id }
        );
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent quantity from going below 1
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id || "0", // Keep as string
        image: product.image ? urlFor(product.image).url() : "",
        title: product.name,
        description: product.description || "",
        price: product.price,
        quantity,
      });
      setNotification(`${product.name} has been added to your cart!`);
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Product Image */}
          <div className="flex-1">
            <Image
              src={product.image ? urlFor(product.image).url() : "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Product Details */}
          <div className="flex-1">
            <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-3xl text-[#434C5B] font-medium">{product.name}</h1>
            <p className="text-2xl text-gray-700 mt-4">£{product.price}</p>
            <p className="mt-6 text-gray-600">{product.description}</p>
            <div className="mt-8">
              <h3 className="text-lg font-medium">Dimensions</h3>
              <div className="grid grid-cols-3 gap-4 mt-2 text-gray-700">
                <div>
                  <span className="block font-medium">Height</span>
                  {product.dimensions?.height || "N/A"}
                </div>
                <div>
                  <span className="block font-medium">Width</span>
                  {product.dimensions?.width || "N/A"}
                </div>
                <div>
                  <span className="block font-medium">Depth</span>
                  {product.dimensions?.depth || "N/A"}
                </div>
              </div>
            </div>
            {/* Quantity Selector */}
            <div className="mt-8">
              <h3 className="text-lg font-medium">Quantity</h3>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={decreaseQuantity}
                  className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  readOnly
                  className="w-16 border border-gray-300 rounded-lg text-center"
                />
                <button
                  onClick={increaseQuantity}
                  className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mt-8">
              <button onClick={handleAddToCart} className="bg-[#2A254B] border text-white px-8 py-4 hover:bg-[#F9F9F926] hover:text-black mb-10">
                Add to Cart
              </button>
              <button className="bg-[#F9F9F926] border text-[#fffff] px-8 py-4 hover:bg-[#2A254B] hover:text-white mb-10">
                Save to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {notification && <Notification message={notification} onClose={closeNotification} />}
    </div>

  );
}