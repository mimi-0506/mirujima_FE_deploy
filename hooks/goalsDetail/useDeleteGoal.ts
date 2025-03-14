import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { GOAL_DELETE_ERROR, GOAL_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import { GoalType } from '@/types/goal.type';

export function useDeleteGoal() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: async (goalId: number) => {
      await apiWithClientToken.delete(`/goals/${goalId}`);
      return { goalId };
    },
    onMutate: (goalId) => {
      setIsLoading(true);
      return { goalId };
    },
    onSuccess: ({ goalId }: { goalId: number }) => {
      setIsLoading(false);
      queryClient.setQueryData(['goals', userId], (oldGoals: GoalType[]) => {
        if (!oldGoals) return [];
        else return oldGoals.filter((goal: GoalType) => goal.id !== goalId);
      });

      toast.success(GOAL_DELETE_SUCCESS);
    },
    onError: (_err, _) => {
      setIsLoading(false);
      toast.error(GOAL_DELETE_ERROR);
    }
  });
}
