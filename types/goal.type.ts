// todoType.ts 파일의 Goal과 겹침
export type GoalType = {
  id: number;
  userId: number;
  title: string;
  completionDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateGoalType = Pick<GoalType, 'title'>;
