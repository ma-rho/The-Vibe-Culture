
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb', 
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      { 
        protocol: 'https', 
        hostname: 'api.microlink.io' 
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        // This is the correct path that matches the error message you provided.
        pathname: '/v0/b/the-vibe-culture.appspot.com/o/**',
      },
      // It seems you may have another bucket name format, let's add it too.
       {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/the-vibe-culture.firebasestorage.app/o/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
