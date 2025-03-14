
import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { TodoType } from '@/types/todo.types';
import type { Priority } from '@/types/color.types';
export const useFilteredTodos = (todos: TodoType[], filter: string, priority: Priority | 'all') => {
  const queryClient = useQueryClient();

  let filteredTodos = todos;

  // 1. 필터링 (All, To do, Done)
  filteredTodos = filteredTodos.filter((todo) => {
    if (filter === 'To do') return !todo.done;
    else if (filter === 'Done') return todo.done;
    else return true;
  });

  // // 2. 우선순위 정렬
  if (priority !== 'all') {
    filteredTodos = filteredTodos?.filter((todo) => todo.priority === priority);
  }


  useEffect(() => {
    const nextFilteredTodos = todos.filter((todo) => {
      if (filter === 'To do') return !todo.done;
      else if (filter === 'Done') return todo.done;
      return true;
    });

    if (priority !== 'all')
      setFilteredTodos(nextFilteredTodos?.filter((todo) => todo.priority === priority));
    else setFilteredTodos(nextFilteredTodos);
  }, [filter, priority]);

  return filteredTodos;
};
