'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import TodoItem from '@/components/TodoItem/TodoItem';
import { EMPTY_MESSAGES } from '@/constant/emtymessage';
import { useAllTodos } from '@/hooks/todo/useAllTodos';
import { useInfoStore } from '@/provider/store-provider';
import ArrowRightIcon from '@/public/icon/arrow-right-red.svg';

import type { TodoType } from '@/types/todo.types';

export default function LatestTodoList() {
  const userId = useInfoStore((state) => state.userId);

  const { todoData, isLoading } = useAllTodos(Number(userId), 4);

  const hasTodos = todoData.length > 0;

  return (
    <div className="rounded-container flex flex-col desktop:min-h-[250px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h3>최근 등록한 일</h3>
        <Link href="/todoList" className="flex items-center gap-1 text-xs text-main">
          모두 보기
          <ArrowRightIcon width={18} height={18} />
        </Link>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : hasTodos ? (
        <ul>
          {Array.isArray(todoData) &&
            todoData.map((todo: TodoType) => (
              <motion.li key={todo.id} layout>
                <TodoItem todo={todo} showGoal={true} isDashboard={true} />
              </motion.li>
            ))}
        </ul>
      ) : (
        <div className="empty-message">{EMPTY_MESSAGES.None}</div>
      )}
    </div>
  );
}
