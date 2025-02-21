'use client';

import React from 'react';
import type { Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { getTextLength } from '@/utils/note/getTextLength';

import type { NoteInputData } from '@/schema/noteSchema';
import type { NoteContentTextLength } from '@/types/note.type';

interface Props {
  control: Control<NoteInputData>;
}

export default function ContentInfo({ control }: Props) {
  const [textLength, setTextLenght] = React.useState<NoteContentTextLength>({
    textLength: 0,
    trimTextLength: 0
  });
  const contentValue = useWatch({ control, name: 'content' });

  React.useEffect(() => {
    getTextLength(contentValue).then((res) => setTextLenght(res));
  }, [contentValue]);

  return (
    <p className="text-[12px] font-medium text-gray350">
      공백 포함 : 총 {textLength.textLength}자 | 공백제외 : 총 {textLength.trimTextLength}자
    </p>
  );
}
