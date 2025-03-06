'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import KebabForGoal from '@/components/kebab/KebabForGoal';
import { PRIORITY_COLORS } from '@/constant/priorityColor';
import { useCheckTodo } from '@/hooks/goalsDetail/useCheckTodoStatus';
import { useDeleteTodoItem } from '@/hooks/goalsDetail/useDeleteTodoItem';
import { useModalStore } from '@/provider/store-provider';
import { useTodoCreateModalStore } from '@/provider/store-provider';
import FileIcon from '@/public/icon/file.svg';
import FlagIcon from '@/public/icon/flag-gray.svg';
import LinkIcon from '@/public/icon/link.svg';
import NoteIcon from '@/public/icon/note-s.svg';
import PenIcon from '@/public/icon/pen.svg';

import { CheckedIcon } from '../../app/(workspace)/todoList/_components/CheckedIcon';

import type { TodoType } from '@/types/todo.type';

interface TodoItemProps {
  todo: TodoType;
  goalId?: number;
  showGoal?: boolean;
  isDashboard?: boolean;
}

export default function TodoItem({ todo, goalId, showGoal, isDashboard }: TodoItemProps) {
  const router = useRouter();
  const { setCreatedTodoState } = useTodoCreateModalStore((state) => state);
  const mutation = useDeleteTodoItem(goalId);
  const { mutate: toggleTodo } = useCheckTodo();
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const setNoteDetailPageOpen = useModalStore((state) => state.setNoteDetailPageOpen);

  // 1) 케밥 메뉴 열림/닫힘 상태
  const [isKebabSelected, setIsKebabSelected] = useState(false);
  // 2) 마우스 hover 상태
  const [isHovered, setIsHovered] = useState(false);

  const handleNoteIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setNoteDetailPageOpen(true, {
      params: Promise.resolve({ id: String(todo.noteId) }),
      onClose: () => setNoteDetailPageOpen(false)
    });
  };

  const handlePenIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/notes/create/${todo.id}`);
  };

  const handleCheckbox = () => {
    const isDone = !todo.done;
    const updatedTodo = {
      ...todo,
      done: isDone,
      completionDate: isDone ? new Date().toISOString() : null
    };

    const goalId = todo?.goal?.id;
    if (goalId) toggleTodo({ todo: updatedTodo, goalId });
  };

  const handleDelete = () => {
    mutation.mutate(todo.id);
  };

  const handleOpenEditModal = (todo: any) => {
    setCreatedTodoState({ ...todo, fileName: todo.filePath, isEdit: true });
    setIsTodoCreateModalOpen(true);
  };

  const handleKebabClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsKebabSelected((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsKebabSelected(false);
    };

    if (isKebabSelected) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isKebabSelected]);

  const priorityClass = PRIORITY_COLORS[todo.priority];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    if (!isKebabSelected) {
      setIsHovered(false);
    }
  };

  const isGoalVisible = showGoal && todo.goal?.id;

  return (
    <>
      <div
        className={`relative mb-4 grid grid-cols-4 items-center justify-between ${isGoalVisible ? 'grid-rows-2' : 'grid-rows-1'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`col-start-1 col-end-4 flex flex-1 items-baseline gap-2 ${
            isHovered || isKebabSelected ? 'text-main' : 'text-gray500'
          }`}
        >
          <div className="relative flex translate-y-[3px] cursor-pointer">
            <input
              type="checkbox"
              checked={todo.done ?? undefined}
              onChange={handleCheckbox}
              className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[6px] border border-gray200 transition-all checked:border-main checked:bg-main"
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
              <CheckedIcon />
            </span>
          </div>

          <h4 className={`truncate py-0.5 ${todo.done ? 'line-through' : ''} `}>{todo.title}</h4>
        </div>

        <div className="relative flex shrink-0 items-center justify-end gap-1">
          <div className="flex flex-row gap-1 py-[1px]">
            {todo.filePath && <FileIcon width={18} height={18} />}
            {todo.linkUrl && <LinkIcon width={18} height={18} />}
            {todo.noteId && (
              <span onClick={handleNoteIconClick} className="cursor-pointer">
                <NoteIcon width={18} height={18} />
              </span>
            )}
          </div>
          <span
            className={`${priorityClass} rounded-full border p-1 px-3 py-0.5 text-[11px] leading-[13px]`}
          >
            {todo.priority}
          </span>
          {!todo.noteId && !isDashboard && (
            <button
              onClick={handlePenIconClick}
              className={isHovered || isKebabSelected ? 'block' : 'hidden'}
            >
              <PenIcon width={18} height={18} />
            </button>
          )}
          {!isDashboard && (
            <div
              className={isHovered || isKebabSelected ? 'block' : 'hidden'}
              onClick={handleKebabClick}
            >
              <KebabForGoal
                size={18}
                onEdit={() => handleOpenEditModal(todo)}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
        {isGoalVisible && (
          <span className="col-start-1 -col-end-1 flex items-center gap-1 truncate pl-5 text-body2 text-gray350">
            <FlagIcon />
            <span className="min-w-0 flex-1 truncate">{todo?.goal?.title}</span>
          </span>
        )}
      </div>
    </>
  );
}
