'use client';

import { useState } from 'react';

import KebabFocusIcon from '@/public/icon/kebab-focus.svg';
import KebabIcon from '@/public/icon/kebab.svg';

interface KebabMenuProps {
  size: number;
  onEdit: () => void;
  onDelete: () => void;
  editText?: string;
  deleteText?: string;
}

const KEBAB_MENU_TEXT = {
  edit: '수정하기',
  delete: '삭제하기'
};

export default function KebabMenu({
  size,
  onEdit,
  onDelete,
  editText = KEBAB_MENU_TEXT.edit,
  deleteText = KEBAB_MENU_TEXT.delete
}: KebabMenuProps) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsKebabOpen((prev) => !prev);
  };

  return (
    <div className="flex-center relative">
      <button onClick={toggleMenu} onBlur={() => setIsKebabOpen(false)} aria-label="옵션 더보기">
        {isKebabOpen ? (
          <KebabFocusIcon width={size} height={size} />
        ) : (
          <KebabIcon width={size} height={size} />
        )}
      </button>
      {isKebabOpen && (
        <div className="absolute right-0 top-full z-10" onMouseDown={(e) => e.preventDefault()}>
          <ul className="shadow-note relative overflow-hidden rounded-xl border border-gray200 bg-white text-body2 text-gray500">
            <li className="text-nowrap hover:bg-gray-100">
              <button
                className="flex-center w-full px-3 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                {editText}
              </button>
            </li>
            <li className="text-nowrap hover:bg-gray-100">
              <button
                className="flex-center w-full px-3 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                {deleteText}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
