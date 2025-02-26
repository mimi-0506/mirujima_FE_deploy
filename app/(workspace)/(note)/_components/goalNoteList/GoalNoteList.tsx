'use client';

import React from 'react';

import useToggle from '@/hooks/useToggle';
import ArrowDown from '@/public/icon/arrow-down.svg';
import ArrowUp from '@/public/icon/arrow-up.svg';
import TodoIcon from '@/public/icon/work.svg';

import GoalNoteListContent from './goalNoteListContent/GoalNoteListContent';

import type { GoalType } from '@/types/goal.type';

interface Props {
  goal: GoalType;
}

export default function GoalNoteList({ goal }: Props) {
  const { isToggleOpen, handleToggle } = useToggle();

  return (
    <section className="pl-8">
      <div
        onClick={handleToggle}
        role="button"
        aria-expanded={isToggleOpen}
        className="mb-4 flex w-full cursor-pointer items-center gap-1 pr-4"
      >
        <TodoIcon width="18" height="18" className="shrink-0" />
        <h3 className="w-full truncate">{goal.title}</h3>
        <button
          type="button"
          aria-label={isToggleOpen ? '목표 노트 숨기기' : '목표 노트 보기'}
          className=""
        >
          {isToggleOpen ? (
            <ArrowUp width="24" height="24" />
          ) : (
            <ArrowDown width="24" height="24" className="stroke-gray500" />
          )}
        </button>
      </div>

      {isToggleOpen && <GoalNoteListContent goal={goal} />}
    </section>
  );
}
