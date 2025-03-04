'use client';

import React, { useEffect, useState, ReactElement } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from '@/types/products';
import { urlFor } from "@/sanity/lib/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Notification from '@/components/Notification';
import Link from 'next/link';

// Inline type definition for Sanity Image Object
interface SanityImageObject {
  _type: string;
  _ref?: string;
  asset?: {
    _ref?: string;
    _type: string;
  };
}

export default function SingleProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log("Attempting to fetch product with ID:", params.id);
        setIsLoading(true);
        
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          price,
          description,
          category,
          "imageUrl": image.asset->url,
          image {
            asset->{
              url,
              _id
            },
            url,
            _ref,
            _type
          },
          dimensions {
            width,
            height,
            depth
          }
        }`;

        const fetchedProduct: Product | null = await client.fetch(query, { id: params.id });
        
        console.log("Fetched Product Details:", fetchedProduct);
        
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          console.error(`No product found with ID: ${params.id}`);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  useEffect(() => {
    if (product) {
      setIsInFavorites(isInWishlist(product._id));
    }
  }, [product, isInWishlist]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      if (product && product.category) {
        const related = await fetchRelatedProducts(product.category);
        console.log('Related Products:', related);
        setRelatedProducts(related);
      }
    };

    loadRelatedProducts();
  }, [product]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id || "0",
        image: 
          product.image?.url || 
          (typeof product.image === 'string' ? product.image : "/placeholder.svg"),
        title: product.name,
        description: product.description || "",
        price: product.price,
        quantity,
      });
      setNotification(`${product.name} has been added to your cart!`);
    }
  };

  const handleToggleFavorites = () => {
    if (product) {
      if (isInFavorites) {
        removeFromWishlist(product._id);
        setIsInFavorites(false);
      } else {
        // Helper function to extract image object
        const getImageForWishlist = () => {
          // Type guard for string image
          if (typeof product.image === 'string') {
            return {
              url: product.image,
              _ref: '',
              _type: 'image'
            };
          }

          // Type guard for object with url property
          if (product.image && typeof product.image === 'object' && 'url' in product.image) {
            return {
              url: (product.image as { url: string }).url,
              _ref: (product.image as { _ref?: string })._ref || '',
              _type: (product.image as { _type?: string })._type || 'image'
            };
          }

          // Type guard for Sanity image object with asset
          if (product.image && typeof product.image === 'object' && 'asset' in product.image) {
            const sanityImage = product.image as SanityImageObject;
            return {
              url: urlFor(sanityImage).url() || "/placeholder.svg",
              _ref: sanityImage._ref || '',
              _type: sanityImage._type || 'image'
            };
          }

          // Fallback
          return {
            url: "/placeholder.svg",
            _ref: '',
            _type: 'image'
          };
        };

        addToWishlist({
          _id: product._id,
          name: product.name,
          price: product.price,
          description: product.description || "",
          image: getImageForWishlist(),
        });
        setIsInFavorites(true);
      }
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const fetchRelatedProducts = async (category: string) => {
    try {
      const query = `*[_type == "product" && category == $category && _id != $currentProductId] | order(price asc) [0...4] {
        _id,
        name,
        price,
        "slug": slug.current,
        "imageUrl": image.asset->url
      }`;

      const relatedProducts = await client.fetch(query, { 
        category, 
        currentProductId: product?._id 
      });
      return relatedProducts;
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  };

  const fetchProductDetails = async () => {
    try {
      const query = `*[_type == "product" && _id == $id][0]{
        _id,
        name,
        price,
        description,
        category,
        "imageUrl": image.asset->url,
        image {
          asset->{
            url,
            _id
          },
          url,
          _ref,
          _type
        },
        dimensions {
          width,
          height,
          depth
        }
      }`;

      const fetchedProduct: Product | null = await client.fetch(query, { id: params.id });
      
      console.log("Fetched Product Details:", fetchedProduct);
      
      return fetchedProduct;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-pulse">
          <svg 
            className="mx-auto h-16 w-16 text-[#2A254B] opacity-50" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <p 
            style={{ fontFamily: 'ClashDisplay' }} 
            className="mt-4 text-xl text-[#2A254B] font-medium tracking-wide"
          >
            Loading Product
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Preparing product details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <svg 
            className="mx-auto h-16 w-16 text-[#2A254B] opacity-70" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9.172 16.172a4 4 0 005.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p 
            style={{ fontFamily: 'ClashDisplay' }} 
            className="mt-4 text-2xl text-[#2A254B] font-medium tracking-wide"
          >
            Product Not Found
          </p>
          <p className="text-base text-gray-600 mt-2 max-w-md mx-auto">
            We couldn't find the product you're looking for. It may have been removed or the link is incorrect.
          </p>
          <div className="mt-6">
            <Link 
              href="/ProductListing" 
              className="inline-block bg-[#2A254B] text-white px-6 py-3 rounded hover:bg-opacity-90 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
          {/* Product Image */}
          {product && (
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <Image
                src={
                  product.image?.url 
                    ? urlFor(product.image).url() 
                    : product.imageUrl 
                    ? product.imageUrl 
                    : "/placeholder.svg"
                }
                alt={product.name || "Product Image"}
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-md"
                priority
                onError={(e) => {
                  const imgElement = e.target as HTMLImageElement;
                  imgElement.onerror = null;
                  imgElement.src = "/placeholder.svg";
                }}
              />
            </div>
          )}
          {/* Product Details */}
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
            <h1 
              style={{ fontFamily: 'ClashDisplay' }} 
              className="text-2xl md:text-3xl lg:text-4xl text-[#434C5B] font-medium"
            >
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-semibold">£{product.price}</p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>
            
            {/* Dimensions */}
            <div className="mt-4 md:mt-6">
              <h3 className="text-base md:text-lg font-medium mb-2">Dimensions</h3>
              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div>
                  <span className="block font-medium text-sm md:text-base">Height</span>
                  <span className="text-xs md:text-sm">
                    {product.dimensions?.height !== undefined 
                      ? `${product.dimensions.height}` 
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-sm md:text-base">Width</span>
                  <span className="text-xs md:text-sm">
                    {product.dimensions?.width !== undefined 
                      ? `${product.dimensions.width} ` 
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block font-medium text-sm md:text-base">Depth</span>
                  <span className="text-xs md:text-sm">
                    {product.dimensions?.depth !== undefined 
                      ? `${product.dimensions.depth} ` 
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="mt-4 md:mt-6">
              <h3 className="text-base md:text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-max">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 md:px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-l-lg"
                  aria-label="Decrease Quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  readOnly
                  className="w-12 md:w-16 text-center text-gray-800 focus:outline-none bg-transparent text-sm md:text-base"
                  aria-label="Quantity"
                />
                <button
                  onClick={increaseQuantity}
                  className="px-3 md:px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg"
                  aria-label="Increase Quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                onClick={handleAddToCart} 
                className="w-full sm:w-auto bg-[#2A254B] rounded border border-[#2a254b] text-white px-8 py-3 hover:bg-[#fff] hover:text-black transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleToggleFavorites} 
                className={`w-full sm:w-auto rounded border border-[#2a254b] px-8 py-3 transition-colors duration-300 ${
                  isInFavorites 
                    ? 'bg-[#2A254B] text-white' 
                    : 'bg-[#fff] text-black hover:bg-[#2A254B] hover:text-white'
                }`}
              >
                {isInFavorites ? 'Remove from Favorites' : 'Save to Favorites'}
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