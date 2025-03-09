import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const pwaConfig = {
  dest: 'public', // Service Worker 파일이 저장될 경로
  register: true, // Service Worker 자동 등록
  skipWaiting: true // 새 Service Worker가 즉시 활성화되도록 설정
};

const withPWA = require('next-pwa')(pwaConfig);

const nextConfig: NextConfig = withPWA({
  /* 기존 설정 유지 */
  experimental: {
    forceSwcTransforms: true
  },
  reactStrictMode: false,
  webpack(config: Configuration) {
    config?.module?.rules?.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    });
    return config;
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: process.env.NEXT_PUBLIC_S3_BUCKET_HOST || '' }]
  },

  // ✅ rewrites 추가
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
