'use client';

import React, { useEffect, useState } from 'react';
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
  isMoreToggle?: boolean;
  isDashboard?: boolean;
}

export default function TaskList({
  goalId,
  done,
  tasks: propTasks,
  isLoading: propLoading,
  isError: propError,
  isMoreToggle,
  isDashboard
}: TaskListProps) {
  const { data, isLoading, isError } = useGetTodoList(goalId, done);

  const tasks = propTasks !== undefined ? propTasks : data;
  const loading = propTasks !== undefined ? (propLoading ?? false) : isLoading;
  const error = propTasks !== undefined ? (propError ?? false) : isError;

  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    setShowEmptyMessage(false);
  }, []);

  if (error) return <div>에러가 발생했어요.</div>;

  return (
    <div
      className={`scrollbar-thin custom-scrollbar overflow-y-auto pr-5 transition-all ${
        isMoreToggle ? 'max-h-full' : 'max-h-[260px]'
      } ${isDashboard ? 'scrollbar-hide' : ''}`}
    >
      <ul className="mt-2 space-y-2 text-gray350">
        {loading ? (
          <div>
            <SpinIcon />
          </div>
        ) : showEmptyMessage || !tasks || tasks.length === 0 ? (
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 할 일이 없어요</li>
        ) : (
          Array.isArray(tasks) &&
          tasks.map((task) => (
            <li key={task.id}>
              <TodoItem todo={task} goalId={goalId} isDashboard={isDashboard} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
