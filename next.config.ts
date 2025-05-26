import type { NextConfig } from "next";
const nextConfig = {
 
  reactStrictMode: false,

  images: {
    unoptimized:false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
       
    ],
  },
};

export default nextConfig;
