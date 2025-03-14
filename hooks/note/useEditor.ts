import React from 'react';

import { BlockNoteEditor, locales } from '@blocknote/core';

import { convertDataForEditor } from '@/utils/note/convertDataForEditor';

import type { PartialBlock } from '@blocknote/core';

const useEditor = (defaultContent: string | undefined) => {
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
  }, [defaultContent]);

  return { editor };
};

export default useEditor;
