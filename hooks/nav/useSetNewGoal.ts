import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

export default function useSetNewGoal() {
  const { id } = useInfoStore((state) => state);

  const queryClient = useQueryClient();

  const postNewGoal = async (nowGoal: string) => {
    console.log('postNewGoal', nowGoal);
    const response = await apiWithClientToken.post('/goals', {
      title: nowGoal
    });

    return response;
  };

  const { mutateAsync } = useMutation({
    mutationFn: postNewGoal,
    onSuccess: () => {
      console.log('onsuccess');

      queryClient.invalidateQueries({ queryKey: ['goalList', id] });
      queryClient.refetchQueries({ queryKey: ['goalList', id] });

      toast('등록되었습니다.');
    },
    onError: (error) => {
      // 에러 발생 시 처리할 로직
      console.error('Error adding goal:', error);
    }
  });

  return { mutateAsync };
}
