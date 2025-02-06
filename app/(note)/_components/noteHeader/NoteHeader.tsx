import React from 'react';

import { FaviconIcon } from '@/components/icons/index';

interface Props {
  title: string;
  subTitle: string;
}

export default function NoteHeader(props: Props) {
  const {
    title = '자바스크립트로 웹 서비스 만들기',
    subTitle = '자바스크립트기초챕터자바스크립트기초챕터자바스크립트기초챕터'
  } = props;

  return (
    <div className="w-full max-w-[792px] py-[5px]">
      <div className="flex items-center justify-between py-[5px]">
        <h2 className="text-base text-slate-900">노트 작성</h2>
        <div className="flex gap-2">
          <button className="h-[36px] w-[84px] rounded-xl text-[14px] font-semibold text-blue-500">
            임시 저장
          </button>
          <button className="h-[36px] w-[84px] rounded-xl bg-slate-400 text-[14px] font-semibold text-white">
            작성 완료
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 py-[5px]">
        <div className="h-6 w-6">
          <FaviconIcon />
        </div>
        <h3 className="truncate text-slate-800">{title}</h3>
      </div>
      <div className="flex items-center gap-2 py-[5px]">
        <div>
          <button
            className="h-[20px] w-[37px] rounded bg-slate-100 px-[3px] py-[2px] text-[12px] font-medium text-slate-700"
            disabled
          >
            To do
          </button>
        </div>
        <h4 className="truncate text-slate-700">{subTitle}</h4>
      </div>
    </div>
  );
}
