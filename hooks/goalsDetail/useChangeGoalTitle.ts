import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

import type { GoalType } from '@/types/goal.type';
interface UpdateGoalVariables {
  goalId: number;
  title: string;
  completionDate?: string;
}

interface UpdateGoalResponse {
  success: boolean;
  code: number;
  message: string;
  result: GoalType;
}

const changeGoalTitle = async ({
  goalId,
  title,
  completionDate
}: UpdateGoalVariables): Promise<UpdateGoalResponse> => {
  const { data } = await authApi.patch<UpdateGoalResponse>(`/goals/${goalId}`, {
    title,
    completionDate
  });
  return data;
};

export function useUpdateGoalTitle() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateGoalVariables) => changeGoalTitle(variables),
    onMutate: async ({ goalId, title }) => {
      const queryKey = ['goal', goalId, userId];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => ({
        ...old,
        result: {
          ...old?.result,
          title: title
        }
      }));

      return { previousData };
    },
    onError: (error, { goalId }, context) => {
      queryClient.setQueryData(['goal', goalId, userId], context?.previousData);
      console.error('목표 수정 실패', error);
    },
    onSettled: (_, __, { goalId }) => {
      queryClient.invalidateQueries({
        queryKey: ['goal', goalId, userId]
      });
    }
  });
}
