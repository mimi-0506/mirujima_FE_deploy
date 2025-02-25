'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { readTodoList } from '@/apis/todo';
import TodoItem from '@/components/TodoItem/TodoItem';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import PlusIcon from '@/public/icon/plus-border-none.svg';
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

  const { data, isLoading, isFetching, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['allTodos', userId],
    queryFn: ({ pageParam = 9999 }) => readTodoList({ pageParam }),
    initialPageParam: 9999,
    getNextPageParam: (lastPage) => (lastPage.remainingCount > 0 ? lastPage.lastSeenId : null),
    enabled: !!userId,
    retry: 0,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => ({
        todos: (page.todos ?? []).toReversed()
      }))
    })
  });

  // 1. 필터링 (All, To do, Done)
  let filteredTodos = data?.pages
    .flatMap((page) => page.todos)
    .filter((todo) => {
      if (filter === 'To do') return !todo.done;
      else if (filter === 'Done') return todo.done;
      else return true;
    });

  // 2. 우선순위 정렬
  if (priority !== 'all') {
    filteredTodos = filteredTodos?.filter((todo) => todo.priority === priority);
  } else {
    filteredTodos = filteredTodos?.sort((a, b) => a.priority - b.priority);
  }

  useEffect(() => {
    if (filter) {
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId] });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="h2 flex items-center gap-2">
          <TodoListIcon />
          모든 할 일
        </h2>
        {/* TODO: 할 일 추가 모달 생성 */}
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
        {!isLoading && <EmptyMessage filter={filter} filteredTodos={filteredTodos || []} />}
        <div>
          {!isLoading || !isFetching ? (
            <ul>
              {filteredTodos?.map((todo) => {
                return <TodoItem key={todo.id} todo={todo} goalId={todo?.goal?.id} />;
              })}
            </ul>
          ) : (
            <p>로딩중</p>
          )}

          <div ref={ref} />
        </div>
      </div>
    </>
  );
}
