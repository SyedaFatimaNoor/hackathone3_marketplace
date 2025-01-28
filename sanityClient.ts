import sanityClient from '@sanity/client';
import * as dotenv from 'dotenv' // Changed import syntax

// Initialize dotenv
dotenv.config();

// Verify token is available
if (!process.env.SANITY_ACCESS_TOKEN) {
  throw new Error('SANITY_ACCESS_TOKEN is not set in environment variables');
}

const client = sanityClient({
    projectId: 'your_project_id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
});

export default client;