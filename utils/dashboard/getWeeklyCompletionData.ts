import { calcWeeklyCompletionPercentages } from '../percentageUtils';
import { getWeeklyCompletionCounts } from './getWeeklyCompletionCounts';

import type { TodoType } from '@/types/todo.types';

export const getWeeklyCompletionData = (todos: TodoType[]) => {
  const doneTodos = todos.filter((todo) => todo.done === true);
  const weeklyCompletion = getWeeklyCompletionCounts(doneTodos);
  const totalTodos = todos.length || 0;

  return calcWeeklyCompletionPercentages(weeklyCompletion, totalTodos);
};
