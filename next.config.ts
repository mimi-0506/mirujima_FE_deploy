import type { NextConfig } from 'next';
import { Configuration } from 'webpack';
import withSerwistInit from '@serwist/next';

const nextConfig: NextConfig = {
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
  }
};

const isProd = process.env.NODE_ENV === 'production';
const noWrapper = (config: NextConfig) => config;
const revision = crypto.randomUUID();

const serwistConfig = {
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  additionalPrecacheEntries: [{ url: '/~offline', revision }]
};

const withPWA = isProd ? withSerwistInit(serwistConfig) : noWrapper;

export default withPWA(nextConfig);
