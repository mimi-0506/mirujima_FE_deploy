'use client';

import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import TaskList from '@/components/TaskList/TaskList';
import type { TodoType } from '@/types/todo.type';

interface GoalItemProps {
  goalId: number;
  title: string;
}

export default function GoalItem({ goalId, title }: GoalItemProps) {
  // 1) goalId로 상세 정보( todos ) 받아오기
  const { data, isLoading, isError } = useGetGoalDetail(goalId.toString());

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
  const todoList = todos.filter((todo) => !todo.isDone);
  const doneList = todos.filter((todo) => todo.isDone);

  return (
    <div className="rounded-container w-full p-4">
      <h3 className="text-lg font-bold">{title}</h3>

      {/* 미완료 목록 */}
      <TaskList title="To do" goalId={goalId} done={false} tasks={todoList} />

      {/* 완료 목록 */}
      <TaskList title="Done" goalId={goalId} done={true} tasks={doneList} />
    </div>
  );
}
