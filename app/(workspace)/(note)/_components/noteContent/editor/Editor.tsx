'use client';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import './editor.css';

import React from 'react';
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';

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

import useEditor from '@/hooks/note/useEditor';

import LinkToolbarButton from './linkToolbarButton/LinkToolbarButton';

import type { NoteInputData } from '@/schema/noteSchema';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface Props {
  defaultContent: string | undefined;
  isEditable: boolean;
  register?: UseFormRegister<NoteInputData>;
  setValue?: UseFormSetValue<NoteInputData>;
  handleLinkModal?: () => void;
}

export default function Editor(props: Props) {
  const { register, setValue, defaultContent, handleLinkModal, isEditable } = props;

  const { editor } = useEditor(defaultContent);

  if (!editor) return <LoadingSpinner size={48} />;

  const onChange = _.debounce(() => {
    if (setValue) {
      const content = JSON.stringify(editor.document);
      setValue('content', content);
    }
  }, 50);

  const inputProps = register ? { ...register('content') } : {};

  return (
    <>
      <input type="text" className="hidden" {...inputProps} />
      <BlockNoteView
        editor={editor}
        editable={isEditable}
        formattingToolbar={false}
        sideMenu={false}
        slashMenu={false}
        onChange={onChange}
        data-custom-css
      >
        {isEditable && (
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

            <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
            <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />

            <ColorStyleButton key={'colorStyleButton'} />

            <LinkToolbarButton key={'customButton'} handleLinkModal={handleLinkModal} />
          </FormattingToolbar>
        )}
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
