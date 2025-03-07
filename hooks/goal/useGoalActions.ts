import { useModalStore } from '@/provider/store-provider';
import { useRouter } from 'next/navigation';
import { useDeleteGoal } from '../goalsDetail/useDeleteGoal';
import { useUpdateGoalTitle } from '../goalsDetail/useChangeGoalTitle';
import toast from 'react-hot-toast';
import { GOAL_EDIT_ERROR, GOAL_EDIT_SUCCESS } from '@/constant/toastText';

const useGoalActions = (goalId: number, goalTitle: string) => {
  const router = useRouter();

  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const { mutate: updateGoalTitle } = useUpdateGoalTitle();
  const setGoalDeleteModalOpen = useModalStore((state) => state.setGoalDeleteModalOpen);
  const setGoalEditModalOpen = useModalStore((state) => state.setGoalEditModalOpen);

  const handleEdit = () => {
    setGoalEditModalOpen(true, {
      onConfirm: (newTitle: string) => {
        const trimmedTitle = newTitle.trim();
        if (!trimmedTitle) return;

        updateGoalTitle(
          { goalId, title: trimmedTitle },
          {
            onSuccess: () => {
              setGoalEditModalOpen(false);
              router.refresh();
              toast.success(GOAL_EDIT_SUCCESS);
            },
            onError: () => toast.error(GOAL_EDIT_ERROR)
          }
        );
      },
      onCancel: () => setGoalEditModalOpen(false),
      initialValue: goalTitle
    });
  };

  const handleDelete = () => {
    setGoalDeleteModalOpen(true, {
      onConfirm: () => {
        deleteGoalMutate(goalId, {
          onSuccess: () => {
            setGoalDeleteModalOpen(false);
            router.push('/dashboard');
          }
        });
      },
      onCancel: () => setGoalDeleteModalOpen(false)
    });
  };

  return { handleEdit, handleDelete };
};

export default useGoalActions;
