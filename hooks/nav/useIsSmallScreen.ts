import { useLayoutEffect, useState } from 'react';

import { SMALL_MAX } from '@/constant/numbers';

import useResize from './useResize';

export default function useIsSmallScreen() {
  const { screenSize } = useResize();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (screenSize <= SMALL_MAX) setIsSmallScreen(true);
    else setIsSmallScreen(false);
  }, [screenSize]);

  return { isSmallScreen };
}
