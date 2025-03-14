import { useEffect, useState } from 'react';
import type { TodoType } from '@/types/todo.types';
import type { Priority } from '@/types/color.types';
export const useFilteredTodos = (todos: TodoType[], filter: string, priority: Priority | 'all') => {
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

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
