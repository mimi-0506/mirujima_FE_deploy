import { convertDataForEditor } from './convertDataForEditor';

import type { NoteContentTextLength } from '@/types/note.types';
import type { StyledText } from '@blocknote/core';

type CustomBlockType = {
  id: string;
  type: string;
  props: unknown; // 사용하지 않기에 unknown
  content: StyledText<{}>[];
  children: unknown; // 사용하지 않기에 unknown
};

export const getTextLength = async (value: string | undefined) => {
  const content = (await convertDataForEditor(value)) as CustomBlockType[] | undefined;
  if (!content) return { textLength: 0, trimTextLength: 0 };

  const result: NoteContentTextLength = content.reduce(
    (acc, cur) => {
      const blockTextLength: NoteContentTextLength = cur.content.reduce(
        (acc, cur) => {
          const textLength = (acc.textLength += cur.text.length);
          const trimTextLength = (acc.trimTextLength += cur.text.replace(/ /g, '').length);

          return { textLength, trimTextLength };
        },
        { textLength: 0, trimTextLength: 0 }
      );

      const textLength = (acc.textLength += blockTextLength.textLength);
      const trimTextLength = (acc.trimTextLength += blockTextLength.trimTextLength);

      return { textLength, trimTextLength };
    },
    { textLength: 0, trimTextLength: 0 }
  );

  return result;
};
