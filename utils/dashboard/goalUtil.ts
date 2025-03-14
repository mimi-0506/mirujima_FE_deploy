import { format } from 'date-fns';

import type { GoalType } from '@/types/goal.types';
import type { TodoType } from '@/types/todo.types';

export const getGoalTodos = (todos: TodoType[], goalId: GoalType['id']) => {
  return todos.filter((todo) => todo.goal?.id === goalId);
};

export const getGoalIdByTodo = (todos: TodoType[]) => {
  return todos
    .map((todo) => {
      if (todo.goal && todo.goal.completionDate) {
        const completionDate = format(new Date(todo.goal.completionDate), 'yyyy-MM-dd');
        return { goalId: todo.goal.id, completionDate };
      }
      return null;
    })
    .filter(Boolean) as { goalId: GoalType['id']; completionDate: GoalType['completionDate'] }[];
};
