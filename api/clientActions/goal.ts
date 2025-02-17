import type { GaolListType } from '@/types/goal.type';

import { apiWithClientToken } from '.';

export const readGoalList = async ({
  pageParam = 9999,
  pageSize = 40
}: {
  pageParam?: number;
  pageSize?: number;
}): Promise<GaolListType> => {
  const response = await apiWithClientToken.get<{
    result: GaolListType;
  }>('/goals', {
    params: { lastSeenId: pageParam, pageSize }
  });

  return response.data.result;
};
