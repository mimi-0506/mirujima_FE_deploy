import type { GoalType } from './goal.type';

export type TodoListType = {
  lastSeenId: number;
  remainingCount: number;
  todos: TodoType[];
};

export type TodoType = {
  goal: Pick<GoalType, 'id' | 'title' | 'completionDate'>;
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  completionDate: string;
  createdAt: string;
  updatedAt: string;
  priority: number;
};

export type TodoProgressType = {
  todoCount?: number;
  completionTodoCount?: number;
};
