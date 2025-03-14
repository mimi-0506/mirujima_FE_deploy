import { ISODateString } from './ISODateString.type';
import { ApiResponse } from './apiResponse.type';

export type { ISODateString } from './ISODateString.type'; // 재export
export type { ApiResponse } from './apiResponse.type'; // 재export

export type GoalListType = {
  lastSeenId: number;
  remainingCount: number;
  goals: GoalType[];
};

export type GoalType = {
  id: number;
  userId?: number;
  title: string;
  completionDate: ISODateString | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
};

export type GoalSummary = Pick<GoalType, 'id' | 'title' | 'completionDate'>;

export type UpdateGoalResponse = ApiResponse<GoalType>;
