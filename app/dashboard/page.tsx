'use client';

import { useQueryClient } from '@tanstack/react-query';

import Calendar from './_components/Calendar';
import GoalList from './_components/GoalList';
import RightSidebar from './_components/RightSidebar';
import WeekendChart from './_components/WeekendChart';

import type { QueryClient } from '@tanstack/react-query';

export default function Dashboard() {
  const queryClient: QueryClient = useQueryClient();

  return (
    <section className="pt-[94px]">
      <div className="relative flex justify-center gap-4">
        <div className="w-full max-w-[1248px]">
          <div className="flex justify-between gap-4">
            <WeekendChart />
            <Calendar />
          </div>
          <GoalList />
        </div>
        <RightSidebar queryClient={queryClient} />
      </div>
    </section>
  );
}
