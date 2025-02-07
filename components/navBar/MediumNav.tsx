import type { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';

import Goals from './Goals';
import Info from './Info';
import NewTodo from './newTodo';
import Logo from '../../public/images/logo/mirujima-logo.svg';
export default function MediumNav({
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
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="absolute left-0 flex h-screen w-[300px] flex-col border border-black bg-white">
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
