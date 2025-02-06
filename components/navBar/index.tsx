'use client';
import { useEffect, useLayoutEffect, useState } from 'react';

import { debounce } from 'lodash';

import { LARGE_MIN, SMALL_MAX } from '@/constant/screen';

import LargeNav from './LargeNav';
import MediumNav from './MediumNav';
import SmallNav from './SmallNav';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = debounce(() => setScreenSize(window.innerWidth), 250);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (screenSize > LARGE_MIN) setIsOpen(true);
    else setIsOpen(false);
  }, [screenSize]);

  if (screenSize <= SMALL_MAX) return <SmallNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  else if (screenSize > LARGE_MIN) return <LargeNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  return <MediumNav isOpen={isOpen} setIsOpen={setIsOpen} />;
}
