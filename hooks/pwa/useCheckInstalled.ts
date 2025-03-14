'use client';

import React from 'react';
import {
  checkInstalledInStorage,
  removeInstalledInStorage,
  setInstallAppInStorage
} from '@/utils/pwa';

interface Args {
  isInApp: boolean;
  isAppleDevice: boolean;
  setIsInstallable: React.Dispatch<React.SetStateAction<boolean>>;
}

const useCheckInstalled = ({ isInApp, isAppleDevice, setIsInstallable }: Args) => {
  React.useEffect(() => {
    const checkStatus = () => {
      const stored = checkInstalledInStorage();

      if (isInApp) {
        setInstallAppInStorage();
        setIsInstallable(false);
      } else if (isAppleDevice) {
        removeInstalledInStorage();
        setIsInstallable(true);
      } else if (stored) {
        setInstallAppInStorage();
        setIsInstallable(false);
      } else {
        setIsInstallable(true);
      }
    };

    checkStatus();

    const visibilityChangeHandler = () => {
      if (document.visibilityState === 'visible') checkStatus();
    };
    document.addEventListener('visibilitychange', visibilityChangeHandler);
    return () => {
      document.removeEventListener('visibilitychange', visibilityChangeHandler);
    };
  }, [isInApp, isAppleDevice, setIsInstallable]);
};

export default useCheckInstalled;
