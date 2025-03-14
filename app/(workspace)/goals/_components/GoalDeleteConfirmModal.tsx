'use client';

import React from 'react';

import Overlay from '@/modals/Overlay';
import CloseIcon from '@/public/icon/X.svg';
import type { ModalActionProps } from '@/types/modalAction.type';
export default function GoalDeleteConfirmModal({ onConfirm, onCancel }: ModalActionProps) {
  return (
    <Overlay onClick={onCancel}>
      <div className="w-[343px] rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between">
          <h3 className="text-[17px] leading-[22px]">목표삭제</h3>
          <button onClick={onCancel}>
            <CloseIcon />
          </button>
        </header>
        <section className="mt-4 text-center text-[15px] leading-[20px]">
          <p className="text-Gray500">정말 목표를 삭제하시겠어요?</p>
          <p className="text-Gray500">작성된 노트와 링크가 함께 삭제됩니다.</p>
        </section>
        <footer className="mt-6 flex flex-1 justify-end gap-1 text-[16px] font-semibold leading-[22px]">
          <button
            onClick={onCancel}
            className="h-12 flex-1 rounded-lg border border-main bg-white px-4 py-2 text-main"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="h-12 flex-1 rounded-lg bg-main px-4 py-2 text-white"
          >
            확인
          </button>
        </footer>
      </div>
    </Overlay>
  );
}
