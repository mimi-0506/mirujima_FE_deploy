'use client';

import React, { useState } from 'react';

import TodoItem from '@/components/TodoItem/TodoItem';
import { useGetTodoList } from '@/hooks/goalsDetail/useGetTodoList';
import SpinIcon from '@/public/icon/spin.svg';

import type { TodoType } from '@/types/todo.type';

interface TaskListProps {
  goalId: number;
  done: boolean;
  tasks?: TodoType[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function TaskList({
  goalId,
  done,
  tasks: propTasks,
  isLoading: propLoading,
  isError: propError
}: TaskListProps) {
  const { data, isLoading, isError } = useGetTodoList(goalId, done);

  const tasks = propTasks !== undefined ? propTasks : data;
  const loading = propTasks !== undefined ? (propLoading ?? false) : isLoading;
  const error = propTasks !== undefined ? (propError ?? false) : isError;

  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  if (error) return <div>에러가 발생했어요.</div>;

  return (
    <div className="scrollbar-thin h-[260px] overflow-y-auto pr-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray200 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
      <ul className="mt-2 space-y-2 text-gray350">
        {loading ? (
          // 1. 로딩 중일 때
          <div>
            <SpinIcon />
          </div>
        ) : showEmptyMessage || !tasks || tasks.length === 0 ? (
          // 2. 로딩 끝났는데 비어있음
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 할 일이 없어요</li>
        ) : (
          // 3.  TodoItem 렌더링
          tasks.map((task) => <TodoItem key={task.id} todo={task} goalId={goalId} />)
        )}
      </ul>
    </div>
  );
}
