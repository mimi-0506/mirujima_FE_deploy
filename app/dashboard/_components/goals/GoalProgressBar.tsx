import { useEffect, useState } from 'react';

import { useCountUp } from '@/hooks/dashboard/useCountUp';
import { getGoalTodos } from '@/utils/dashboard/goalUtil';
import { calcGoalCompletionPercentage } from '@/utils/percentageUtils';

import type { TodoType } from '@/types/todo.types';
import type { GoalType } from '@/types/goal.types';
interface GoalProgressBarProps {
  todos?: TodoType[];
  goalId: GoalType['id'];
  startAnimation: boolean;
}

export default function GoalProgressBar({
  todos = [],
  goalId,
  startAnimation
}: GoalProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const goalTodos = getGoalTodos(todos, goalId);
  const count = useCountUp(progress, 2000);

  useEffect(() => {
    const percentage = calcGoalCompletionPercentage(goalTodos, goalId);

    let timeoutId: NodeJS.Timeout;

    if (startAnimation)
      timeoutId = setTimeout(() => {
        setProgress(percentage);
      }, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
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
