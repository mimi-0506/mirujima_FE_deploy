import { useQuery } from '@tanstack/react-query';

import { readTodoList } from '@/apis/todo';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import useGetGoalList from '@/hooks/useGetGoalList';
import FlagBlackIcon from '@/public/icon/flag-black.svg';

import GoalItem from './GoalItem';

import type { GoalListType } from '@/types/goal.type';

type GoalListResponse = {
  success: boolean;
  code: number;
  message: string;
  result: GoalListType;
};

export default function GoalList() {
  const { data: goals = [], isLoading } = useGetGoalList();

  const { data: todosData } = useQuery({
    queryKey: ['allTodos'],
    queryFn: () => readTodoList({ pageSize: 9999 }),
    retry: 0
  });

  return (
    <div className="mt-4 md:mt-8">
      <h2 className="h2 mb-6 flex items-center gap-2">
        <FlagBlackIcon width={18} height={18} />
        목표 별 할 일
      </h2>
      <section className="flex flex-col gap-4">
        {isLoading ? (
          <LoadingSpinner size={40} className="rounded-container min-h-96" />
        ) : goals?.length > 0 ? (
          goals.map((goal: any) => (
            <GoalItem
              key={goal.id}
              goalId={goal.id}
              title={goal.title}
              todos={todosData?.todos || []}
            />
          ))
        ) : (
          <div className="empty-message rounded-container min-h-64 w-full desktop:min-h-96">
            목표를 설정해주세요
          </div>
        )}
      </section>
    </div>
  );
}
