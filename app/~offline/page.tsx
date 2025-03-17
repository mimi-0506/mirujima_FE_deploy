import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '오프라인 페이지'
};

export default function Page() {
  return (
    <section className="flex-center h-full w-full flex-col">
      <h2>네트워크 상태를 확인해주세요!😢</h2>
      <div className="grid items-center justify-items-center">
        <div className="cursor-pointer text-[15vw] transition-transform duration-300 hover:scale-125">
          🍅
        </div>
      </div>
    </section>
  );
}
