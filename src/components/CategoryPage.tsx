'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import client from '@/lib/sanityClient';
import { urlForImage } from '@/lib/image';
import Link from 'next/link';

interface Product {
  _id: string;
  title: string;
  price: number;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  category: string;
}

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
}

const CategoryPage = ({ category, title, description }: CategoryPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && category == $category] {
          _id,
          title,
          price,
          image,
          category
        }`;
        const result = await client.fetch(query, { category });
        setProducts(result);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2A254B]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#2A254B] text-white py-16">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-4xl md:text-5xl font-light mb-6">
            {title}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product._id}`} key={product._id}>
              <div className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={urlForImage(product.image).url()}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-lg font-medium text-[#2A254B] mb-2">{product.title}</h3>
                <p className="text-[#2A254B]">£{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl text-[#2A254B] mb-4">No products found</h2>
            <p className="text-[#505977]">Check back later for new items in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
