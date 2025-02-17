import { useEffect, useLayoutEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import { useModalStore } from '@/provider/store-provider';

import type { GoalType } from './type';

export default function GoalSelector() {
  const [goalList, setGoalList] = useState<GoalType[]>([]);
  const { todoCreateModal, setTodoCreateModal } = useModalStore((state) => state);
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(todoCreateModal.goal);

  //바뀔 때마다 todoCreateModal값 바꿔주면 모든 input에서 리렌더링.
  //submit시에는 formRef로 현재 input값 가져올 거니 todoCreatModal 값을 일일이 다시 바꿔줄 필요는 없음.
  //단, title, priority, goal의 경우는 없으면 submit버튼 비활성화해야하니 allValue로 체크.
  //단, priroiry, goal의 경우 모달수정시에는 결코 빈값이 될 수 없으므로 useEffect로 안 봐도 됨.

  useEffect(() => {
    if (todoCreateModal.goal.id !== selectedGoal.id) setSelectedGoal(todoCreateModal.goal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoCreateModal]);

  useLayoutEffect(() => {
    //GoalList 받아오는 로직 추가
    setGoalList([
      { id: 1, title: 'test1' },
      { id: 2, title: 'test2' },
      { id: 3, title: 'test3' }
    ]);
  }, []);

  const handleSelecteGoalChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = goalList.find((item) => item.title === event.target.value)?.id;
    if (typeof id === 'number') {
      setSelectedGoal({ id: id, title: event.target.value });
      setTodoCreateModal({
        ...todoCreateModal,
        goal: { id: id, title: event.target.value }
      });
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="goal-select">목표</label>
      <select
        id="goal-select"
        className="mt-4 rounded-lg border border-gray-200 px-4 py-[14px] text-gray350"
        name="goal"
        onChange={handleSelecteGoalChange}
        value={selectedGoal?.title}
      >
        <option value={''} className="hidden" disabled>
          목표를 선택해주세요
        </option>
        {goalList.map((goal, index) => (
          <option key={index} id={`${goal.id}`} value={goal.title} className="text-gray500">
            {goal.title}
          </option>
        ))}
      </select>
    </div>
  );
}
