import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateGoalVariables) => changeGoalTitle(variables),
    onMutate: async (variables) => {
      const queryKey = ['goalDetail', variables.goalId.toString()];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => ({
        ...old,
        result: {
          ...old?.result,
          title: variables.title
        }
      }));

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['goalDetail', variables.goalId.toString()], context?.previousData);
      console.error('목표 수정 실패', error);
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['goalDetail', variables.goalId.toString()]
      });
    }
  });
}
