import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { TodoType } from '@/types/todo.type';

export const useFilteredTodos = (todos: TodoType[], filter: string, priority: string | number) => {
  const queryClient = useQueryClient();

  let filteredTodos = todos;

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
      queryClient.invalidateQueries({ queryKey: ['allTodos'] });
      queryClient.refetchQueries({ queryKey: ['allTodos'] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return filteredTodos;
};
