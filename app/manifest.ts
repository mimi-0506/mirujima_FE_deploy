import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '🍅 미루지마',
    short_name: '미루지마',
    description:
      '아티클, 영상, 일정, PDF를 할일 목록으로 정리하고, 대시보드에서 진행 상황을 한눈에 관리하는 서비스',
    categories: ['목표', '할일', '일정', '노트', '정리', '관리'],
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/images/android/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/images/android/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
