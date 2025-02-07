import localFont from 'next/font/local';

import { InfoStoreProvider, ModalStoreProvider } from '@/provider/store-provider';
import ReactQueryProvider from '../hooks/useReactQuery';

import type { Metadata } from 'next';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
});

export const metadata: Metadata = {
  title: '🍅 미루지마',
  description:
    '아티클, 영상, 일정, PDF를 할일 목록으로 정리하고, 대시보드에서 진행 상황을 한눈에 관리하는 서비스'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InfoStoreProvider>
      <ModalStoreProvider>
        <html lang="ko">
          <body className={`${pretendard.className} antialiased`}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </body>
        </html>
      </ModalStoreProvider>
    </InfoStoreProvider>
  );
}
