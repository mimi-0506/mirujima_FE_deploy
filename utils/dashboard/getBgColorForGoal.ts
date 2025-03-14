import type { TodoType } from '@/types/todo.types';
import type { GoalType } from '@/types/goal.types';

export const getBgColorForGoal = (
  todos: TodoType[],
  formattedDay: string,
  getGoalIdByTodo: (todos: TodoType[]) => Array<{
    goalId: GoalType['id'];
    completionDate: GoalType['completionDate'];
  }>,
  calcGoalCompletionPercentage: (todos: TodoType[], goalId: number) => number
) => {
  const goalId = getGoalIdByTodo(todos)?.find(
    (goal) => goal?.completionDate === formattedDay
  )?.goalId;

  if (!goalId) return '';

  const completionRate = calcGoalCompletionPercentage(todos, goalId);

  if (completionRate === 100) return 'bg-main text-white';
  else if (completionRate >= 70) return 'bg-default text-white';
  else if (completionRate >= 30) return 'bg-solid';
  else return '';
};
