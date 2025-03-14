'use client';

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetGoalList from '@/hooks/useGetGoalList';
import { getUpcomingDates } from '@/utils/dateUtils';

import type { GoalType, GoalSummary } from '@/types/goal.types';

export default function UpcomingGoals() {
  const { data, isLoading } = useGetGoalList();
  const [todayDate, setTodayDate] = useState<number | null>(null);

  // 오늘, 내일, 모레 목표 필터링
  const upcomingGoals = getUpcomingDates(3).map(({ date, day }) => {
    const filteredGoals =
      data?.filter((goal: GoalSummary) => {
        if (!goal.completionDate) return false;
        return new Date(goal.completionDate).getDate() === date;
      }) || [];
    return { date, day, goals: filteredGoals };
  });

  useEffect(() => {
    const today = new Date();
    setTodayDate(today.getDate());
  }, []);

  if (todayDate === null) {
    return <LoadingSpinner />;
  }

  return (
    <div className="rounded-container">
      <h3 className="mb-6">남은 일정</h3>
      <ul>
        {Array.isArray(upcomingGoals) &&
          upcomingGoals.map(({ date, day, goals }) => {
            const isToday = date === todayDate;
            return (
              <li
                key={date}
                className={`-mt-[1px] flex items-center border-b border-l-[3px] border-t border-gray200 px-4 py-3 last:border-b-0 ${
                  isToday ? 'border-l-main bg-Cgray' : 'border-l-white'
                }`}
              >
                <div className="mr-4 flex flex-col border-r border-dashed border-gray200 pr-4 text-center font-medium">
                  <span>{date}</span>
                  <span className="text-nowrap">{day}요일</span>
                </div>
                <div className="flex w-full flex-col gap-y-1 truncate text-[13px]">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : goals.length > 0 ? (
                    Array.isArray(goals) &&
                    goals.map((goal: GoalType) => (
                      <span
                        key={goal.id}
                        className="relative w-full truncate pl-2 before:absolute before:left-0 before:-ml-0.5 before:h-1 before:w-1 before:content-['•']"
                      >
                        {goal.title}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray350">등록된 일정이 없습니다</span>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
