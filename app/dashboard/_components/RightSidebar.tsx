import LatestTodoList from './LatestTodoList';
import UpcomingGoals from './UpcomingGoals';

export default function RightSidebar() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 desktop:grid-cols-1">
      <LatestTodoList />
      <UpcomingGoals />
    </div>
  );
}
