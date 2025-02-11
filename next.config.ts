import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    forceSwcTransforms: true
    // serverActions: {
    //   allowedOrigins: [process.env.NEXT_PUBLIC_BASE_URL as string]
    // }
  },
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' }
    ]
  }
};

export default nextConfig;
