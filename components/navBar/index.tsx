'use client';
import { useLayoutEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { LARGE_MIN, SMALL_MAX } from '@/constant/screen';
import useResize from '@/hooks/useResize';

import LargeNav from './LargeNav';
import MediumNav from './MediumNav';
import SmallNav from './SmallNav';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { screenSize } = useResize();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (screenSize > LARGE_MIN) setIsOpen(true);
    else setIsOpen(false);
  }, [screenSize]);

  if (pathname.includes('login') || pathname.includes('signup')) return null;

  if (screenSize > LARGE_MIN) return <LargeNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  else if (screenSize <= SMALL_MAX) return <SmallNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  return <MediumNav isOpen={isOpen} setIsOpen={setIsOpen} />;
}
