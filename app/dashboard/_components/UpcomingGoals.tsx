import { useQuery } from '@tanstack/react-query';

import { readGoalList } from '@/apis/clientActions/goal';
import { useInfoStore } from '@/provider/store-provider';
import { getUpcomingDates } from '@/utils/dateUtils';

export default function UpcomingGoals() {
  const { id: userId } = useInfoStore((state) => state);

  const { data } = useQuery({
    queryKey: ['goals', userId],
    queryFn: () => readGoalList({ pageParam: 9999 }),
    enabled: !!userId,
    retry: 0
  });

  // 오늘, 내일, 모레 목표 필터링
  const upcomingGoals = getUpcomingDates(3).map(({ date, day }) => {
    const filteredGoals =
      data?.goals?.filter((goal) => new Date(goal.completionDate).getDate() === date) || [];

    return { date, day, goals: filteredGoals };
  });

  const todayDate = new Date().getDate();

  return (
    <div className="rounded-container">
      <h3 className="mb-6">남은 일정</h3>
      <ul>
        {upcomingGoals.map(({ date, day, goals }) => {
          const isToday = date === todayDate;
          return (
            <li
              key={date}
              className={`-mt-[1px] flex items-center border-b border-l-[3px] border-t border-gray200 px-4 py-3 ${
                isToday ? 'border-l-main bg-Cgray' : 'border-l-white'
              }`}
            >
              <div className="mr-4 flex flex-col border-r border-dashed border-gray200 pr-4 text-center font-medium">
                <span>{date}</span>
                <span>{day}요일</span>
              </div>
              <div className="flex flex-col gap-y-1 text-[13px]">
                {goals.length > 0 ? (
                  goals.map((goal) => <span key={goal.id}>{goal.title}</span>)
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
