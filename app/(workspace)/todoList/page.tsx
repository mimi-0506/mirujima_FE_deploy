'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import TodoItem from '@/components/TodoItem/TodoItem';
import { useFilteredTodos } from '@/hooks/todo/useFilteredTodos';
import { useInfiniteTodoList } from '@/hooks/todo/useInfiniteTodoList';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import PlusIcon from '@/public/icon/plus-border-none.svg';
import TodoListIcon from '@/public/icon/todo-list-black.svg';
import EmptyMessage from './_components/EmptyMessage';
import PriorityFilter from './_components/PriorityFilter';
import TodoFilter from './_components/TodoFilter';
import type { FilterType } from '@/types/filter.type';
import type { Priority } from '@/types/color.types';

export default function TodoListPage() {
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const userId = useInfoStore((state) => state.userId);

  const [filter, setFilter] = useState<FilterType>('All');

  const [priority, setPriority] = useState<Priority | 'all'>('all');

  const { data, isLoading, ref } = useInfiniteTodoList(Number(userId), filter, Number(priority));
  const filteredTodos = useFilteredTodos(data?.pages || [], filter, priority);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="h2 flex items-center gap-2">
          <TodoListIcon />
          모든 할 일
        </h2>
        <button
          onClick={() => {
            setIsTodoCreateModalOpen(true);
          }}
          className="flex items-center text-main"
        >
          <PlusIcon /> 할일 추가
        </button>
      </div>

      <div className="rounded-container mt-6 min-h-[70vh]">
        <div className="flex justify-between">
          <TodoFilter filter={filter} setFilter={setFilter} />
          <PriorityFilter setPriority={setPriority} />
        </div>

        <div>
          {isLoading ? (
            <LoadingSpinner size={40} className="h-[70vh]" />
          ) : filteredTodos.length > 0 ? (
            <ul>
              {Array.isArray(filteredTodos) &&
                filteredTodos.map((todo, i) => (
                  <motion.li
                    key={todo.id}
                    initial={{ y: 30 }}
                    whileInView={{ y: 0 }}
                    animate={{ transition: { duration: 0.3, delay: i * 0.3 } }}
                    viewport={{ once: true }}
                    exit={{ opacity: 1 }}
                    layout
                  >
                    <TodoItem todo={todo} goalId={todo?.goal?.id} showGoal={true} />
                  </motion.li>
                ))}
            </ul>
          ) : (
            <EmptyMessage filter={filter} filteredTodos={filteredTodos} />
          )}
          <div ref={ref} />
        </div>
      </div>
    </>
  );
}
