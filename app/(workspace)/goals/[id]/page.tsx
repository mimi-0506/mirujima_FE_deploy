'use client';
import React, { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import KebabForGoal from '@/components/kebab/KebabForGoal';
import { useUpdateGoalTitle } from '@/hooks/goalsDetail/useChangeGoalTitle';
import { useDeleteGoal } from '@/hooks/goalsDetail/useDeleteGoal';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useModalStore } from '@/provider/store-provider';
import { useInfoStore } from '@/provider/store-provider';
import GoalIcon from '@/public/icon/todo-list-black.svg';

import Button from '../_components/Button';
import TaskList from '../_components/TaskList';

export default function GoalDetailPage() {
  const router = useRouter();
  const { restoreUser } = useInfoStore((state) => state);
  const params = useParams();
  const goalIdParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const goalId = goalIdParam ? parseInt(goalIdParam, 10) : null;
  const goalIdString = goalId ? goalId.toString() : '';
  const { data: goalData, isLoading, isError } = useGetGoalDetail(goalIdString);
  const goalTitle: string = goalData?.result?.title ?? '목표 제목이 없어요';
  const { mutate: updateGoalTitle } = useUpdateGoalTitle();
  const { mutate: deleteGoalMutate } = useDeleteGoal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(goalTitle);
  // const isDeleteModalOpen = useModalStore((state) => state.isGoalDeleteModalOpen);
  const setGoalDeleteModalOpen = useModalStore((state) => state.setGoalDeleteModalOpen);
  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  useEffect(() => {
    if (!isEditing) {
      setEditedTitle(goalTitle);
    }
  }, [goalTitle, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && goalId) {
      e.preventDefault();
      const newTitle = editedTitle.trim();
      if (newTitle === '') {
        setEditedTitle(goalTitle);
        return;
      }

      updateGoalTitle(
        {
          goalId,
          title: newTitle
        },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
          onError: () => {
            setEditedTitle(goalTitle);
          }
        }
      );
    }
  };

  const handleDelete = () => {
    setGoalDeleteModalOpen(true, {
      onConfirm: handleConfirm,
      onCancel: handleCancel
    });
  };

  const handleConfirm = () => {
    if (!goalId) return;
    deleteGoalMutate(goalId, {
      onSuccess: () => {
        // 삭제 후 모달 닫기
        setGoalDeleteModalOpen(false);
        router.push('/dashboard');
      }
    });
  };

  const handleCancel = () => {
    setGoalDeleteModalOpen(false);
  };

  if (!goalId) return <div>유효하지 않은 목표입니다.</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !goalData) return <div>목표 정보를 불러오는데 실패했습니다.</div>;

  return (
    <section className="flex min-h-[262px] w-full max-w-[1284px] flex-col gap-6 md:pt-4">
      <h2 className="flex w-full items-center gap-2">
        <GoalIcon className="flex-shrink-0" />

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full truncate border-b border-gray200 text-lg font-bold outline-none"
            />
          ) : (
            <span className="block w-full truncate text-lg font-bold">{editedTitle}</span>
          )}
        </div>

        {/* 오른쪽 케밥 메뉴: 줄어들지 않도록 flex-shrink-0 */}
        <KebabForGoal
          className="flex-shrink-0"
          size={24}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </h2>

      <Button onClick={() => router.push(`/noteList/${goalId}`)}>노트 모아보기</Button>
      <div className="flex flex-col rounded-2xl border border-gray200 bg-white p-6 shadow-sm desktop:flex-row">
        <div className="flex-1 overflow-y-auto">
          <TaskList title="To do" goalId={goalId} done={false} />
        </div>

        <hr className="my-4 border-t border-dashed border-gray200 desktop:hidden" />

        <div className="mx-6 my-4 hidden translate-y-5 items-center justify-center desktop:flex">
          <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TaskList title="Done" goalId={goalId} done={true} />
        </div>
      </div>
    </section>
  );
}
