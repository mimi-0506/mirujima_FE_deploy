import { useState } from 'react';

export default function GoalSelector({
  handleChangeIsValid
}: {
  handleChangeIsValid: (event: React.FormEvent) => void;
}) {
  const [goalList, setGoalList] = useState<string[]>(['test1', 'test2', 'test3']);

  return (
    <div>
      <label htmlFor="goal-select">목표</label>
      <select
        id="goal-select"
        className="rounded-md border p-2"
        name="goal"
        onChange={handleChangeIsValid}
      >
        <option defaultValue="" className="hidden" disabled selected>
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
