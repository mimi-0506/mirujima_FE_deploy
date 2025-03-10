import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Info from './Info';
import Menus from './Menus';
import NewTodo from './newTodo';
import LeftArrow from '../../public/icon/arrow-left-black.svg';
import RightArrow from '../../public/icon/arrow-right-white.svg';

export default function SmallNav({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const path = usePathname();
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (document.title.includes('404')) setTitle('');
    else setTitle(document.title);
  }, [path]);

  return (
    <>
      <div className="item-center absolute left-0 top-0 z-20 flex h-[48px] w-screen gap-[16px] bg-main p-[12px_16px] text-white shadow-md">
        <button
          onClick={() => {
            setIsOpen((x) => !x);
          }}
        >
          <RightArrow />
        </button>
        <p> {title}</p>
      </div>

      <div
        className={`absolute left-0 top-0 z-20 h-screen w-screen transform flex-col bg-white p-[12px_16px] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute left-0 top-0 z-10 h-screen w-screen translate-x-0 transform flex-col bg-white p-[12px_16px] transition-all duration-300">
          <div className="flex justify-between">
            <Link href="/dashboard" className="block w-fit">
              <Image src="/images/logo/mirujima-logo-full.png" width="120" height="20" alt="logo" />
            </Link>
            <button
              onClick={() => {
                setIsOpen((x) => !x);
              }}
            >
              <LeftArrow />
            </button>
          </div>

          <Info />
          <NewTodo />
          <Menus />
        </div>
      </div>
    </>
  );
}
