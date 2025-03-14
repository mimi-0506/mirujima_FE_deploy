'use client';

import React from 'react';
import useDevice from './useDevice';
import useCheckInstalled from './useCheckInstalled';
import { setInstallAppInStorage } from '@/utils/pwa';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}

const usePWA = () => {
  const [isInstallable, setIsInstallable] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const { isAppleDevice, isInApp } = useDevice();

  useCheckInstalled({ isInApp, isAppleDevice, setIsInstallable });

  React.useEffect(() => {
    if (!isAppleDevice && !isInApp) {
      const beforeInstallHandler = (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      };

      const appInstalledHandler = () => {
        setInstallAppInStorage();
        setIsInstallable(false);
      };

      window.addEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
      window.addEventListener('appinstalled', appInstalledHandler);

      return () => {
        window.removeEventListener('beforeinstallprompt', beforeInstallHandler as EventListener);
        window.removeEventListener('appinstalled', appInstalledHandler);
      };
    }
    return () => {};
  }, [isAppleDevice, isInApp]);

  const handleInstall = React.useCallback(async () => {
    if (!deferredPrompt) return false;

    const promptEvent = deferredPrompt;
    try {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        setInstallAppInStorage();
        setIsInstallable(false);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, [deferredPrompt]);

  return {
    isInstallable,
    deferredPrompt,
    isAppleDevice,
    handleInstall
  };
};

export default usePWA;
