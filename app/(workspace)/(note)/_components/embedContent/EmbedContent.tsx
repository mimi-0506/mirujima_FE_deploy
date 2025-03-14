'use client';

import React from 'react';

import Link from 'next/link';

import { useEmbedStore } from '@/provider/store-provider';
import CloseCircleIcon from '@/public/icon/X-circle.svg';
import convertYoutubeLinkToEmbedUrl from '@/utils/note/convertYoutubeLinkToEmbedUrl';

interface Props {
  linkUrl: string | undefined;
  isReadOnlyPage?: boolean;
}

export default function EmbedContent({ linkUrl, isReadOnlyPage }: Props) {
  const { isEmbedContentOpen, embedUrl } = useEmbedStore(({ state }) => state);
  const { setEmbedContentOpen } = useEmbedStore(({ actions }) => actions);

  React.useEffect(() => {
    return () => setEmbedContentOpen(false);
  }, [setEmbedContentOpen]);

  if (isEmbedContentOpen) {
    return (
      <div
        className={`flex w-full min-w-[355px] flex-col bg-solid desktop:static desktop:w-5/12 ${
          isReadOnlyPage
            ? 'absolute left-0 top-0 z-[50] h-full desktop:h-auto'
            : 'mb-6 h-[385px] bg-white desktop:h-[700px] desktop:bg-gray100'
        }`}
      >
        <div
          className={`flex w-full flex-row-reverse items-center justify-between px-3 ${
            isReadOnlyPage ? 'py-6 lg:flex-row' : 'pb-6 desktop:pb-6 desktop:pt-3'
          }`}
        >
          <button
            type="button"
            onClick={() => setEmbedContentOpen(false)}
            aria-label="임베드 콘텐츠 닫기"
            name="임베드 콘텐츠 닫기 버튼"
          >
            <CloseCircleIcon
              width="24"
              height="24"
              className="color-animate fill-main hover:fill-mainhover"
            />
          </button>
          <div className="flex w-full justify-center">
            <Link
              href={embedUrl || linkUrl || ''}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="임베드 링크 열기"
              className={`translate-x-3 rounded bg-solid px-2 py-1 text-main hover:underline ${
                isReadOnlyPage ? 'desktop:-translate-x-3' : ''
              } `}
            >
              링크 열기
            </Link>
          </div>
        </div>
        <iframe
          src={convertYoutubeLinkToEmbedUrl(embedUrl || linkUrl)}
          className="h-3/4 w-full"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return null;
}
