'use client';
import { useEffect, useLayoutEffect, useState } from 'react';

import LargeNav from './LargeNav';
import MediumNav from './MediumNav';
import SmallNav from './SmallNav';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (screenSize > 774) setIsOpen(true);
    else setIsOpen(false);
  }, [screenSize]);

  if (screenSize <= 375) return <SmallNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  else if (screenSize > 774) return <LargeNav isOpen={isOpen} setIsOpen={setIsOpen} />;
  return <MediumNav isOpen={isOpen} setIsOpen={setIsOpen} />;
}
