import axios from 'axios';
import client from './sanityClient.js'; // Ensure default import

import slugify from 'slugify';

async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 10000 });
    const buffer = Buffer.from(new Uint8Array(response.data as ArrayBuffer)); // Ensure the type is ArrayBuffer

    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(), // Extract the filename from URL
    });

    console.log('Image uploaded successfully:', asset);

    return asset._id;
  } catch (error) {
    console.error('❌ Failed to upload image:', imageUrl, error);
    return null;
  }
}

interface Category {
  _id?: string;
  _type?: string;
  name: string;
  slug: string;
}

async function createCategory(category: Category, counter: number) {
  try {
    const categoryExist = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, {
      slug: category.slug,
    });

    if (categoryExist) {
      return categoryExist._id;
    }

    const catObj = {
      _type: 'category',
      _id: `${category.slug}-${counter}`,
      name: category.name,
      slug: { _type: 'slug', current: category.slug },
    };

    const response = await client.createOrReplace(catObj);
    console.log('Category created successfully', response);

    return response._id;
  } catch (error) {
    console.error('❌ Failed to create category:', category.name, error);
  }
}

interface Product {
  name: string;
  image?: string;
  category: {
    name: string;
  };
  price: number;
  tags?: string[];
  description?: string;
  features?: string[];
  dimensions?: {
    height: string;
    width: string;
    depth: string;
  };
}

async function importData() {
  try {
    const response = await axios.get('https://hackathon-apis.vercel.app/api/products');
    const products: Product[] = response.data as Product[]; // Explicitly type the response data

    let counter = 1;

    for (const product of products) {
      let imageRef = null;
      let catRef = null;

      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      if (product.category.name) {
        catRef = await createCategory({
          name: product.category.name,
          slug: slugify(product.category.name, { lower: true, strict: true }),
        }, counter);
      }

      const sanityProduct = {
        _id: `product-${counter}`,
        _type: 'product',
        name: product.name,
        slug: {
          _type: 'slug',
          current: slugify(product.name || 'default-product', { lower: true, strict: true }),
        },
        price: product.price,
        category: { _type: 'reference', _ref: catRef || undefined },
        tags: product.tags || [],
        quantity: 50,
        image: imageRef ? { _type: 'image', asset: { _type: 'reference', _ref: imageRef } } : undefined,
        description: product.description || 'A timeless design with premium materials...',
        features: product.features || ['Premium material', 'Handmade upholstery', 'Quality timeless classic'],
        dimensions: product.dimensions || { _type: 'dimensions', height: '110cm', width: '75cm', depth: '50cm' },
      };

      counter++;

      console.log('Uploading product:', sanityProduct);
      await client.createOrReplace(sanityProduct);
      console.log(`✅ Imported product: ${sanityProduct.name}`);
    }

    console.log('✅ Data import completed!');
  } catch (error) {
    console.error('❌ Error importing data:', error);
  }
}

export default importData;
