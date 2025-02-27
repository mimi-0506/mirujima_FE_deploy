'use client';

import React from 'react';

import Overlay from '@/modals/Overlay';

import type { NoteConfirmModalProps } from '@/types/note.type';

interface Props extends NoteConfirmModalProps {}

const TEXT = {
  header: {
    temp: '작성중인 글이 있습니다.',
    delete: '노트 삭제하기'
  },
  section: {
    temp: '제목의 노트를 불러오시겠어요?',
    delete: '제목의 노트를 삭제하겠어요?'
  }
} as const;

export default function NoteConfirmModal({ type, contentTitle, onCancel, onConfirm }: Props) {
  return (
    <Overlay onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-11/12 max-w-[450px] rounded-xl bg-white p-6"
      >
        <header>
          <p className="text-center text-head3 text-gray900">{TEXT.header[type]}</p>
        </header>
        <section className="mt-4 text-center">
          <p className="text-body1 text-[#636267]">&lsquo;{contentTitle}&rsquo;</p>
          <p className="text-body1 text-[#636267]">{TEXT.section[type]}</p>
        </section>
        <footer className="mt-6 flex w-full gap-2">
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
        </footer>
      </div>
    </Overlay>
  );
}
