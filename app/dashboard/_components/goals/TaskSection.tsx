import TaskList from '@/components/TaskList/TaskList';

interface Props {
  title: string;
  goalId: number;
  done: boolean;
  isMoreToggle: boolean;
  isDashboard: boolean;
}

export default function TaskSection({ title, goalId, done, isMoreToggle, isDashboard }: Props) {
  return (
    <div className="flex-1 overflow-y-auto">
      <h2 className="z-5 sticky top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
        {title}
      </h2>
      <div onClick={(e) => e.stopPropagation()}>
        <TaskList
          goalId={goalId}
          done={done}
          isMoreToggle={isMoreToggle}
          isDashboard={isDashboard}
        />
      </div>
    </div>
  );
}
