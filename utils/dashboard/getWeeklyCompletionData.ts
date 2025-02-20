import { calcWeeklyCompletionPercentages } from '../percentageUtils';
import { getWeeklyCompletionCounts } from './getWeeklyCompletionCounts';

import type { TodoType } from '@/types/todo.type';

export const getWeeklyCompletionData = (todos: TodoType[]) => {
  const weeklyCompletion = getWeeklyCompletionCounts(todos);
  const totalTodos = todos.length || 0;

  return calcWeeklyCompletionPercentages(weeklyCompletion, totalTodos);
};
