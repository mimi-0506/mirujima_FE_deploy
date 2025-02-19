'use client';
import { useQueryClient } from '@tanstack/react-query';

import KebabForGoal from '@/components/kebab/KebabForGoal';
import { PRIORITY_COLORS } from '@/constant/priorityColor';
import { useCheckTodo } from '@/hooks/goalsDetail/useCheckTodoStatus';
import { useDeleteTodoItem } from '@/hooks/goalsDetail/useDeleteTodoItem';
import FileIcon from '@/public/icon/file.svg';
import FlagIcon from '@/public/icon/flag-gray.svg';
import LinkIcon from '@/public/icon/link.svg';
import NoteIcon from '@/public/icon/note-s.svg';
import PenIcon from '@/public/icon/pen.svg';

import { CheckedIcon } from '../../todoList/_components/CheckedIcon';

import type { TodoType } from '@/types/todo.type';

interface TodoItemProps {
  todo: TodoType;
  goalId: number;
}

export default function TodoItem({ todo, goalId }: TodoItemProps) {
  const queryClient = useQueryClient();
  const mutation = useDeleteTodoItem();
  const { mutate: toggleTodo } = useCheckTodo();

  const handleCheckbox = () => {
    const updatedTodo = { ...todo, done: !todo.done };
    toggleTodo({
      todo: updatedTodo,
      goalId
    });
  };
  const handleDelete = () => {
    mutation.mutate(todo.id);
  };

  const handleOpenEditModal = () => {
    alert('수정하기');
  };

  const className = PRIORITY_COLORS[todo.priority];

  return (
    <li className="group relative mb-3 flex items-center justify-between last:pb-[47px]">
      <div className="flex min-w-0 flex-1 items-baseline gap-2 text-gray500 group-hover:text-main">
        <div className="relative flex translate-y-[5px] cursor-pointer items-center">
          <input
            type="checkbox"
            checked={todo.done ?? undefined}
            onChange={handleCheckbox}
            className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[6px] border border-gray200 object-contain transition-all checked:border-main checked:bg-main"
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-0 peer-checked:opacity-100">
            <CheckedIcon />
          </span>
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <span className={`truncate ${todo.done ? 'line-through' : ''}`}>{todo.title}</span>
          {todo.goal?.id && (
            <span className="flex items-center gap-1 text-[13px] text-gray350">
              <FlagIcon />
              <span className="min-w-0 flex-1 truncate">{todo.goal.title}</span>
            </span>
          )}
        </div>
      </div>
      <div className="relative mb-6 flex shrink-0 items-start gap-1">
        {todo.filePath && (
          <span>
            <FileIcon width={18} height={18} />
          </span>
        )}
        {todo.linkUrl && (
          <span>
            <LinkIcon width={18} height={18} />
          </span>
        )}
        {todo.noteId && (
          <span>
            <NoteIcon width={18} height={18} />
          </span>
        )}

        <span
          className={`${className} rounded-full border p-1 px-3 py-0.5 text-[11px] leading-tight`}
        >
          {todo.priority}
        </span>

        {!todo.noteId && (
          <button className="hidden group-hover:block group-focus:block">
            <PenIcon />
          </button>
        )}
        <div className="hidden group-hover:block group-focus:block">
          <KebabForGoal size={18} onEdit={handleOpenEditModal} onDelete={handleDelete} />
        </div>
      </div>
    </li>
  );
}
