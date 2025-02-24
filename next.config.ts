// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     forceSwcTransforms: true
//     // serverActions: {
//     //   allowedOrigins: [process.env.NEXT_PUBLIC_BASE_URL as string]
//     // }
//   },
//   reactStrictMode: false,
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack']
//     });
//     return config;
//   },
//   images: {
//     remotePatterns: [
//       { protocol: 'http', hostname: 'i.pinimg.com' },
//       { protocol: 'https', hostname: 'i.pinimg.com' }
//     ]
//   }
// };

// export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 기존 설정 유지 */
  experimental: {
    forceSwcTransforms: true
  },
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    });
    return config;
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: process.env.NEXT_PUBLIC_S3_BUCKET_HOST }]
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
};

export default nextConfig;
