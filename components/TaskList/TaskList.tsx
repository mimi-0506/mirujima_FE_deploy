'use client';
import { useEffect, useState } from 'react';

import TodoItem from '@/components/TodoItem/TodoItem';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';

import type { TodoType } from '@/types/todo.type';

interface TaskListProps {
  title: string;
  goalId: number;
  done: boolean;
}

export default function TaskList({ title, goalId, done }: TaskListProps) {
  const { data, isLoading, isError } = useGetGoalDetail(String(goalId));
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowEmptyMessage(true);
      }
    }, 3000); // 3초 후 실행

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [isLoading]);

  if (isError || !data?.success) return <div>에러가 발생했어요.</div>;

  const tasks: TodoType[] = data?.result?.todos?.filter((task) => task.done === done) ?? [];

  return (
    <div className="scrollbar-thin h-[260px] overflow-y-auto pr-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray200 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
      <h2 className="sticky top-0 z-10 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
        {title}
      </h2>
      <ul className="mt-2 space-y-2 text-gray350">
        {isLoading && !showEmptyMessage && <div>로딩 중...</div>}
        {showEmptyMessage || tasks.length === 0 ? (
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 할 일이 없어요</li>
        ) : (
          tasks.map((task) => <TodoItem key={task.id} todo={task} goalId={goalId} />)
        )}
      </ul>
    </div>
  );
}
