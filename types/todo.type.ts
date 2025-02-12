import type { GoalType } from './goal.type';

export type TodoListType = {
  lastSeenId: number;
  totalCount: number;
  todos: TodoType[];
};

export type TodoType = {
  goal: Pick<GoalType, 'id' | 'title'>;
  noteId: number | null;
  done: boolean | null;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  priority: number;
};
