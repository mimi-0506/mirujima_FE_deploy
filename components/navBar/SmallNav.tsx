import type { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';

import Logo from '../../public/images/logo/mirujima-logo.svg';

export default function SmallNav({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const CloseButton = () => {
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

  return (
    <div className="absolute left-0 top-0 flex h-[30px] w-screen border border-black">
      <CloseButton />
      <Link href="/dashboard" className="block w-fit">
        <Logo />
      </Link>
    </div>
  );
}
