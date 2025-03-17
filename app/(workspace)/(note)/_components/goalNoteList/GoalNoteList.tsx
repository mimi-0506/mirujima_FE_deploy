'use client';

import React from 'react';

import useToggle from '@/hooks/useToggle';
import ArrowDown from '@/public/icon/arrow-down.svg';
import ArrowUp from '@/public/icon/arrow-up.svg';
import TodoIcon from '@/public/icon/work.svg';

import NoteCardList from '../noteCardList/NoteCardList';
import type { GoalType } from '@/types/goal.types';

interface Props {
  initOpen: boolean;
  goalId: GoalType['id'];
  goalTitle: GoalType['title'];
}
export default function GoalNoteList({ initOpen, goalId, goalTitle }: Props) {
  const { isToggleOpen, handleToggle } = useToggle(initOpen);

  return (
    <section className="pl-8">
      <div
        onClick={handleToggle}
        role="button"
        aria-expanded={isToggleOpen}
        className="color-animate mb-4 flex w-full cursor-pointer items-center gap-1 pr-4"
      >
        <TodoIcon width="18" height="18" className="shrink-0" />
        <h3 className="w-full truncate">{goalTitle}</h3>
        <button type="button" aria-label={isToggleOpen ? '목표 노트 숨기기' : '목표 노트 보기'}>
          {isToggleOpen ? (
            <ArrowUp width="24" height="24" />
          ) : (
            <ArrowDown width="24" height="24" className="text-gray350" />
          )}
        </button>
      </div>

      {isToggleOpen && <NoteCardList goalId={goalId} />}
    </section>
  );
}
