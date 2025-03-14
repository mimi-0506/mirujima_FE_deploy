import { useEffect, useLayoutEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import useGetGoalList from '@/hooks/useGetGoalList';
import { useTodoCreateModalStore } from '@/provider/store-provider';

import type { GoalType } from '@/types/goal.types';

export default function GoalSelector() {
  const [goalList, setGoalList] = useState<GoalType[]>([]);
  const { data } = useGetGoalList();
  const goal = useTodoCreateModalStore((state) => state.goal) as GoalType | null;
  const setCreatedTodoState = useTodoCreateModalStore((state) => state.setCreatedTodoState);
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(goal);

  useEffect(() => {
    if (goal && goal.id !== selectedGoal?.id) setSelectedGoal(goal);
  }, [goal, selectedGoal?.id]);

  useLayoutEffect(() => {
    if (Array.isArray(data)) setGoalList(data);
  }, [data]);

  const handleSelecteGoalChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nowGoal = goalList.find((item) => item.id === parseInt(event.target.value));

    if (nowGoal) {
      setSelectedGoal(nowGoal);
      setCreatedTodoState({ goal: nowGoal });
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="goal-select">목표</label>
      <select
        id="goal-select"
        className="mt-4 rounded-lg border border-gray-200 px-4 py-[0.7vw] text-gray350 focus:outline-main"
        name="goal"
        onChange={handleSelecteGoalChange}
        value={selectedGoal ? selectedGoal.id : 'default'}
      >
        <option value={'default'} className="hidden" disabled>
          목표를 선택해주세요
        </option>
        {Array.isArray(goalList) &&
          goalList.map((goal, index) => (
            <option key={index} id={`${index}`} value={goal?.id} className="text-gray500">
              {goal?.title}
            </option>
          ))}
      </select>
    </div>
  );
}
