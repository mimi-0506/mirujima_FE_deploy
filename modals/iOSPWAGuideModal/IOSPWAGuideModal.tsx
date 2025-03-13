import React from 'react';
import Overlay from '../Overlay';
import ShareIOSIcon from '@/public/icon/share-ios.svg';
import AddIOSIcon from '@/public/icon/add-ios.svg';
import DockIcon from '@/public/icon/dock.svg';
import { useModalStore } from '@/provider/store-provider';

export default function IOSPWAGuideModal() {
  const setIOSPWAGuideModalOpen = useModalStore((store) => store.setIOSPWAGuideModalOpen);

  return (
    <Overlay onClick={() => setIOSPWAGuideModalOpen(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[330px] space-y-3 rounded-xl bg-white p-6"
      >
        <header className="text-center">
          <h3>IOS / mac 기기 앱 설치 안내</h3>
        </header>
        <section className="space-y-2 text-gray400">
          <p className="flex items-center">
            1.&nbsp;&nbsp;
            <span className="flex-center h-[18px] w-[18px]">
              <ShareIOSIcon width="18" height="18" className="stroke-gray400" />
            </span>
            &nbsp;공유 아이콘을 클릭하세요!
          </p>
          <p className="flex items-center">
            2.&nbsp;&nbsp;
            <span className="flex-center h-[18px] w-[18px]">
              <AddIOSIcon width="14" height="14" className="stroke-gray400" />
            </span>
            &nbsp;홈 화면 또는&nbsp;
            <span className="flex-center h-[18px] w-[18px]">
              <DockIcon width="18" height="18" className="stroke-gray400" />
            </span>
            &nbsp;Dock에 추가하세요!
          </p>
        </section>
        <footer>
          <button
            type="button"
            onClick={() => setIOSPWAGuideModalOpen(false)}
            name="modal-close-button"
            aria-label="확인하고 모달 닫기"
            className="h-[40px] w-full rounded-lg bg-main text-button2 text-white"
          >
            확인
          </button>
        </footer>
      </div>
    </Overlay>
  );
}
