'use client';

import React from 'react';

import Link from 'next/link';

import { useModalStore } from '@/provider/store-provider';
import CloseCircleIcon from '@/public/icon/X-circle.svg';

const mockYoutube = 'https://www.youtube.com/embed/j2LZmDCCpKY';

interface Props {
  linkUrl: string | undefined;
  isReadOnlyPage?: boolean;
}

export default function EmbedContent({ linkUrl, isReadOnlyPage }: Props) {
  const isOpen = useModalStore((state) => state.isEmbedContentOpen);
  const setEmbedContentOpen = useModalStore((state) => state.setEmbedContentOpen);

  const containerClassName = isReadOnlyPage
    ? 'absolute left-0 top-0 h-full'
    : 'h-[385px] bg-white desktop:bg-gray100 mb-6 desktop:h-[700px]';

  React.useEffect(() => {
    return () => setEmbedContentOpen(false);
  }, [setEmbedContentOpen]);

  if (isOpen) {
    return (
      <div
        className={`${containerClassName} z-[1] flex w-full min-w-[355px] flex-col bg-solid desktop:static desktop:w-5/12`}
      >
        <div
          className={`flex w-full items-center justify-end px-3 lg:justify-start ${isReadOnlyPage ? 'py-6' : 'pb-6 desktop:py-6'}`}
        >
          <button
            type="button"
            onClick={() => setEmbedContentOpen(false)}
            aria-label="임베드 콘텐츠 닫기"
            name="임베드 콘텐츠 닫기 버튼"
          >
            <CloseCircleIcon width="24" height="24" className="hover-animate fill-main" />
          </button>
        </div>
        <iframe
          src={linkUrl}
          className="h-3/4 w-full"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
        />
        <div className="flex w-full justify-center pt-3">
          <Link
            href={linkUrl || ''}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="임베드 링크 열기"
            className="rounded border border-gray200 bg-white px-2 py-1 text-gray350 hover:underline"
          >
            링크 열기
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
