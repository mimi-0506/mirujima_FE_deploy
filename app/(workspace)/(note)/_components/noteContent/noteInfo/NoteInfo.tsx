import React from 'react';

import GoalIcon from '@/public/icon/work.svg';
import { dateFormatWithDots } from '@/utils/dateUtils';

import TodoChip from '../../todoChip/TodoChip';

interface Props {
  goalTitle: string;
  todoTitle: string;
  noteUpdatedAt: string | undefined;
}

export default function NoteInfo({ goalTitle, todoTitle, noteUpdatedAt }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6">
          <GoalIcon width="24" height="24" />
        </div>
        <h3 className="truncate text-gray500">{goalTitle}</h3>
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div
          className={`flex items-center gap-2 ${noteUpdatedAt ? 'w-[calc(100%-84px)]' : 'w-full'}`}
        >
          <TodoChip />
          <h4 className="truncate text-gray400">{todoTitle}</h4>
        </div>
        {noteUpdatedAt && (
          <span className="shrink-0 text-button2 text-gray400">
            {dateFormatWithDots(noteUpdatedAt)}
          </span>
        )}
      </div>
    </div>
  );
}
