import React from 'react';

import GoalIcon from '@/public/icon/work.svg';

interface Props {
  goalTitle: string;
  todoTitle: string;
  todoCompletionDate: string | null;
}

export default function GoalAndTodoInfo({ goalTitle, todoTitle, todoCompletionDate }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6">
          <GoalIcon width="24" height="24" />
        </div>
        <h3 className="truncate text-gray500">{goalTitle}</h3>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-[20px] w-[37px] rounded bg-Cgray px-[3px] py-[2px] text-[12px] font-medium text-gray350">
            <span>To do</span>
          </div>
          <h4 className="truncate text-gray400">{todoTitle}</h4>
        </div>
        {todoCompletionDate && (
          <span className="text-sm leading-[16px] text-gray400">{todoCompletionDate}</span>
        )}
      </div>
    </div>
  );
}
