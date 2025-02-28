import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { GoalListType, GoalType } from '@/types/goal.type';

import { apiWithServerToken } from '.';

export const readGoalFromServer = async (goalId: string) => {
  'use server';
  try {
    const isInvalid = isNaN(Number(goalId));
    if (isInvalid) throw new Error('잘못된 URL');

    const res = await apiWithServerToken.get<ApiResponse<GoalType>>(`/goals/${goalId}`);

    return res.data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      // 추후 에러 처리 추가 예정
    }

    throw error;
  }
};

export const readGoalListFromServer = async () => {
  'use server';
  try {
    const res = await apiWithServerToken.get<ApiResponse<GoalListType>>(`/goals`);

    return res.data.result;
  } catch (e) {
    redirect('/logout');
  }
};
