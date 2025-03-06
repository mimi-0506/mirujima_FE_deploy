'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import KebabFocusIcon from '@/public/icon/kebab-focus.svg';
import KebabIcon from '@/public/icon/kebab.svg';

interface KebabMenuProps {
  size: number;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

const KEBAB_MENU_TEXT = {
  edit: '수정하기',
  delete: '삭제하기'
};

export default function KebabForGoal({ size, onEdit, onDelete, className }: KebabMenuProps) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const buttonRect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: buttonRect.bottom,
      right: window.innerWidth - buttonRect.right
    });
    setIsKebabOpen((prev) => !prev);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsKebabOpen(false);
  };

  return (
    <div className={`flex-center relative ${className ?? ''}`}>
      <button onClick={toggleMenu} className="rounded-md bg-Cgray" aria-label="목표 수정 및 삭제">
        {isKebabOpen ? (
          <KebabFocusIcon width={size} height={size} />
        ) : (
          <KebabIcon width={size} height={size} />
        )}
      </button>
      {isKebabOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed left-0 top-0 z-50 h-full w-full" onClick={handleOverlayClick}>
            <ul
              className="z-60 absolute mt-2 box-border flex list-none flex-col whitespace-nowrap rounded-xl border border-gray200 bg-white p-1"
              style={{ top: menuPosition.top, right: menuPosition.right }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            >
              <li className="m-0 flex-nowrap p-0">
                <button
                  className="flex w-full items-center justify-center px-4 py-2 text-[13px] font-normal leading-[18px] text-gray350 hover:text-gray500"
                  onClick={(e) => {
                    onEdit();
                    setIsKebabOpen(false);
                  }}
                >
                  {KEBAB_MENU_TEXT.edit}
                </button>
              </li>
              <li className="m-0 p-0">
                <button
                  className="flex w-full items-center justify-center px-4 py-2 text-[13px] font-normal leading-[18px] text-gray350 hover:text-gray500"
                  onClick={(e) => {
                    onDelete();
                    setIsKebabOpen(false);
                  }}
                >
                  {KEBAB_MENU_TEXT.delete}
                </button>
              </li>
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
