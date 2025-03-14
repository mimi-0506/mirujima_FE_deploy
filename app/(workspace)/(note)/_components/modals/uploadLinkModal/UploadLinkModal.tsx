'use client';

import React from 'react';

import Overlay from '@/modals/Overlay';
import { useModalStore } from '@/provider/store-provider';
import CloseCircleIcon from '@/public/icon/X-circle.svg';
import CloseIcon from '@/public/icon/X.svg';

interface Props {
  defaultValue: string | undefined;
  onSubmit: () => void;

  linkInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function UploadLinkModal({ defaultValue, onSubmit, linkInputRef }: Props) {
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  const reset = () => {
    if (linkInputRef.current) linkInputRef.current.value = '';
  };

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
            <CloseIcon width="24" height="24" />
          </button>
        </div>

        <div className="relative mb-[26px] mt-6">
          <input
            ref={(node) => {
              linkInputRef.current = node;
              node?.focus();
            }}
            defaultValue={defaultValue}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            aria-label="링크 URL 입력"
            placeholder="링크를 첨부해주세요"
            className="w-full rounded-lg border border-gray200 py-[10px] pl-4 pr-9 outline-none"
          />
          <button
            type="button"
            onClick={reset}
            aria-label="참고 링크 지우기"
            name="링크 지우기 버튼"
            className="absolute right-2 top-[14px]"
          >
            <CloseCircleIcon
              width="18"
              height="18"
              className="color-animate fill-gray350 hover:fill-main"
            />
          </button>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="color-animate h-[50px] w-full rounded-lg bg-main px-4 py-3 font-semibold text-white hover:bg-mainhover"
        >
          확인
        </button>
      </div>
    </Overlay>
  );
}
