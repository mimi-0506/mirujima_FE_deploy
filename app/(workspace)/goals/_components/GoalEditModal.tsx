'use client';

import { useRef, useState } from 'react';

import Overlay from '@/modals/Overlay';
import CloseIcon from '@/public/icon/X.svg';

interface GoalEditModalProps {
  isOpen?: boolean;
  onConfirm: (value: string) => void;
  onCancel: () => void;
  initialValue: string;
}

export default function GoalEditModal({
  isOpen,
  onConfirm,
  onCancel,
  initialValue
}: GoalEditModalProps) {
  const [value, setValue] = useState(initialValue);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onConfirm(trimmedValue);
    }
  };

  const handleClose = () => {
    onCancel();
  };

  return (
    <Overlay onClick={onCancel}>
      <div ref={modalRef} className="w-[343px] rounded-xl bg-white p-6">
        <header className="flex items-center justify-between">
          <h3 className="text-[17px] leading-[22px]">목표 수정</h3>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </header>

        <section className="my-6 text-center text-[16px] font-semibold leading-[22px]">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-gray200 bg-white px-4 py-3 text-base text-gray500 outline-none"
            placeholder="목표를 수정해주세요"
            autoFocus
          />
        </section>

        <footer className="mt-6 flex flex-1 justify-end gap-1 text-[16px] font-semibold leading-[22px]">
          <button
            onClick={handleConfirm}
            disabled={!value.trim()}
            className="h-12 flex-1 rounded-lg bg-main px-4 py-2 text-white"
          >
            수정하기
          </button>
        </footer>
      </div>
    </Overlay>
  );
}
