'use client';

import Calendar from './_components/Calendar';
import GoalList from './_components/GoalList';
import RightSidebar from './_components/RightSidebar';
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
      <RightSidebar />
    </div>
  );
}
