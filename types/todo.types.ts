import { Priority } from './color.types';
import type { ISODateString } from './goal.types';
import type { GoalSummary } from './goal.types';
import type { ApiResponse } from './apiResponse.type';
export type TodoListType = {
  lastSeenId: number;
  remainingCount: number;
  todos: TodoType[];
};

export type TodoType = {
  goal: GoalSummary | null;
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  completionDate: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  priority: Priority;
};

export type TodoProgressType = Partial<{
  todoCount: number;
  completionTodoCount: number;
}>;

export type EditableTodo = TodoType & {
  fileName?: string | null;
  isEdit: boolean;
};
export type TodoListResponse = ApiResponse<TodoListType>;
