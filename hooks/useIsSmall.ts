import { useLayoutEffect, useState } from 'react';

import { SMALL_MAX } from '@/constant/screen';

import useResize from './useResize';

export default function useIsSmall() {
  const { screenSize } = useResize();
  const [isSmall, setIsSmall] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (screenSize <= SMALL_MAX) setIsSmall(true);
    else setIsSmall(false);
  }, [screenSize]);

  return { isSmall };
}
