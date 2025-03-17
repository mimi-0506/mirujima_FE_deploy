'use client';

import ConfettiFall from '@/components/confettis/ConfettiFall';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-center relative mx-auto h-screen text-center">
      <div className="relative z-10 rounded-3xl bg-white/90 p-8 desktop:p-12">
        <h2 className="mb-4 text-4xl font-bold text-main desktop:text-6xl">404 ERROR</h2>
        <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
        <p>존재하지 않는 주소를 입력하셨거나</p>
        <p className="mb-8">요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
        <Link
          href="/dashboard"
          aria-label="대시보드로 가기"
          className="group rounded-full bg-main px-6 py-3 text-button2 text-white hover:bg-mainhover"
        >
          대시보드로 <span className="pl-0 transition-all group-hover:pl-3">→</span>
        </Link>
      </div>
      <div className="absolute left-0 top-0 z-[5]">
        <ConfettiFall />
      </div>
    </div>
  );
}
