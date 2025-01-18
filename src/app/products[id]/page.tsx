"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "@/sanity/lib/client";
import { Product } from "types/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query; 
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        try {
          const productQuery = `*[_type == "product" && _id == "${id}"] {
            _id,
            name,
            price,
            description,
            image,
            dimensions
          }`;
          const result = await client.fetch(productQuery);
          setProduct(result[0]);  
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>{product.name}</h1>
      <p>Price: £{product.price}</p>
      <p>{product.description}</p>
      <Footer />
    </div>
  );
}
