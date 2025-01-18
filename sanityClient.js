"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// sanityClient.js
require('dotenv').config();

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: "xrz0ku9t",
  dataset: 'production',
  apiVersion: '2024-01-04',
  useCdn: false,
  token: process.env.SANITY_ACCESS_TOKEN,
});

module.exports = { client };
