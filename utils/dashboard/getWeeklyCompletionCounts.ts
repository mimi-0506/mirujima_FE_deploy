import { endOfWeek, isWithinInterval, parseISO, startOfWeek } from 'date-fns';

import { WEEK_DAYS } from '@/constant/date';

import type { TodoType } from '@/types/todo.type';
import type { ISODateString } from '@/types/ISODateString.type';

type DayOfWeek = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export const getWeeklyCompletionCounts = (todos: TodoType[]) => {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });

  const weeklyCompletion: Record<DayOfWeek, number> = {
    월: 0,
    화: 0,
    수: 0,
    목: 0,
    금: 0,
    토: 0,
    일: 0
  };

  todos?.forEach((todo) => {
    const completionDateStr: ISODateString | null = todo.completionDate;
    if (!completionDateStr) return;

    const completionDate = parseISO(completionDateStr);

    if (isWithinInterval(completionDate, { start: startOfThisWeek, end: endOfThisWeek })) {
      // WEEK_DAYS와 completionDate의 시작요일이 달라서 -1 연산
      const dayOfWeekIndex = completionDate.getDay() - 1;
      const dayName = WEEK_DAYS[dayOfWeekIndex] as DayOfWeek;
      weeklyCompletion[dayName] += 1;
    }
  });

  return weeklyCompletion;
};
