'use client';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import TodoItem from '@/components/TodoItem/TodoItem';
import { useInfiniteTodoList } from '@/hooks/goalsDetail/useInfiniteTodoList';

import type { TodoType } from '@/types/todo.type';

interface TaskListProps {
  title: string;
  goalId: number;
  done: boolean;
}

export default function TaskList({ title, goalId, done }: TaskListProps) {
  const { ref, inView } = useInView();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteTodoList(goalId, done);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tasks: TodoType[] = data?.pages.flatMap((page) => page.todos) ?? [];

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했어요.</div>;

  return (
    <div className="scrollbar-thin h-[260px] overflow-y-auto pr-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray200 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
      <h2 className="sticky top-0 z-10 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
        {title}
      </h2>
      <ul className="mt-2 space-y-2 text-gray350">
        {tasks.length > 0 ? (
          tasks.map((task) => <TodoItem key={task.id} todo={task} goalId={goalId} />)
        ) : (
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 할 일이 없어요</li>
        )}
        <div ref={ref} />
      </ul>
    </div>
  );
}
