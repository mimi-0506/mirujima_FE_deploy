import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { readTodoList } from '@/apis/todo';
import TodoItem from '@/components/TodoItem/TodoItem';
import { EMPTY_MESSAGES } from '@/constant/emtymessage';
import useIsSmallScreen from '@/hooks/nav/useIsSmallScreen';
import { useInfoStore } from '@/provider/store-provider';
import ArrowRightIcon from '@/public/icon/arrow-right-red.svg';

import type { TodoListType } from '@/types/todo.type';

export default function LatestTodoList() {
  const { isSmallScreen } = useIsSmallScreen();
  const { id: userId } = useInfoStore((state) => state);

  const { data } = useQuery<TodoListType>({
    queryKey: ['todos', userId, isSmallScreen],
    queryFn: () => readTodoList({ pageSize: isSmallScreen ? 3 : 4 }),
    select: (data) => ({
      ...data,
      todos: (data.todos ?? []).toReversed()
    })
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
      {data?.todos ? (
        <ul className="pointer-events-none">
          {data.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} goalId={todo?.goal?.id} />
          ))}
        </ul>
      ) : (
        <div className="m-auto text-center">{EMPTY_MESSAGES.None}</div>
      )}{' '}
    </div>
  );
}
