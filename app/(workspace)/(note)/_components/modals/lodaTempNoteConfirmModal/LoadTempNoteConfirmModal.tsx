'use client';

import React from 'react';

interface Props {
  tempNoteTitle: string | undefined;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LoadTempNoteConfirmModal({ tempNoteTitle, onCancel, onConfirm }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
    >
      <dialog open className="w-11/12 max-w-[450px] rounded-xl bg-white p-6">
        <div className="space-y-4 text-center">
          <p className="text-head3 text-gray900">작성중인 글이 있습니다.</p>
          <div>
            <p className="text-body1 text-[#636267]">`{tempNoteTitle}`</p>
            <p className="text-body1 text-[#636267]">제목의 노트를 불러오시겠어요?</p>
          </div>
        </div>
        <div className="mt-6 flex w-full gap-2">
          <button
            type="button"
            onClick={onCancel}
            aria-label="임시 저장 노트 불러오기 취소"
            className="h-[40px] w-full rounded-lg border border-main text-button2 text-main md:h-[43px] md:text-button1"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            aria-label="임시 저장 노트 불러오기"
            className="h-[40px] w-full rounded-lg bg-main text-button2 text-white md:h-[43px] md:text-button1"
          >
            확인
          </button>
        </div>
      </dialog>
    </div>
  );
}
