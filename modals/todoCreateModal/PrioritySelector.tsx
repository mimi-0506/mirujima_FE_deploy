import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import { useTodoCreateModalStore } from '@/provider/store-provider';
import { Priority } from '@/types/color.type';

const PRIORITY: Priority[] = [1, 2, 3, 4];

export default function PrioritySelector() {
  const priority = useTodoCreateModalStore((state) => state.priority);
  const setCreatedTodoState = useTodoCreateModalStore((state) => state.setCreatedTodoState);
  const [selectedPriority, setSelectedPriority] = useState<Priority | 0>(priority as Priority | 0);

  useEffect(() => {
    if (priority !== selectedPriority) setSelectedPriority(priority as Priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priority]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPriority = parseInt(event.target.value) as Priority;
    setSelectedPriority(newPriority);
    setCreatedTodoState({ priority: newPriority });
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="Priority-select">우선순위</label>
      <select
        id="Priority-select"
        className={`mt-4 rounded-lg border border-gray-200 px-4 py-[0.7vw] ${selectedPriority === 0 ? 'text-gray350' : 'text-gray500'} `}
        name="priority"
        onChange={handleChange}
        value={selectedPriority}
      >
        <option value={0} className="hidden" disabled>
          우선순위를 선택해주세요
        </option>
        {PRIORITY.map((priority, index) => (
          <option key={index} value={priority} className="text-gray500">
            {priority}
          </option>
        ))}
      </select>
    </div>
  );
}
