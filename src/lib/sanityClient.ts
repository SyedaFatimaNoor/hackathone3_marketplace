import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Initialize dotenv to load environment variables from the .env file
dotenv.config();

// Verify the Sanity access token is available in the environment variables
if (!process.env.SANITY_ACCESS_TOKEN) {
  throw new Error('SANITY_ACCESS_TOKEN is not set in environment variables');
}

// For server-side operations (if needed)
export const serverClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xrz0ku9t', 
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', 
    useCdn: false, // Set to false for server-side to ensure fresh data
    apiVersion: '2024-01-04', 
    token: process.env.SANITY_ACCESS_TOKEN,
});

// For client-side operations
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xrz0ku9t', 
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', 
    useCdn: true,
    apiVersion: '2024-01-04'
    // Explicitly removed token
});

export default client;
