'use client';

import Calendar from './_components/calendar';
import GoalList from './_components/goals/GoalList';
import LatestTodoList from './_components/LatestTodoList';
import UpcomingGoals from './_components/UpcomingGoals';
import WeeklyChart from './_components/weeklyChart';

export default function Dashboard() {
  return (
    <div className="relative grid grid-cols-1 justify-center gap-4 desktop:grid-cols-4">
      <div className="w-full max-w-[1248px] desktop:col-span-3 desktop:max-w-full">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <WeeklyChart />
          <Calendar />
        </div>
        <GoalList />
      </div>
      <div className="grid h-fit w-full grid-cols-1 gap-4 md:grid-cols-2 desktop:sticky desktop:top-0 desktop:grid-cols-1">
        <LatestTodoList />
        <UpcomingGoals />
      </div>
    </div>
  );
}
