import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { apiVersion, dataset, projectId } from '../env'

// Add more detailed logging
console.log('Sanity Configuration:', {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production'
});

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  perspective: 'published',
  // Add token for more reliable fetching
  token: process.env.SANITY_ACCESS_TOKEN
});

const builder = imageUrlBuilder(client)

export function urlFor(source: { asset?: { _ref: string; _type: string } } | string) {
  try {
    if (typeof source === 'string') {
      return builder.image(source);
    }
    
    if (source.asset && source.asset._ref) {
      return builder.image(source.asset);
    }
    
    console.warn('Invalid image source:', source);
    return builder.image('/placeholder.png');
  } catch (error) {
    console.error('Error in urlFor:', error);
    return builder.image('/placeholder.png');
  }
}
