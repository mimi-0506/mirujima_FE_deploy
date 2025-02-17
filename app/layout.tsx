import localFont from 'next/font/local';

import NavBar from '@/components/navBar';

import AllProviders from './AllProviders';

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
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <AllProviders>
          <NavBar />
          <div className="flex h-screen w-screen justify-center overflow-hidden bg-gray100">
            <main className="w-min-1/2"> {children}</main>
          </div>
        </AllProviders>
      </body>
    </html>
  );
}
