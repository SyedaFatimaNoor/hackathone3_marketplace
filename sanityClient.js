import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: "xrz0ku9t",
  dataset: 'production',
  apiVersion: '2024-01-04',
  useCdn: false,
  token: process.env.SANITY_ACCESS_TOKEN,
});

export default client;
