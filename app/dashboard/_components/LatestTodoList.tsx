import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { readTodoList } from '@/apis/todo';
import TodoItem from '@/components/TodoItem/TodoItem';
import { EMPTY_MESSAGES } from '@/constant/emtymessage';
import { useInfoStore } from '@/provider/store-provider';
import ArrowRightIcon from '@/public/icon/arrow-right-red.svg';
import SpinIcon from '@/public/icon/spin.svg';

import type { TodoListType, TodoType } from '@/types/todo.type';

export default function LatestTodoList() {
  const userId = useInfoStore((state) => state.userId);

  const { data, isLoading } = useQuery<TodoListType>({
    queryKey: ['allTodos', userId, 4],
    queryFn: () => readTodoList({ pageSize: 4 }),
    retry: 0
  });

  return (
    <div className="rounded-container flex flex-col desktop:min-h-[250px]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h3 className="h3">최근 등록한 일</h3>
        <Link href="/todoList" className="flex items-center gap-1 text-main">
          모두 보기
          <ArrowRightIcon width={18} height={18} />
        </Link>
      </div>

      {isLoading ? (
        <SpinIcon />
      ) : data?.todos ? (
        <ul className="pointer-events-none">
          {data.todos.map((todo: TodoType) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <div className="m-auto text-center">{EMPTY_MESSAGES.None}</div>
      )}
    </div>
  );
}
