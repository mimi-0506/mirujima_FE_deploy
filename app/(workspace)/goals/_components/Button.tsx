'use client';
import React from 'react';

import RightArrowIcon from '@/public/icon/arrow-right-red.svg';
import PinkNoteIcon from '@/public/icon/note-pink.svg';
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex h-[60px] w-full items-center justify-between rounded-xl bg-solid px-6 font-semibold text-main ${className} `}
    >
      <div className="flex items-center gap-2">
        <PinkNoteIcon />
        <span className="text-[16px] leading-[22px]">{children}</span>
      </div>

      <RightArrowIcon />
    </button>
  );
}
