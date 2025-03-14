import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import type { GoalType, ISODateString } from '@/types/goal.types';
import type { ApiResponse } from '@/types/apiResponse.type';

interface UpdateGoalVariables {
  goalId: GoalType['id'];
  title: GoalType['title'];
  completionDate?: ISODateString;
}

type UpdateGoalResponse = ApiResponse<GoalType>;

export function useUpdateGoalTitle() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ goalId, title, completionDate }: UpdateGoalVariables) => {
      await apiWithClientToken.patch<UpdateGoalResponse>(`/goals/${goalId}`, {
        title,
        completionDate
      });
      return { goalId, title };
    },
    onMutate: ({ goalId, title }) => {
      return { goalId, title };
    },
    onError: (error) => {
      console.error('목표 수정 실패', error);
    },
    onSuccess: async ({ goalId, title }: { goalId: number; title: string }) => {
      await queryClient.setQueryData(['goal', goalId, userId], () => {
        return { result: { title: title } };
      });

      await queryClient.setQueryData(['goals', userId], (cache: GoalType[]) => {
        console.log(cache);
        const newGoals = cache.map((item: GoalType) => {
          if (item.id === goalId) return { ...item, title: title };
          else return item;
        });

        return newGoals;
      });
    },
    onSettled: (_, __, { goalId }) => {
      queryClient.invalidateQueries({
        queryKey: ['goal', goalId, userId],
        refetchType: 'all'
      });
    }
  });
}
