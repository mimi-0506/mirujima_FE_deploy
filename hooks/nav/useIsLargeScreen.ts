import { useLayoutEffect, useState } from 'react';

import { LARGE_MIN } from '@/constant/numbers';

import useResize from './useResize';

export default function useIsLargeScreen() {
  const { screenSize } = useResize();
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (screenSize.width >= LARGE_MIN) setIsLargeScreen(true);
    else setIsLargeScreen(false);
  }, [screenSize]);

  return { isLargeScreen };
}
