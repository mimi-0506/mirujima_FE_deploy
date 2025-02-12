'use client';

import { useState } from 'react';

import KebabIcon from '@/public/icon/kebab.svg';

interface KebabMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const KEBAB_MENU_TEXT = {
  edit: '수정하기',
  delete: '삭제하기'
};

export default function KebabMenu({ onEdit, onDelete }: KebabMenuProps) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);

  const toggleMenu = () => setIsKebabOpen((prev) => !prev);

  return (
    <div className="group relative">
      <button
        className={`hidden focus:block group-hover:block ${isKebabOpen ? 'bg-gray-50' : ''}`}
        onClick={toggleMenu}
        onBlur={() => setIsKebabOpen(false)}
      >
        <KebabIcon />
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
