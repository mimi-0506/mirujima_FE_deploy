import { EMPTY_MESSAGES } from '@/constant/emtymessage';

import type { FilterType } from '@/types/filter.type';
import type { TodoType } from '@/types/todo.types';

interface EmptyMessageProps {
  filter: FilterType;
  filteredTodos: TodoType[];
}

export default function EmptyMessage({ filter, filteredTodos }: EmptyMessageProps) {
  if (filteredTodos.length > 0) return null;

  return (
    <div className="h-[70vh]">
      <p className="empty-message">{EMPTY_MESSAGES[filter]}</p>
    </div>
  );
}
