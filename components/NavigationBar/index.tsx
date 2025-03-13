'use client';
import { useLayoutEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { LARGE_MIN, SMALL_MAX } from '@/constant/numbers';
import useResize from '@/hooks/nav/useResize';
import LargeNav from './LargeNav';
import SmallNav from './SmallNav';
import MediumNav from './MediumNav';

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { screenSize } = useResize();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (screenSize.width >= LARGE_MIN) setIsOpen(true);
    else setIsOpen(false);
  }, [screenSize, pathname]);

  if (
    pathname.includes('login') ||
    pathname.includes('signup') ||
    pathname.includes('/auth/callback') ||
    pathname === '/'
  )
    return null;

  if (screenSize.width >= LARGE_MIN) return <LargeNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  else if (screenSize.width < SMALL_MAX) return <SmallNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  return <MediumNav isOpen={isOpen} setIsOpen={setIsOpen} />;
}
