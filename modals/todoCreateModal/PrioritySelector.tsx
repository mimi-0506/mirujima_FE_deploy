import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import { useModalStore } from '@/provider/store-provider';

const PRIORITY = [1, 2, 3, 4];

export default function PrioritySelector() {
  const { todoCreateModal, setTodoCreateModal } = useModalStore((state) => state);
  const [selectedPriority, setSelectedPriority] = useState<number | string>(
    todoCreateModal.priority
  );

  useEffect(() => {
    if (todoCreateModal.priority !== selectedPriority)
      setSelectedPriority(todoCreateModal.priority);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoCreateModal]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(event.target.value);
    setTodoCreateModal({ ...todoCreateModal, priority: parseInt(event.target.value) });
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="Priority-select">우선순위</label>
      <select
        id="Priority-select"
        className={`mt-4 rounded-lg border border-gray-200 px-4 py-[14px] ${selectedPriority === 0 ? 'text-gray350' : 'text-gray500'} `}
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
