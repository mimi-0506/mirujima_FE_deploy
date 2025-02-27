import { useEffect, useState } from 'react';

import { useCountUp } from '@/hooks/dashboard/useCountUp';
import { getGoalTodos } from '@/utils/dashboard/goalUtil';
import { calcGoalCompletionPercentage } from '@/utils/percentageUtils';

import type { TodoType } from '@/types/todo.type';

export default function GoalProgressBar({
  todos = [],
  goalId,
  startAnimation
}: {
  todos: TodoType[];
  goalId: number;
  startAnimation: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const goalTodos = getGoalTodos(todos, goalId);
  const count = useCountUp(Number(progress), 2000);

  useEffect(() => {
    const percentage = calcGoalCompletionPercentage(goalTodos, goalId);

    if (startAnimation) {
      setTimeout(() => {
        setProgress(percentage);
      }, 500);
    }
  }, [startAnimation, goalTodos, goalId]);

  return (
    <div className="my-6">
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-main"
          style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}
        />
      </div>
      <div className="mt-2 text-right font-bold">{count}%</div>
    </div>
  );
}
