import LatestTodoList from './LatestTodoList';
import UpcomingGoals from './UpcomingGoals';

import type { QueryClient } from '@tanstack/react-query';

export default function RightSidebar({ queryClient }: { queryClient: QueryClient }) {
  return (
    <div className="flex flex-col gap-y-4">
      <LatestTodoList queryClient={queryClient} />
      <UpcomingGoals />
    </div>
  );
}
