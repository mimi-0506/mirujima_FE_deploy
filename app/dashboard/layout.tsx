'use client';

import React from 'react';

import { LARGE_MIN } from '@/constant/numbers';
import useResize from '@/hooks/nav/useResize';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { screenSize } = useResize();

  return (
    <div
      className={`scrollbar-thin h-screen overflow-y-auto bg-gray100 px-4 pb-[68px] pt-[64px] md:px-6 md:pl-[112px] desktop:pl-[336px] desktop:pt-[94px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1 ${
        screenSize < LARGE_MIN ? 'scrollbar-hide' : ''
      }`}
    >
      {children}
    </div>
  );
}
