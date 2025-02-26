// hooks/goalsDetail/useDeleteGoal.ts
import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

const deleteGoal = async (goalId: number): Promise<void> => {
  await authApi.delete(`/goals/${goalId}`);
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
      toast.success('목표가 삭제되었습니다!');
    },
    onError: () => {
      toast.dismiss('deleteGoal');
      toast.error('목표 삭제 실패했습니다.');
    }
  });
}
