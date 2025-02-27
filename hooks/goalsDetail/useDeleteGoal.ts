// hooks/goalsDetail/useDeleteGoal.ts
import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { GOAL_DELETE_ERROR, GOAL_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore } from '@/provider/store-provider';

const deleteGoal = async (goalId: number): Promise<void> => {
  const response = await authApi.delete(`/goals/${goalId}`);
  console.log('삭제 API 응답:', response); // 응답 로그 추가
};

export function useDeleteGoal() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: number) => deleteGoal(goalId),
    onSuccess: (_, goalId) => {
      queryClient.invalidateQueries({ queryKey: ['goal', goalId, userId] });
      queryClient.refetchQueries({ queryKey: ['goal', goalId, userId] });

      toast.dismiss('deleteGoal');
      toast.success(GOAL_DELETE_SUCCESS);
    },
    onError: () => {
      toast.dismiss('deleteGoal');
      toast.error(GOAL_DELETE_ERROR);
    }
  });
}
