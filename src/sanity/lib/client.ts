import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '../env'

// Enhanced error handling for configuration
if (!projectId || !dataset || !apiVersion) {
  throw new Error('Sanity configuration is missing required values. Check your environment variables.');
}

// Improved logging with more details
console.log('Sanity Configuration:', {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  tokenPresent: !!process.env.SANITY_ACCESS_TOKEN
});

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  token: process.env.SANITY_ACCESS_TOKEN,
  // Add stega content for better debugging
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
});

// Enhanced image builder with better typing
const builder = imageUrlBuilder(client)

// Improved urlFor function with better error handling and types
export function urlFor(source: { asset?: { _ref: string; _type: string } } | string) {
  try {
    // Handle string sources
    if (typeof source === 'string') {
      return builder.image(source).url();
    }
    
    // Handle object sources with asset
    if (source?.asset?._ref) {
      return builder.image(source.asset).url();
    }
    
    // Enhanced logging for invalid sources
    console.warn('Invalid image source provided:', {
      sourceType: typeof source,
      source: JSON.stringify(source)
    });
    
    // Return a default placeholder URL
    return '/placeholder.png';
  } catch (error) {
    console.error('Error processing image URL:', {
      error,
      source: typeof source === 'string' ? source : JSON.stringify(source)
    });
    return '/placeholder.png';
  }
}

// Add a health check function
export async function validateSanityConnection() {
  try {
    await client.fetch('*[_type == "sanity.imageAsset"][0]');
    return true;
  } catch (error) {
    console.error('Sanity connection validation failed:', error);
    return false;
  }
}
