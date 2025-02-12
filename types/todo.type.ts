import type { GoalType } from './goal.type';

export type TodoListType = {
  lastSeenId: number;
  totalCount: number;
  todos: TodoType[];
};

export type TodoType = {
  goal: Pick<GoalType, 'id' | 'title' | 'completionDate'>;
  noteId: number;
  done: boolean;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  priority: number;
};
