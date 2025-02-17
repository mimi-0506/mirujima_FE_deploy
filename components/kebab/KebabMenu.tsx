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

export default function KebabMenu({ size, onEdit, onDelete }: KebabMenuProps) {
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
        aria-label="노트 옵션 더보기"
      >
        <Image src={'/icon/more.svg'} width={size} height={size} alt="더보기 아이콘" className="" />
      </button>
      {isKebabOpen && (
        <div className="absolute right-0 top-full z-10" onMouseDown={(e) => e.preventDefault()}>
          <ul className="relative overflow-hidden rounded-xl bg-white shadow-md">
            <li className="text-nowrap hover:bg-gray-100">
              <button className="px-4 pb-[6px] pt-2" onClick={onEdit}>
                {KEBAB_MENU_TEXT.edit}
              </button>
            </li>
            <li className="text-nowrap hover:bg-gray-100">
              <button className="px-4 pb-[6px] pt-2" onClick={onDelete}>
                {KEBAB_MENU_TEXT.delete}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
