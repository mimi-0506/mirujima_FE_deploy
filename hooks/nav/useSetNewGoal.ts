import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { GOAL_CREATE_SUCCESS } from '@/constant/toastText';
import { useInfoStore } from '@/provider/store-provider';

export default function useSetNewGoal() {
  const userId = useInfoStore((state) => state.userId);

  const queryClient = useQueryClient();

  const postNewGoal = async ({ nowGoal, endDate }: { nowGoal: string; endDate: string }) => {
    const response = await apiWithClientToken.post('/goals', {
      title: nowGoal,
      completionDate: endDate
    });

    return response;
  };

  const { mutateAsync } = useMutation({
    mutationFn: postNewGoal,
    onSuccess: () => {
      console.log('onsuccess');

      queryClient.invalidateQueries({ queryKey: ['goals', userId] });
      queryClient.refetchQueries({ queryKey: ['goals', userId] });

      toast.success(GOAL_CREATE_SUCCESS);
    },
    onError: (error) => {
      // 에러 발생 시 처리할 로직
      console.error('Error adding goal:', error);
    }
  });

  return { mutateAsync };
}
