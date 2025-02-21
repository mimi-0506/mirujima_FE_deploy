import { useEffect, useState } from 'react';
import FlagBlackIcon from '@/public/icon/flag-black.svg';
import TaskList from '@/components/TaskList/TaskList';
import useGetGoalList from '@/hooks/useGetGoalList';
import { GoalListType, GoalType } from '@/types/goal.type';

type GoalListResponse = {
  success: boolean;
  code: number;
  message: string;
  result: GoalListType;
};

export default function GoalList() {
  const { getGoalList } = useGetGoalList();
  const [goals, setGoals] = useState<GoalType[]>([]);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = (await getGoalList()) as GoalListResponse;

        const goalsFromApi = response.result.goals;
        setGoals(goalsFromApi);

        console.log('전체 응답:', response);
        console.log('goals 배열:', goalsFromApi);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    }

    fetchGoals();
  }, [getGoalList]);

  return (
    <div className="mt-4 md:mt-8">
      <h2 className="h2 mb-6 flex items-center gap-2">
        <FlagBlackIcon width={18} height={18} />
        목표 별 할 일
      </h2>
      <section className="flex flex-col gap-4">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div key={goal.id} className="rounded-container w-full">
              <h3>{goal.title}</h3>
              {/* <TaskList done={} title={goal.title} goalId={goal.id} /> */}
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </div>
  );
}
