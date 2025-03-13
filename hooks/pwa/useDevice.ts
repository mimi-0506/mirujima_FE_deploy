'use client';

import React from 'react';

const useDevice = () => {
  const [isAppleDevice, setIsAppleDevice] = React.useState(false);
  const [isInApp, setIsInApp] = React.useState(false);

  React.useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    const checkAppleDevice = () => {
      const isEdge = /edg\/|edge\//.test(userAgent);
      const isIOS = /(ipad|iphone|ipod)/.test(userAgent) && !isEdge;
      const isMac = /macintosh|mac os x/.test(userAgent) && !isEdge;
      setIsAppleDevice(isIOS || isMac);
    };

    const checkStandalone = (e?: MediaQueryListEvent) => {
      const isStandalone = e ? e.matches : window.matchMedia('(display-mode: standalone)').matches;
      const isSafariStandalone =
        'standalone' in window.navigator && window.navigator.standalone === true;
      setIsInApp(isStandalone || isSafariStandalone);
    };

    checkAppleDevice();
    checkStandalone();

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    mediaQuery.addEventListener('change', checkStandalone);
    return () => {
      mediaQuery.removeEventListener('change', checkStandalone);
    };
  }, []);

  return { isAppleDevice, isInApp };
};

export default useDevice;
