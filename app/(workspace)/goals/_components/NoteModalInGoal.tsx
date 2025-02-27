'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';

import { useRouter } from 'next/navigation';

import Overlay from '@/modals/Overlay';
import BackIcon from '@/public/icon/arrow-left-black.svg';

interface Props extends PropsWithChildren {
  embed?: React.ReactNode;
  onClose?: () => void;
}

export default function NoteModalInGoal({ embed, children, onClose }: Props) {
  const router = useRouter();

  const onDismiss = () => {
    if (onClose) {
      onClose();
    } else {
      router.back(); // 기본 동작으로 fallback
    }
  };

  return (
    <Overlay>
      <div aria-label="노트 상세 페이지" className="flex h-screen w-full justify-end">
        {embed}
        <div className="custom-scrollbar w-full overflow-y-scroll bg-white px-6 md:w-2/3 desktop:w-6/12">
          <div className="py-6">
            <button onClick={onDismiss} className="flex-center h-6 w-6" aria-label="뒤로가기">
              <BackIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Overlay>
  );
}
