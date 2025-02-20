import { useEffect, useLayoutEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import useGetGoalList from '@/hooks/useGetGoalList';
import { useTodoCreateModalStore } from '@/provider/store-provider';

import type { GoalType } from './type';

export default function GoalSelector() {
  const [goalList, setGoalList] = useState<GoalType[]>([]);
  const { getGoalList } = useGetGoalList();
  const { goal, setCreatedTodoState } = useTodoCreateModalStore((state) => state);
  const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(goal);

  //수정시 초기값 가져오기용 세팅
  useEffect(() => {
    if (goal?.id !== selectedGoal?.id) setSelectedGoal(goal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal]);

  useLayoutEffect(() => {
    get();
  }, []);

  const get = async () => {
    const data = await getGoalList();

    setGoalList(data.result.goals);
  };

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
        className="mt-4 rounded-lg border border-gray-200 px-4 py-[0.7vw] text-gray350"
        name="goal"
        onChange={handleSelecteGoalChange}
        value={selectedGoal ? selectedGoal.id : 'default'}
      >
        <option value={'default'} className="hidden" disabled>
          목표를 선택해주세요
        </option>
        {goalList.map((goal, index) => (
          <option key={index} id={`${index}`} value={goal.id} className="text-gray500">
            {goal?.title}
          </option>
        ))}
      </select>
    </div>
  );
}
