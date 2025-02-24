'use client';

import React from 'react';

import { BlockNoteEditor, locales, type PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';

import { convertDataForEditor } from '@/utils/note/convertDataForEditor';

interface Props {
  defaultContent: string;
}

export default function ReadOnlyEditor({ defaultContent }: Props) {
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

  return (
    <>
      <BlockNoteView
        editor={editor}
        editable={false}
        formattingToolbar={false}
        sideMenu={false}
        slashMenu={false}
        data-custom-css
      />
    </>
  );
}
