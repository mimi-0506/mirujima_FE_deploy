export type TodoList = {
  todos: Todo[];
  nextCursor: null;
  totalCount: number;
};

export type Todo = {
  noteId: null;
  done: boolean;
  linkUrl: null;
  fileUrl: null;
  title: string;
  id: number;
  goal: Goal;
  userId: number;
  teamId: string;
  updatedAt: Date;
  createdAt: Date;
};

export type Goal = {
  title: string;
  id: number;
};
