import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Capacitor (iOS/Android) builds
  // Remove this line if deploying to Vercel with API routes enabled
  output: "export",

  // Required for static export with Next.js Image component
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
