'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import KebabForGoal from '@/components/kebab/KebabForGoal';
import { useUpdateGoalTitle } from '@/hooks/goalsDetail/useChangeGoalTitle';
import { useDeleteGoal } from '@/hooks/goalsDetail/useDeleteGoal';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

interface Props {
  goalId: number;
}

export default function EditGoal({ goalId }: Props) {
  const router = useRouter();
  const { restoreUser } = useInfoStore((state) => state);
  const { data: goalData } = useGetGoalDetail(goalId.toString());
  const goalTitle = goalData?.result?.title ?? '목표 제목이 없어요';

  const [editedTitle, setEditedTitle] = useState(goalTitle);
  console.log(editedTitle);

  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const { mutate: updateGoalTitle } = useUpdateGoalTitle();
  const setGoalDeleteModalOpen = useModalStore((state) => state.setGoalDeleteModalOpen);
  const setGoalEditModalOpen = useModalStore((state) => state.setGoalEditModalOpen);
  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  useEffect(() => {
    setEditedTitle(goalTitle);
  }, [goalTitle]);

  const handleEditConfirm = useCallback(
    (newTitle: string) => {
      if (!goalId) return;
      const trimmedTitle = newTitle.trim();
      if (!trimmedTitle) {
        setEditedTitle(goalTitle);
        return;
      }
      updateGoalTitle(
        { goalId, title: trimmedTitle },
        {
          onSuccess: () => {
            setGoalEditModalOpen(false);
            setEditedTitle(trimmedTitle);

            router.refresh();
          },
          onError: () => setEditedTitle(goalTitle)
        }
      );
    },
    [goalId, goalTitle, updateGoalTitle, setGoalEditModalOpen]
  );

  const handleEditCancel = useCallback(() => {
    setGoalEditModalOpen(false);
    setEditedTitle(goalTitle);
  }, [goalTitle, setGoalEditModalOpen]);

  const handleEdit = useCallback(() => {
    setGoalEditModalOpen(true, {
      onConfirm: handleEditConfirm,
      onCancel: handleEditCancel,
      initialValue: goalTitle
    });
  }, [goalTitle, handleEditConfirm, handleEditCancel, setGoalEditModalOpen]);

  const handleDeleteConfirm = useCallback(() => {
    if (!goalId) return;
    deleteGoalMutate(goalId, {
      onSuccess: () => {
        setGoalDeleteModalOpen(false);
        router.push('/dashboard');
      }
    });
  }, [goalId, deleteGoalMutate, router, setGoalDeleteModalOpen]);

  const handleDeleteCancel = useCallback(() => {
    setGoalDeleteModalOpen(false);
  }, [setGoalDeleteModalOpen]);

  const handleDelete = useCallback(() => {
    setGoalDeleteModalOpen(true, {
      onConfirm: handleDeleteConfirm,
      onCancel: handleDeleteCancel
    });
  }, [handleDeleteConfirm, handleDeleteCancel, setGoalDeleteModalOpen]);

  return (
    <KebabForGoal className="flex-shrink-0" size={24} onEdit={handleEdit} onDelete={handleDelete} />
  );
}
