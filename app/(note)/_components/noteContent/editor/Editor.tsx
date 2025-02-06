'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './editor.css';

import React from 'react';

import { locales } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FormattingToolbar,
  TextAlignButton,
  useCreateBlockNote
} from '@blocknote/react';

export default function Editor() {
  // const [link, setLink] = React.useState('https://naver.com');

  const locale = locales['ko'];
  const editor = useCreateBlockNote({
    ...locale,
    placeholders: {
      ...locale.placeholders,
      default: '이 곳을 클릭해 노트 작성을 시작해주세요'
    }
  });

  return (
    <>
      <div>
        <p className="text-[12px] font-medium text-slate-800">
          공백 포함 : 총 {0}자 | 공백제외 : 총 {0}자
        </p>
      </div>
      {/* {link && (
        <div className="h-[32px] w-full">
          <Link href={link} target="_blank">
            {link}
          </Link>
        </div>
      )} */}
      <BlockNoteView
        editor={editor}
        formattingToolbar={false}
        sideMenu={false}
        slashMenu={false}
        data-custom-css
      >
        <FormattingToolbar>
          <div className="hidden sm:block"></div>
          <BlockTypeSelect key={'blockTypeSelect'} />

          <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
          {/* <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} /> */}

          <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
          <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />

          <ColorStyleButton key={'colorStyleButton'} />

          <CreateLinkButton key={'createLinkButton'} />
        </FormattingToolbar>
      </BlockNoteView>
    </>
  );
}
