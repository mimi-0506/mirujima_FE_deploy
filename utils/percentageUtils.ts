import { getGoalTodos } from './dashboard/goalUtil';

import type { TodoType } from './../types/todo.type';
import type { TodoProgressType } from '@/types/todo.type';

const calculatePercentage = (count: number, total: number) => {
  return total ? Math.round((count / total) * 100) : 0;
};

export const calcTotalCompletionPercentage = ({
  todoCount = 0,
  completionTodoCount = 0
}: TodoProgressType) => {
  return calculatePercentage(completionTodoCount, todoCount);
};

export const calcWeeklyCompletionPercentages = (
  weeklyCompletion: Record<string, number>,
  totalTodos: number
) => {
  return Object.entries(weeklyCompletion).map(([day, count]) => ({
    day,
    percentage: calculatePercentage(count, totalTodos)
  }));
};

export const calcGoalCompletionPercentage = (todos: TodoType[], goalId: number) => {
  const goal = getGoalTodos(todos, goalId);
  const total = goal?.length || 0;
  const completed = goal?.filter((todo) => todo.done).length || 0;

  return calculatePercentage(completed, total);
};
