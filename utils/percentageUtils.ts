import type { TodoProgressType } from '@/types/todo.type';

const calculatePercentage = (count: number, total: number) => {
  console.log('count', count, total);
  return total ? Math.round((count / total) * 100) : 0;
};

export const calcTotalCompletionPercentage = ({
  todoCount = 0,
  completionTodoCount = 0
}: TodoProgressType) => {
  console.log('todoCount', todoCount, completionTodoCount);
  return calculatePercentage(completionTodoCount, todoCount);
};

export const calcWeeklyCompletionPercentages = (
  weeklyCompletion: Record<string, number>,
  totalTodos: number
) => {
  return Object.entries(weeklyCompletion).map(([day, count]) => ({
    day,
    // percentage: calculatePercentage(count, totalTodos)
    percentage: totalTodos ? Math.round((count / totalTodos) * 100) : 0
  }));
};
