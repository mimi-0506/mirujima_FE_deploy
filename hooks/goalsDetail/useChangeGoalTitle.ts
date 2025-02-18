import { useMutation, useQueryClient } from '@tanstack/react-query';
import authApi from '@/apis/clientActions/authApi';

interface UpdateGoalVariables {
  goalId: number;
  title: string;
  completionDate?: string;
}

interface UpdateGoalResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    id: number;
    userId: number;
    title: string;
    completionDate?: string;
    createdAt: string;
    updatedAt: string;
  };
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

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['goalDetail', variables.goalId] });
    },
    onError: (error) => {
      console.error('목표 수정 실패', error);
    }
  });
}
