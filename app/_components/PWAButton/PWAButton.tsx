'use client';

import { INSTALL_APP_ERROR } from '@/constant/toastText';
import usePWA from '@/hooks/pwa/usePWA';
import { useModalStore } from '@/provider/store-provider';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
}

export default function PWAButton({ className }: Props) {
  const { isInstallable, isAppleDevice, handleInstall } = usePWA();
  const setIOSPWAGuideModalOpen = useModalStore((store) => store.setIOSPWAGuideModalOpen);

  const handleClick = async () => {
    if (isAppleDevice) {
      setIOSPWAGuideModalOpen(true);
    } else {
      const isSuccess = await handleInstall();
      if (!isSuccess) toast.error(INSTALL_APP_ERROR);
    }
  };

  return (
    <div className={`w-full ${className ? className : ''}`}>
      {isInstallable ? (
        <button
          type="button"
          onClick={handleClick}
          className="color-animate h-[40px] w-full animate-bounce rounded-lg bg-main text-button2 text-white hover:bg-mainhover md:h-[50px] md:text-button2"
        >
          앱 다운로드
        </button>
      ) : (
        <Link
          href={'/dashboard'}
          className="flex-center color-animate inline-block h-[40px] w-full rounded-lg bg-main text-button2 text-white hover:bg-mainhover md:h-[50px] md:text-button2"
        >
          이대로 사용할래요
        </Link>
      )}
    </div>
  );
}
