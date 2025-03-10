import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true
};

const withPWA = require('next-pwa')(pwaConfig);

const nextConfig: NextConfig = withPWA({
  experimental: {
    forceSwcTransforms: true
  },
  reactStrictMode: false,
  webpack(config: Configuration, { isServer }: { isServer: boolean }) {
    config?.module?.rules?.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    });

    if (!isServer && config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-remove-console']
        }
      });
    }

    return config;
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: process.env.NEXT_PUBLIC_S3_BUCKET_HOST || '' }]
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.mirujima.shop/:path*'
      }
    ];
  }
});

export default nextConfig;
