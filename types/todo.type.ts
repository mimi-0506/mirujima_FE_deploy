import type { GoalType } from './goal.type';

export type TodoType = {
  goal: Pick<GoalType, 'id' | 'title'>;
  noteId: number;
  done: boolean;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};
