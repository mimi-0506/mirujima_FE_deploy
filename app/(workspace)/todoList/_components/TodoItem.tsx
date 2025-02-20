import KebabMenu from '@/components/kebab/KebabMenu';
import { PRIORITY_COLORS } from '@/constant/priorityColor';
import { useDeleteTodoMutation } from '@/hooks/useDeleteTodoMutation';
import { useUpdateTodoStatusMutation } from '@/hooks/useUpdateTodoStatusMutation';
import { useModalStore, useTodoCreateModalStore } from '@/provider/store-provider';
import FileIcon from '@/public/icon/file.svg';
import FlagIcon from '@/public/icon/flag-gray.svg';
import LinkIcon from '@/public/icon/link.svg';
import NoteIcon from '@/public/icon/note.svg';
import PenIcon from '@/public/icon/pen.svg';

import { CheckedIcon } from './CheckedIcon';

import type { TodoType } from '@/types/todo.type';
import type { QueryClient } from '@tanstack/react-query';

interface TodoItemProps {
  todo: TodoType;
  queryClient: QueryClient;
}

export default function TodoItem({ todo, queryClient }: TodoItemProps) {
  const { setIsTodoCreateModalOpen } = useModalStore((state) => state);
  const { setCreatedTodoState } = useTodoCreateModalStore((state) => state);

  const mutation = useDeleteTodoMutation(queryClient);
  const toggleMutation = useUpdateTodoStatusMutation(queryClient);

  const handleDelete = () => {
    mutation.mutate(todo.id);
  };

  // TODO: 할 일 수정 모달 열림
  const handleOpenEditModal = (todo: any) => {
    setCreatedTodoState({
      ...todo,
      fileName: todo.filePath
    });

    setIsTodoCreateModalOpen(true);
  };

  const handleCheckbox = () => {
    toggleMutation.mutate({ id: todo.id, done: !todo.done });
  };

  const className = PRIORITY_COLORS[todo.priority];

  return (
    <li className="group relative mb-3 flex justify-between">
      <div className="flex items-start gap-2 group-hover:text-[#F86969]">
        <div className="relative mt-[3px] flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={todo.done ?? undefined}
            onChange={handleCheckbox}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-[6px] border border-slate-300 object-contain transition-all checked:border-[#F86969] checked:bg-[#F86969]"
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100">
            <CheckedIcon />
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span
            className={`max-w-52 overflow-hidden truncate text-ellipsis whitespace-nowrap ${todo.done ? 'line-through' : ''}`}
          >
            {todo.title}
          </span>

          {todo.goal?.id && (
            <span className="flex items-center gap-1 whitespace-nowrap text-[13px] text-[#C0C0C0]">
              <FlagIcon />
              {todo.goal.title}
            </span>
          )}
        </div>
      </div>
      <div className="relative flex items-start gap-1">
        {todo.filePath && (
          <span>
            <FileIcon />
          </span>
        )}
        {todo.linkUrl && (
          <span>
            <LinkIcon />
          </span>
        )}
        {todo.noteId && (
          <span>
            <NoteIcon />
          </span>
        )}
        <span
          className={`${className} rounded-full border p-1 px-3 py-0.5 text-[11px] leading-tight`}
        >
          {todo.priority}
        </span>

        {!todo.filePath && (
          <button className="hidden group-focus-within:block group-hover:block group-focus:block">
            <PenIcon />
          </button>
        )}
        <div className="hidden group-hover:block group-focus:block">
          <KebabMenu
            size={18}
            onEdit={() => {
              handleOpenEditModal(todo);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </li>
  );
}
