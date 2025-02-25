'use client';

import React, { useState, useEffect } from 'react';
import TodoItem from '@/components/TodoItem/TodoItem';
import { useGetTodoList } from '@/hooks/goalsDetail/useGetTodoList';
import type { TodoType } from '@/types/todo.type';

interface TaskListProps {
  title: string;
  goalId: number;
  done: boolean;
  tasks?: TodoType[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function TaskList({
  title,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        setShowEmptyMessage(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [loading]);

  if (error) return <div>에러가 발생했어요.</div>;

  return (
    <div className="scrollbar-thin h-[260px] overflow-y-auto pr-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray200 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
      <h2 className="sticky top-0 z-10 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
        {title}
      </h2>
      <ul className="mt-2 space-y-2 text-gray350">
        {loading && !showEmptyMessage && <div>로딩 중...</div>}
        {showEmptyMessage || !tasks || tasks.length === 0 ? (
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 할 일이 없어요</li>
        ) : (
          tasks.map((task) => <TodoItem key={task.id} todo={task} goalId={goalId} />)
        )}
      </ul>
    </div>
  );
}
