import React from 'react';

import { useEmbedStore } from '@/provider/store-provider';
import EmbedLinkIcon from '@/public/icon/embed-link.svg';
import CloseCircleIcon from '@/public/icon/X-circle.svg';

interface Props {
  linkUrl: string;
  onDeleteLink?: () => void;
}

export default function LinkArea({ linkUrl, onDeleteLink }: Props) {
  const setEmbedContentOpen = useEmbedStore(({ actions }) => actions.setEmbedContentOpen);

  return (
    <div className="flex w-full justify-between gap-2 rounded-[20px] bg-Cgray px-4 py-3">
      <button
        type="button"
        onClick={() => setEmbedContentOpen(true)}
        aria-label="임베드 콘텐츠 열기"
        className="flex w-full items-center gap-2 truncate text-gray350"
      >
        <span>
          <EmbedLinkIcon />
        </span>
        <span className="w-full truncate text-left">{linkUrl}</span>
      </button>

      {onDeleteLink && (
        <button
          type="button"
          onClick={onDeleteLink}
          aria-label="참고 링크 삭제"
          name="링크 삭제 버튼"
        >
          <CloseCircleIcon
            width="24"
            height="24"
            className="color-animate fill-gray350 hover:fill-main"
          />
        </button>
      )}
    </div>
  );
}
