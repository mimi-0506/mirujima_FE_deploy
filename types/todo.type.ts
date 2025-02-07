export type TodoResponseType = {
  noteId: number;
  done: boolean;
  linkUrl: string;
  fileUrl: string;
  title: string;
  id: number;
  goal: {
    id: number;
    title: string;
  };
  userId: number;
  teamId: string;
  updatedAt: string;
  createdAt: string;
};
