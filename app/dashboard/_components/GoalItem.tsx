'use client';

import TaskList from '@/components/TaskList/TaskList';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useModalStore } from '@/provider/store-provider';
import PlusIcon from '@/public/icon/plus-border-none.svg';

import type { TodoType } from '@/types/todo.type';

interface GoalItemProps {
  goalId: number;
  title: string;
}

export default function GoalItem({ goalId, title }: GoalItemProps) {
  const { data, isLoading, isError } = useGetGoalDetail(goalId.toString());
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);

  if (isLoading) {
    return (
      <div className="rounded-container w-full p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div>Loading todos...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-container w-full p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div>Failed to fetch detail...</div>
      </div>
    );
  }

  const todos: TodoType[] = data.result.todos;

  return (
    <div className="rounded-container w-full p-6">
      <div className="flex justify-between">
        <h3 className="truncate text-lg font-bold">{title}</h3>
        <button
          onClick={() => {
            setIsTodoCreateModalOpen(true);
          }}
          className="flex flex-shrink-0 items-center pl-1 text-main"
        >
          <PlusIcon /> 할일 추가
        </button>
      </div>

      <div className="my-6 h-2 w-full bg-gray200"></div>
      <div className="mt-3 flex flex-col border-none desktop:flex-row">
        <div className="flex-1 overflow-y-auto">
          <h2 className="z-5 sticky top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
            To do
          </h2>
          <TaskList goalId={goalId} done={false} />
        </div>

        <hr className="my-4 border-t border-dashed border-gray200 desktop:hidden" />

        <div className="mx-6 my-4 hidden translate-y-5 items-center justify-center desktop:flex">
          <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h2 className="z-5 sticky top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
            Done
          </h2>
          <TaskList goalId={goalId} done={true} />
        </div>
      </div>
    </div>
  );
}
