'use client';

import { useState } from 'react';

import Image from 'next/image';

interface KebabMenuProps {
  size: number;
  onEdit: () => void;
  onDelete: () => void;
}

const KEBAB_MENU_TEXT = {
  edit: '수정하기',
  delete: '삭제하기'
};

export default function KebabForGoal({ size, onEdit, onDelete }: KebabMenuProps) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsKebabOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        onBlur={() => setIsKebabOpen(false)}
        className="rounded-md bg-Cgray"
        aria-label="목표 수정 및 삭제"
      >
        <Image src={'/icon/more.svg'} width={size} height={size} alt="더보기 아이콘" />
      </button>
      {isKebabOpen && (
        <ul
          className="absolute right-0 top-full z-10 box-border flex list-none flex-col whitespace-nowrap rounded-xl border border-gray200 bg-white p-1"
          onMouseDown={(e) => e.preventDefault()}
        >
          <li className="m-0 flex-nowrap p-0">
            <button
              className="flex w-full items-center justify-center px-4 py-2 text-[13px] font-normal leading-[18px] text-gray350 hover:text-gray500"
              onClick={onEdit}
            >
              {KEBAB_MENU_TEXT.edit}
            </button>
          </li>
          <li className="m-0 p-0">
            <button
              className="flex w-full items-center justify-center px-4 py-2 text-[13px] font-normal leading-[18px] text-gray350 hover:text-gray500"
              onClick={onDelete}
            >
              {KEBAB_MENU_TEXT.delete}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
