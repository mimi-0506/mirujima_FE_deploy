import { format } from 'date-fns';

import type { GoalId } from '@/types/goal.type';
import type { TodoType } from '@/types/todo.type';

export const getGoalTodos = (todos: TodoType[], goalId: GoalId['goalId']) => {
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
    .filter(Boolean) as GoalId[];
};
