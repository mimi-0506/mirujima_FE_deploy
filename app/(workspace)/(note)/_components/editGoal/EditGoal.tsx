'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import KebabForGoal from '@/components/kebab/KebabForGoal';
import { useUpdateGoalTitle } from '@/hooks/goalsDetail/useChangeGoalTitle';
import { useDeleteGoal } from '@/hooks/goalsDetail/useDeleteGoal';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useModalStore } from '@/provider/store-provider';
import { useInfoStore } from '@/provider/store-provider';

interface Props {
  goalId: number;
}

export default function EditGoal({ goalId }: Props) {
  const router = useRouter();
  const { restoreUser } = useInfoStore((state) => state);

  const { data: goalData, isLoading, isError } = useGetGoalDetail(goalId.toString());
  const goalTitle = goalData?.result?.title ?? '목표 제목이 없어요';

  const [isMounted, setIsMounted] = useState(false);
  const [editedTitle, setEditedTitle] = useState(goalTitle);

  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const { mutate: updateGoalTitle } = useUpdateGoalTitle();
  const setGoalDeleteModalOpen = useModalStore((state) => state.setGoalDeleteModalOpen);
  const setGoalEditModalOpen = useModalStore((state) => state.setGoalEditModalOpen);

  useEffect(() => {
    restoreUser();
    setIsMounted(true);
  }, [restoreUser]);

  useEffect(() => {
    setEditedTitle(goalTitle);
  }, [goalTitle]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !goalData) return <div>목표 정보를 불러오는데 실패했습니다.</div>;

  return (
    <>
      <KebabForGoal
        className="flex-shrink-0"
        size={24}
        onEdit={() => {
          setGoalEditModalOpen(true, {
            onConfirm: (newTitle) => {
              if (!goalId) return;
              const trimmedTitle = newTitle.trim();
              if (trimmedTitle === '') {
                setEditedTitle(goalTitle);
                return;
              }
              updateGoalTitle(
                { goalId, title: trimmedTitle },
                {
                  onSuccess: () => {
                    setGoalEditModalOpen(false);
                    setEditedTitle(trimmedTitle);
                  },
                  onError: () => setEditedTitle(goalTitle)
                }
              );
            },
            onCancel: () => {
              setGoalEditModalOpen(false);
              setEditedTitle(goalTitle);
            },
            initialValue: goalTitle
          });
        }}
        onDelete={() => {
          setGoalDeleteModalOpen(true, {
            onConfirm: () => {
              if (!goalId) return;
              deleteGoalMutate(goalId, {
                onSuccess: () => {
                  setGoalDeleteModalOpen(false);
                  router.push('/dashboard');
                }
              });
            },
            onCancel: () => setGoalDeleteModalOpen(false)
          });
        }}
      />
    </>
  );
}
