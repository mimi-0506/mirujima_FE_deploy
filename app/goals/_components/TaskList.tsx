'use client';
import React, { useEffect } from 'react';

import TodoItem from './TodoItem';

import type { TodoType } from '@/types/todo.type';

interface TaskListProps {
  title: string;
  tasks: TodoType[];
}

export default function TaskList({ title, tasks }: TaskListProps) {
  useEffect(() => {
    console.log(title, tasks);
  }, [title, tasks]);

  return (
    <div className="min-h-[214px] flex-1">
      <p className="mb-2 text-[15px] font-medium leading-[20px] text-gray500">{title}</p>

      <ul className="mt-2 space-y-2 text-gray350">
        {tasks.length > 0 ? (
          tasks.map((task) => <TodoItem key={task.id} todo={task} />)
        ) : (
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 할 일이 없어요</li>
        )}
      </ul>
    </div>
  );
}
