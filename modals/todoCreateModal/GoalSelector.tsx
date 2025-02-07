import { useEffect, useLayoutEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import type { DebouncedFunc } from 'lodash';

export default function GoalSelector({
  handleChangeIsValid
}: {
  handleChangeIsValid: DebouncedFunc<() => void>;
}) {
  const [goalList, setGoalList] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState('');

  useLayoutEffect(() => {
    //GoalList 받아오는 로직 추가
    setGoalList(['test1', 'test2', 'test3']);
  }, []);

  useEffect(() => {
    handleChangeIsValid();
  }, [selectedGoal, handleChangeIsValid]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGoal(event.target.value);
  };

  return (
    <div>
      <label htmlFor="goal-select">목표</label>
      <select
        id="goal-select"
        className="rounded-md border p-2"
        name="goal"
        onChange={handleChange}
        value={selectedGoal}
      >
        <option value="" className="hidden" disabled>
          목표를 선택해주세요
        </option>
        {goalList.map((goal, index) => (
          <option key={index} value={goal}>
            {goal}
          </option>
        ))}
      </select>
    </div>
  );
}
