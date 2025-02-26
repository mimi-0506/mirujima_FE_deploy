'use client';

import React from 'react';

import Overlay from '@/modals/Overlay';
import { useModalStore } from '@/provider/store-provider';
import CloseIcon from '@/public/icon/X.svg';

interface Props {
  defaultValue: string | undefined;
  onSubmit: () => void;
  linkInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function UploadLinkModal({ defaultValue, onSubmit, linkInputRef }: Props) {
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  return (
    <Overlay onClick={() => setNoteLinkModalOpen(false)}>
      <div
        className="w-11/12 max-w-[450px] rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <p className="text-lg font-bold leading-7 text-gray500">링크 업로드</p>
          <button
            type="button"
            name="modal-close-button"
            aria-label="모달 닫기"
            onClick={() => setNoteLinkModalOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mb-[26px] mt-6">
          <input
            ref={(node) => {
              linkInputRef.current = node;
              node?.focus();
            }}
            defaultValue={defaultValue}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            aria-label="링크 URL 입력"
            placeholder="링크를 첨부해주세요"
            className="w-full rounded-lg border border-gray200 px-4 py-[10px] outline-none"
          />
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="h-[50px] w-full rounded-lg bg-main px-4 py-3 font-semibold text-white"
        >
          확인
        </button>
      </div>
    </Overlay>
  );
}
