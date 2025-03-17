'use server';

import { notFound } from 'next/navigation';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { GoalListType, GoalType } from '@/types/goal.types';

import { apiWithServerToken } from '.';

export const readGoalFromServer = async (goalId: GoalType['id']) => {
  const isInvalid = isNaN(goalId);
  if (isInvalid) notFound();

  const res = await apiWithServerToken.get<ApiResponse<GoalType>>(`/goals/${goalId}`);

  return res.data?.result;
};

export const readGoalListFromServer = async () => {
  const res = await apiWithServerToken.get<ApiResponse<GoalListType>>('/goals?pageSize=99');

  return res.data?.result;
};
