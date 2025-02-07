import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

export default function useResize() {
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = debounce(() => setScreenSize(window.innerWidth), 250);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenSize };
}
