'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

import { useRouter } from 'next/navigation';

import BackIcon from '@/public/icon/arrow-left-black.svg';

interface Props extends PropsWithChildren {
  embed?: React.ReactNode;
}

export default function NoteLayoutModal({ embed, children }: Props) {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  return createPortal(
    <div
      role="dialog"
      aria-label="노트 상세"
      className="fixed left-0 top-0 z-50 flex h-screen w-screen justify-end bg-black/50"
    >
      {embed}
      <div className="w-full bg-white px-3 md:w-2/3 desktop:w-6/12">
        <div className="py-6">
          <button onClick={onDismiss} className="flex-center h-6 w-6" aria-label="뒤로가기">
            <BackIcon />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal')!
  );
}
