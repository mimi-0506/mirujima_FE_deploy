import { EMPTY_MESSAGES } from '@/constant/emtymessage';

import type { FilterType } from './TodoFilter';
import type { TodoType } from '@/types/todo.type';

interface EmptyMessageProps {
  filter: FilterType;
  filteredTodos: TodoType[];
}

export default function EmptyMessage({ filter, filteredTodos }: EmptyMessageProps) {
  if (filteredTodos.length > 0) return null;

  return (
    <p className="text-[14px] font-medium leading-[16px] text-gray350">{EMPTY_MESSAGES[filter]}</p>
  );
}
