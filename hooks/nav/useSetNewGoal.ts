import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { GOAL_CREATE_SUCCESS } from '@/constant/toastText';
import { useInfoStore } from '@/provider/store-provider';

export default function useSetNewGoal() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ nowGoal, endDate }: { nowGoal: string; endDate: string }) => {
      const response = await apiWithClientToken.post('/goals', {
        title: nowGoal,
        completionDate: endDate
      });
      return response;
    },
    onSuccess: () => {
      toast.success(GOAL_CREATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['goals', userId] });
    },
    onError: (error, _) => {
      console.error('Error adding goal:', error);
    }
  });

  return { mutateAsync };
}
