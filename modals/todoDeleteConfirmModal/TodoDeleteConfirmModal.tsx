'use client';

import React from 'react';

import Overlay from '@/modals/Overlay';
import CloseIcon from '@/public/icon/X.svg';
import type { ModalActionProps } from '@/types/modalAction.type';
export default function TodoDeleteConfirmModal({ onConfirm, onCancel }: ModalActionProps) {
  return (
    <Overlay onClick={onCancel}>
      <div className="w-[343px] rounded-xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between">
          <h3 className="text-[17px] leading-[22px]">할 일 삭제</h3>
          <button onClick={onCancel} aria-label="모달 닫기">
            <CloseIcon />
          </button>
        </header>
        <section className="mt-4 text-center text-[15px] leading-[20px]">
          <p className="text-Gray500">정말 할 일을 삭제하시겠어요?</p>
          <p className="text-Gray500">삭제한 할 일은 되돌릴 수 없습니다.</p>
        </section>
        <footer className="mt-6 flex flex-1 justify-end gap-1 text-[16px] font-semibold leading-[22px]">
          <button
            onClick={onCancel}
            aria-label="할 일 삭제 취소"
            className="h-12 flex-1 rounded-lg border border-main bg-white px-4 py-2 text-main"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            aria-label="할 일 삭제 확인"
            className="h-12 flex-1 rounded-lg bg-main px-4 py-2 text-white"
          >
            확인
          </button>
        </footer>
      </div>
    </Overlay>
  );
}
