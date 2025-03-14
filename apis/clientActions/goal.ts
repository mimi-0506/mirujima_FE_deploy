import type { GoalListType } from '@/types/goal.types';

import { apiWithClientToken } from '.';

const GOAL_SIZE = 3;

export const readGoalList = async ({
  lastSeenId,
  pageSize = GOAL_SIZE
}: {
  lastSeenId?: number;
  pageSize?: number;
}): Promise<GoalListType> => {
  const response = await apiWithClientToken.get<{
    result: GoalListType;
  }>('/goals', {
    params: { lastSeenId, pageSize }
  });

  return response.data.result;
};
