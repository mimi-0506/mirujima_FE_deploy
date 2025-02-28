export type GoalListType = {
  lastSeenId: number;
  remainingCount: number;
  goals: GoalType[];
};

export type GoalType = {
  id: number;
  userId: number;
  title: string;
  completionDate: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateGoalType = Pick<GoalType, 'title'>;
