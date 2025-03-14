import { useState } from 'react';

import ArrowDown from '@/public/icon/arrow-down.svg';

import type { Priority, PriorityOption } from '@/types/color.types';

const PRIORITY_OPTION: PriorityOption[] = [
  { value: 'all', text: '전체' },
  { value: 1, text: '1' },
  { value: 2, text: '2' },
  { value: 3, text: '3' },
  { value: 4, text: '4' }
];
type PriorityFilterProps = {
  setPriority: React.Dispatch<React.SetStateAction<Priority | 'all'>>;
};

export default function PriorityFilter({ setPriority }: PriorityFilterProps) {
  const [selectedPriority, setSelectedPriority] = useState<'all' | number>('all');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSelectPriority = (value: 'all' | Priority) => {
    setSelectedPriority(value);
    setPriority(value);
    setIsSelectOpen(false);
  };

  const toggleSelect = () => setIsSelectOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        className="grid min-w-[78px] cursor-pointer grid-cols-2 items-center rounded-full border border-[#FBA5A5] px-3 py-[6px] text-center text-sm leading-tight text-[#F86969]"
        onClick={toggleSelect}
        onBlur={() => setIsSelectOpen(false)}
      >
        {PRIORITY_OPTION.find((option) => option.value === selectedPriority)?.text}
        <span className="ml-auto">
          <ArrowDown className="stroke-main" />
        </span>
      </button>

      {isSelectOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-xl border border-[#F2EFEF] bg-white text-center shadow-md"
          onMouseDown={(e) => e.preventDefault()}
        >
          {PRIORITY_OPTION.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer p-2 text-sm hover:bg-gray-100"
              onClick={() => handleSelectPriority(option.value)}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
