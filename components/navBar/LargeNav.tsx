'use client';
import type { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';

import Goals from './Goals';
import Info from './Info';
import NewTodo from './newTodo';
import Logo from '../../public/images/logo/mirujima-logo.svg';

export default function LargeNav({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const MenuButton = () => {
    return (
      <button
        onClick={() => {
          setIsOpen((x) => !x);
        }}
      >
        메뉴
      </button>
    );
  };
  return isOpen ? (
    <div className="absolute left-0 flex h-screen w-[300px] flex-col border border-black">
      <Link href="/dashboard" className="block w-fit">
        <Logo />
      </Link>
      <MenuButton />
      <Info />
      <NewTodo />
      <div>
        <Link href="/dashboard">대시보드</Link>
      </div>
      <Goals />
    </div>
  ) : (
    <div className="absolute left-0 flex h-screen w-[50px] flex-col border border-black">
      <Link href="/dashboard" className="block w-fit">
        <Logo />
      </Link>
      <MenuButton />
    </div>
  );
}
