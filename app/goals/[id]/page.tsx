'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useInfoStore } from '@/stores/infoStore';
import Button from '../_components/Button';
export default function GoalDetailPage() {
  const { name, restoreUser } = useInfoStore();

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <main className="flex h-screen justify-center overflow-y-scroll bg-gray100 px-4 py-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <section className="flex w-full min-w-[262px] max-w-[1284px] flex-col gap-6 md:pt-4">
        <h2 className="flex h-[28px] w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/icon/todo-list-black.svg"
              alt="목표 아이콘"
              height={24}
              width={24}
              className="h-[24px] w-[24px]"
            />
            자바스크립트로 웹 서비스 만들기
          </div>

          <Image
            src="/icon/kebab.svg"
            alt="설정 아이콘"
            height={24}
            width={24}
            className="h-[24px] w-[24px]"
          />
        </h2>

        <Button>노트 모아보기</Button>

        <div className="flex rounded-[16px] border border-gray200 bg-white p-6 shadow-sm">
          {/* To do 영역 */}
          <div className="min-h-[214px] w-[576px] flex-1">
            <p className="mb-2 text-[15px] font-medium leading-[20px] text-gray500">To do</p>

            <ul className="mt-2 space-y-2 text-gray350">
              <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 목표가 없어요</li>
            </ul>
          </div>

          <div className="mx-6 flex translate-y-5 items-center justify-center">
            <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
          </div>

          {/* Done 영역 */}
          <div className="min-w-[262px] flex-1">
            <p className="mb-2 text-[15px] font-medium leading-[20px] text-gray500">Done</p>

            <ul className="mt-2 space-y-2 text-gray350">
              <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 목표가 없어요</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
