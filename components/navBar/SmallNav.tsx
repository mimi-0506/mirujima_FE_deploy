import type { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';

import Goals from './Goals';
import Info from './Info';
import Logo from '../../public/images/logo/mirujima-logo.svg';

export default function SmallNav({
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
    <div className="absolute left-0 top-0 h-screen w-screen flex-col border border-black bg-white">
      <div className="flex justify-between">
        <Link href="/dashboard" className="block w-fit">
          <Logo />
        </Link>
        <MenuButton />
      </div>

      <Info />

      <div className="flex justify-between">
        <Link href="/dashboard">대시보드</Link>
      </div>
      <Goals />
    </div>
  ) : (
    <div className="absolute left-0 top-0 flex h-[30px] w-screen border border-black">
      <MenuButton />
      <Link href="/dashboard" className="block w-fit">
        <Logo />
      </Link>
    </div>
  );
}
