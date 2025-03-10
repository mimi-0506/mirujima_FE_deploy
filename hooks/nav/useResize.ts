import { useLayoutEffect, useState } from 'react';

import { debounce } from 'lodash';

export default function useResize() {
  const [screenSize, setScreenSize] = useState({
    width: 1920,
    height: 1020
  });

  useLayoutEffect(() => {
    const handleResize = debounce(
      () => setScreenSize({ width: window.innerWidth, height: window.innerHeight }),
      250
    );

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenSize };
}
