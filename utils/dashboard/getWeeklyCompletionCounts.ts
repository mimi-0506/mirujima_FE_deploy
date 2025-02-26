import { endOfWeek, isWithinInterval, parseISO, startOfWeek } from 'date-fns';

import { WEEK_DAYS } from '@/constant/date';

import type { TodoType } from '@/types/todo.type';

export const getWeeklyCompletionCounts = (todos: TodoType[]) => {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });

  const weeklyCompletion: Record<string, number> = {
    월: 0,
    화: 0,
    수: 0,
    목: 0,
    금: 0,
    토: 0,
    일: 0
  };

  todos?.forEach((todo) => {
    if (!todo.completionDate) return;
    const completionDate = parseISO(todo.completionDate);

    if (isWithinInterval(completionDate, { start: startOfThisWeek, end: endOfThisWeek })) {
      const dayOfWeek = completionDate.getDay();
      const dayName = WEEK_DAYS[dayOfWeek];
      weeklyCompletion[dayName] += 1;
    }
  });

  return weeklyCompletion;
};
