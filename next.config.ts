import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  // Allow mobile access in dev
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: ['192.168.100.5', 'localhost:3000']
  })
};

export default nextConfig;
