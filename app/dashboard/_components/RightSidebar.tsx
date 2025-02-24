import LatestTodoList from './LatestTodoList';
import UpcomingGoals from './UpcomingGoals';

export default function RightSidebar() {
  return (
    <div className="grid h-fit w-full grid-cols-1 gap-4 md:grid-cols-2 desktop:sticky desktop:top-0 desktop:grid-cols-1">
      <LatestTodoList />
      <UpcomingGoals />
    </div>
  );
}
