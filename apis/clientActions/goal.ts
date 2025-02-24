import type { GoalListType } from '@/types/goal.type';

import { apiWithClientToken } from '.';

export const readGoalList = async ({
  pageParam = 9999,
  pageSize = 40
}: {
  pageParam?: number;
  pageSize?: number;
}): Promise<GoalListType> => {
  const response = await apiWithClientToken.get<{
    result: GoalListType;
  }>('/goals', {
    params: { lastSeenId: pageParam, pageSize }
  });

  return response.data.result;
};
