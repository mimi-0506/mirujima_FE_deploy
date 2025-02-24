'use client';
import { type Dispatch, type SetStateAction } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Info from './Info';
import Menus from './Menus';
import NewTodo from './newTodo';
import LeftArrow from '../../public/icon/arrow-left-black.svg';
import RightArrow from '../../public/icon/arrow-right-white.svg';
import DashboardIcon from '../../public/icon/dashboard-white.svg';

export default function LargeNav({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`absolute z-10 box-border flex h-screen w-[280px] px-4 pt-6 shadow-lg transition-all duration-300 ease-in-out ${
        isOpen
          ? 'left-0 flex-col bg-white'
          : 'left-[-192px] transform flex-col items-end overflow-hidden bg-main px-4 pt-6 shadow-lg'
      }`}
    >
      <div className="flex justify-between">
        {isOpen && (
          <Link href="/dashboard" className="block w-fit">
            <Image src="/images/logo/mirujima-logo-full.png" width="111" height="20" alt="logo" />
          </Link>
        )}
        <button
          className={isOpen ? '' : 'flex h-[56px] w-[56px] items-center justify-center'}
          onClick={() => {
            setIsOpen((x) => !x);
          }}
        >
          {isOpen ? <LeftArrow /> : <RightArrow />}
        </button>
      </div>

      <div className={isOpen ? '' : 'absolute left-[-10vw]'}>
        <Info />
        <NewTodo />
        <Menus />
      </div>

      {!isOpen && (
        <Link href="/dashboard" className="flex h-[56px] w-[56px] items-center justify-center">
          <DashboardIcon width="24" height="24" />
        </Link>
      )}
    </div>
  );
}
