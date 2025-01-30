import sanityClient from '@sanity/client';
import * as dotenv from 'dotenv';

// Initialize dotenv to load environment variables from the .env file
dotenv.config();

// Verify the Sanity access token is available in the environment variables
if (!process.env.SANITY_ACCESS_TOKEN) {
  throw new Error('SANITY_ACCESS_TOKEN is not set in environment variables');
}

const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id', // Use the project ID from environment variables or a default value
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', // Use the dataset from environment variables or a default value
    useCdn: true, // Use the CDN for faster, cached responses
    apiVersion: '2024-01-04', // Ensure the API version is set
    token: process.env.SANITY_ACCESS_TOKEN, // Use the access token from environment variables
});

export default client;
