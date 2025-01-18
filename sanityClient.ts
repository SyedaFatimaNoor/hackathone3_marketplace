// sanityClient.ts
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv' // Changed import syntax

// Initialize dotenv
dotenv.config();

// Verify token is available
if (!process.env.SANITY_ACCESS_TOKEN) {
  throw new Error('SANITY_ACCESS_TOKEN is not set in environment variables');
}

export const client = createClient({
  projectId: "xrz0ku9t",
  dataset: 'production',
  apiVersion: '2024-01-04',
  useCdn: false,
  token: process.env.SANITY_ACCESS_TOKEN,
});