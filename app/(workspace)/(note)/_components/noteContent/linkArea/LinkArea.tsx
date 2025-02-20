import React from 'react';

import Link from 'next/link';

import EmbedLinkIcon from '@/public/icon/embed-link.svg';
import CloseCircleIcon from '@/public/icon/X-circle.svg';

interface Props {
  linkUrl: string;
  onDeleteLink: () => void;
}

export default function LinkArea({ linkUrl, onDeleteLink }: Props) {
  return (
    <div className="flex w-full justify-between gap-2 rounded-[20px] bg-Cgray px-4 py-3">
      <Link
        href={linkUrl || ''}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="참고 링크 열기"
        className="flex w-[calc(100%-24px)] items-center gap-2 truncate text-gray350"
      >
        <span>
          <EmbedLinkIcon />
        </span>
        {linkUrl}
      </Link>

      <button
        type="button"
        onClick={onDeleteLink}
        aria-label="참고 링크 삭제"
        name="링크 삭제 버튼"
        className="group/circle"
      >
        <CloseCircleIcon
          width="24"
          height="24"
          className="hover-animate fill-gray350 hover:fill-main"
        />
      </button>
    </div>
  );
}
