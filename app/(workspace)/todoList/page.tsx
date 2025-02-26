'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { readTodoList } from '@/apis/todo';
import TodoItem from '@/components/TodoItem/TodoItem';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import PlusIcon from '@/public/icon/plus-border-none.svg';
import SpinIcon from '@/public/icon/spin.svg';
import TodoListIcon from '@/public/icon/todo-list-black.svg';

import EmptyMessage from './_components/EmptyMessage';
import PriorityFilter from './_components/PriorityFilter';
import TodoFilter from './_components/TodoFilter';

import type { FilterType } from './_components/TodoFilter';
import type { QueryClient } from '@tanstack/react-query';

export default function TodoListPage() {
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);

  const queryClient: QueryClient = useQueryClient();
  const userId = useInfoStore((state) => state.userId);
  const [filter, setFilter] = useState<FilterType>('All');
  const [priority, setPriority] = useState<'all' | number>('all');

  const { ref, inView } = useInView();

  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['allTodos', userId, filter, priority],
    queryFn: ({ pageParam = undefined }) => readTodoList({ lastSeenId: pageParam }),
    initialPageParam: 9999,
    getNextPageParam: (lastPage) => (lastPage.remainingCount > 0 ? lastPage.lastSeenId : undefined),
    refetchOnWindowFocus: false,
    select: (data) => {
      return {
        ...data,
        pages: data.pages ? data.pages.flatMap((page) => page.todos) : []
      };
    }
  });

  let filteredTodos = data?.pages || [];

  // 1. 필터링 (All, To do, Done)
  filteredTodos = filteredTodos.filter((todo) => {
    if (filter === 'To do') return !todo.done;
    else if (filter === 'Done') return todo.done;
    else return true;
  });

  // 2. 우선순위 정렬
  if (priority !== 'all') {
    filteredTodos = filteredTodos?.filter((todo) => todo.priority === priority);
  }

  useEffect(() => {
    if (filter) {
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching]);

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
      <div className="mt-6 rounded-xl border border-gray200 bg-white p-6 text-black">
        <div className="flex justify-between">
          <TodoFilter filter={filter} setFilter={setFilter} />
          <PriorityFilter setPriority={setPriority} />
        </div>

        <div>
          {isLoading || isFetching ? (
            <SpinIcon />
          ) : filteredTodos.length > 0 ? (
            <ul>
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} goalId={todo?.goal?.id} />
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
