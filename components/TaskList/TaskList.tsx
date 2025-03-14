'use client';

import React from 'react';
import { motion } from 'motion/react';
import TodoItem from '@/components/TodoItem/TodoItem';
import { useGetTodoList } from '@/hooks/goalsDetail/useGetTodoList';
import SpinIcon from '@/public/icon/spin.svg';

import type { TodoType } from '@/types/todo.types';
import type { GoalType } from '@/types/goal.types';

interface TaskListProps {
  goalId: GoalType['id'];
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

  const tasks = propTasks ?? data;
  const loading = propTasks ? (propLoading ?? false) : isLoading;
  const error = propTasks ? (propError ?? false) : isError;

  if (error) return <div>에러가 발생했어요.</div>;

  return (
    <div
      className={`scrollbar-thin custom-scrollbar pr-1 transition-all ${
        isMoreToggle ? 'max-h-full' : 'max-h-[260px]'
      } ${isDashboard ? 'overflow-y-auto scrollbar-hide' : 'max-h-full'}`}
    >
      <ul className="mt-2 space-y-2 text-gray350">
        {loading ? (
          <div>
            <SpinIcon />
          </div>
        ) : !tasks || tasks.length === 0 ? (
          <li className="py-3 text-[14px] font-medium leading-[16px]">등록된 할 일이 없어요</li>
        ) : (
          tasks.map((task, i) => (
            <motion.li
              key={task.id}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              animate={{ transition: { duration: 0.3, delay: i * 0.3 } }}
              viewport={{ once: true }}
              exit={{ opacity: 1 }}
              layout
            >
              <TodoItem todo={task} goalId={goalId} isDashboard={isDashboard} />
            </motion.li>
          ))
        )}
      </ul>
    </div>
  );
}
