'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { primaryColors } from '@/constant/colors';
import { useCheckTodo } from '@/hooks/goalsDetail/useCheckTodoStatus';
import { useModalStore } from '@/provider/store-provider';
import { useTodoCreateModalStore } from '@/provider/store-provider';
import FileIcon from '@/public/icon/file.svg';
import FlagIcon from '@/public/icon/flag-gray.svg';
import LinkIcon from '@/public/icon/link.svg';
import NoteIcon from '@/public/icon/note-s.svg';
import PenIcon from '@/public/icon/pen.svg';

import { CheckedIcon } from '../../app/(workspace)/todoList/_components/CheckedIcon';
import { GoalType } from '@/types/goal.types';
import type { TodoType, EditableTodo } from '@/types/todo.types';
import { Priority } from '@/types/color.types';
import { useTodoFileDownload } from '@/hooks/todo/useTodoFileDownload';

import KebabMenu from '../kebab/KebabMenu';
import { useDeleteTodoItem } from '@/hooks/goalsDetail/useDeleteTodoItem';

interface TodoItemProps {
  todo: TodoType;
  goalId?: GoalType['id'] | null;
  showGoal?: boolean;
  isDashboard?: boolean;
}

export default function TodoItem({ todo, showGoal, isDashboard }: TodoItemProps) {
  const router = useRouter();
  const { setCreatedTodoState } = useTodoCreateModalStore((state) => state);
  const { mutate: toggleTodo } = useCheckTodo();
  const { mutate: deleteTodoMutate } = useDeleteTodoItem();
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const aTagRef = useRef<HTMLAnchorElement | null>(null);
  const handleClickFileDownload = useTodoFileDownload();
  const setIsTodoDeleteConfirmModalOpen = useModalStore(
    (state) => state.setIsTodoDeleteConfirmModalOpen
  );

  const handleNoteIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/notes/${todo.noteId}`, { scroll: false });
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

    toggleTodo({ todo: updatedTodo });
  };
  const handleOpenEditModal = (todo: TodoType): void => {
    const editableTodo: EditableTodo = {
      ...todo,
      fileName: todo.filePath,
      isEdit: true,
      linkUrl: todo.linkUrl
    };
    setCreatedTodoState(editableTodo);
    setIsTodoCreateModalOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsTodoDeleteConfirmModalOpen(true, {
      onConfirm: () => {
        deleteTodoMutate(todo, {
          onSuccess: () => {
            setIsTodoDeleteConfirmModalOpen(false);
          }
        });
      },
      onCancel: () => setIsTodoDeleteConfirmModalOpen(false)
    });
  };

  const priorityClass = primaryColors[todo.priority as Priority];

  const isGoalVisible = showGoal && todo.goal?.id;

  return (
    <div
      className={`group relative mb-4 grid grid-cols-4 items-center justify-between ${isGoalVisible ? 'grid-rows-2' : 'grid-rows-1'}`}
    >
      <div
        className={
          'col-start-1 col-end-4 flex flex-1 items-baseline gap-2 group-focus-within:text-main group-hover:text-main'
        }
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

      <ul className="relative flex shrink-0 items-center justify-end gap-1">
        {todo.filePath && (
          <li>
            <a
              ref={aTagRef}
              onClick={(e) => {
                e.preventDefault();
                handleClickFileDownload(todo.filePath || '');
              }}
              className="cursor-pointer"
              aria-label="파일 다운로드"
              rel="noopener noreferrer"
              title={`파일 다운로드: ${todo.filePath.split('/').pop() || '파일'}`}
            >
              <FileIcon width={18} height={18} />
            </a>
          </li>
        )}
        {todo.linkUrl?.startsWith('http') && (
          <li>
            <a
              href={todo.linkUrl}
              target="_blank"
              aria-label="관련 링크 열기"
              rel="noopener noreferrer"
              title={todo.linkUrl}
            >
              <LinkIcon width={18} height={18} />
            </a>
          </li>
        )}
        {todo.noteId && (
          <li onClick={handleNoteIconClick} className="cursor-pointer">
            <NoteIcon width={18} height={18} />
          </li>
        )}
        <li className={`${priorityClass} rounded-full border p-1 px-3 py-0.5 text-small`}>
          {todo.priority}
        </li>
        {!todo.noteId && !isDashboard && (
          <li className="-ml-6 opacity-0 transition-all group-focus-within:ml-0 group-focus-within:opacity-100 group-hover:ml-0 group-hover:opacity-100">
            <PenIcon
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={handlePenIconClick}
            />
          </li>
        )}
        {!isDashboard && (
          <li className="-ml-6 opacity-0 transition-all group-focus-within:ml-0 group-focus-within:opacity-100 group-hover:ml-0 group-hover:opacity-100">
            <KebabMenu
              size={18}
              onEdit={() => handleOpenEditModal(todo)}
              onDelete={handleOpenDeleteModal}
            />
          </li>
        )}
      </ul>
      {isGoalVisible && (
        <span className="col-start-1 -col-end-1 flex items-center gap-1 truncate pl-5 text-body2 text-gray350">
          <FlagIcon />
          <span className="min-w-0 flex-1 truncate">{todo?.goal?.title}</span>
        </span>
      )}
    </div>
  );
}
