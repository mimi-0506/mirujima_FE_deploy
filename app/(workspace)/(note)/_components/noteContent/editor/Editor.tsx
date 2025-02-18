'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './editor.css';

import React from 'react';
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { BlockNoteEditor, locales } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  blockTypeSelectItems,
  ColorStyleButton,
  FormattingToolbar,
  TextAlignButton
} from '@blocknote/react';
import _ from 'lodash';

import { convertDataForEditor } from '@/utils/note/convertDataForEditor';

import LinkToolbarButton from './linkToolbarButton/LinkToolbarButton';

import type { NoteInputData } from '@/schema/noteSchema';
import type { PartialBlock } from '@blocknote/core';

interface Props {
  defaultContent: string | undefined;
  register: UseFormRegister<NoteInputData>;
  setValue: UseFormSetValue<NoteInputData>;
}

export default function Editor({ register, setValue, defaultContent }: Props) {
  const [initialContent, setInitialContent] = React.useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  const locale = locales['ko'];

  const editor = React.useMemo(() => {
    if (initialContent === 'loading') return undefined;

    return BlockNoteEditor.create({
      ...locale,
      placeholders: {
        ...locale.placeholders,
        default: '이 곳을 클릭해 노트 작성을 시작해주세요'
      },
      initialContent
    });
  }, [initialContent]);

  React.useEffect(() => {
    convertDataForEditor(defaultContent).then((content) => {
      setInitialContent(content);
    });
  }, []);

  if (!editor) return null;

  const onChange = _.debounce(() => {
    const content = JSON.stringify(editor.document);
    setValue('content', content);
  }, 50);

  return (
    <>
      <input type="text" className="hidden" {...register('content')} />
      <BlockNoteView
        editor={editor}
        // editable={false}
        formattingToolbar={false}
        sideMenu={false}
        slashMenu={false}
        onChange={onChange}
        data-custom-css
      >
        <FormattingToolbar>
          <BlockTypeSelect
            key={'blockTypeSelect'}
            items={blockTypeSelectItems(editor.dictionary).map((item) => {
              item.name = customBlockSelectTypeName[item.name];
              return item;
            })}
          />

          <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
          {/* <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} /> */}

          <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
          <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />

          <ColorStyleButton key={'colorStyleButton'} />

          <LinkToolbarButton key={'customButton'} />
        </FormattingToolbar>
      </BlockNoteView>
    </>
  );
}

const customBlockSelectTypeName: Record<string, string> = {
  Paragraph: '텍스트',
  'Heading 1': '제목1',
  'Heading 2': '제목2',
  'Heading 3': '제목3',
  'Bullet List': '기호',
  'Numbered List': '번호',
  'Check List': '체크'
};
