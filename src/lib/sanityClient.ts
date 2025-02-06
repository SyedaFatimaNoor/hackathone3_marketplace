import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Initialize dotenv to load environment variables from the .env file
dotenv.config();

// For server-side operations (if needed)
export const serverClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xrz0ku9t', 
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', 
    useCdn: false, // Set to false for server-side to ensure fresh data
    apiVersion: process.env.SANITY_API_VERSION || '2024-01-04', 
    token: process.env.SANITY_ACCESS_TOKEN || undefined,
});

// For client-side operations
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xrz0ku9t', 
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', 
    useCdn: true,
    apiVersion: process.env.SANITY_API_VERSION || '2024-01-04'
});

export default client;
