/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Important for Netlify deployment
  images: {
    domains: ['cdn.sanity.io']
  }
}
  
export default nextConfig;