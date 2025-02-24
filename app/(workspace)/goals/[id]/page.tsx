'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import KebabForGoal from '@/components/kebab/KebabForGoal';
import TaskList from '@/components/TaskList/TaskList';
import { useUpdateGoalTitle } from '@/hooks/goalsDetail/useChangeGoalTitle';
import { useDeleteGoal } from '@/hooks/goalsDetail/useDeleteGoal';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useModalStore } from '@/provider/store-provider';
import { useInfoStore } from '@/provider/store-provider';
import GoalIcon from '@/public/icon/todo-list-black.svg';
import Button from '../_components/Button';

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

  const setGoalDeleteModalOpen = useModalStore((state) => state.setGoalDeleteModalOpen);
  const setGoalEditModalOpen = useModalStore((state) => state.setGoalEditModalOpen);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  useEffect(() => {
    if (!isEditing) {
      setEditedTitle(goalTitle);
    }
  }, [goalTitle, isEditing]);

  const handleEdit = () => {
    setGoalEditModalOpen(true, {
      onConfirm: handleEditConfirm,
      onCancel: handleEditCancel,
      initialValue: goalTitle
    });
  };

  const handleEditConfirm = (newTitle: string) => {
    if (!goalId) return;

    const trimmedTitle = newTitle.trim();
    if (trimmedTitle === '') {
      setEditedTitle(goalTitle);
      return;
    }

    updateGoalTitle(
      {
        goalId,
        title: trimmedTitle
      },
      {
        onSuccess: () => {
          setGoalEditModalOpen(false);
          setEditedTitle(trimmedTitle);
        },
        onError: () => {
          setEditedTitle(goalTitle);
        }
      }
    );
  };

  const handleEditCancel = () => {
    setGoalEditModalOpen(false);
    setEditedTitle(goalTitle);
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
        setGoalDeleteModalOpen(false);
        router.push('/dashboard');
      }
    });
  };

  const handleCancel = () => {
    setGoalDeleteModalOpen(false);
  };

  // 탭 상태: 'todo' | 'done'
  const [activeTab, setActiveTab] = useState<'todo' | 'done'>('todo');

  if (!goalId) return <div>유효하지 않은 목표입니다.</div>;
  if (isLoading) return <div>로딩중</div>;
  if (isError || !goalData) return <div>목표 정보를 불러오는데 실패했습니다.</div>;

  return (
    <section className="flex min-h-[262px] w-full max-w-[1284px] flex-col gap-6 md:pt-4">
      {/* 목표 타이틀 영역 */}
      <h2 className="flex w-full items-center gap-2">
        <GoalIcon className="flex-shrink-0" />

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
              className="w-full truncate border-b border-gray200 text-lg font-bold outline-none"
            />
          ) : (
            <span className="block w-full truncate text-lg font-bold">{editedTitle}</span>
          )}
        </div>

        <KebabForGoal
          className="flex-shrink-0"
          size={24}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </h2>

      {/* 노트 모아보기 버튼 */}
      <Button onClick={() => router.push(`/noteList/${goalId}`)}>노트 모아보기</Button>

      {/*
        1) 모바일/태블릿(= md 이하)에서는 탭 UI로 전환
        2) 데스크톱(= md 이상)에서는 기존 2열 레이아웃 유지
      */}

      {/* 모바일/태블릿 전용 탭 메뉴 */}
      <div className="block md:hidden">
        <div className="flex justify-center space-x-4">
          <button
            className={`border-b-2 px-4 py-2 ${
              activeTab === 'todo' ? 'border-main' : 'border-transparent'
            }`}
            onClick={() => setActiveTab('todo')}
          >
            To do
          </button>
          <button
            className={`border-b-2 px-4 py-2 ${
              activeTab === 'done' ? 'border-main' : 'border-transparent'
            }`}
            onClick={() => setActiveTab('done')}
          >
            Done
          </button>
        </div>

        {activeTab === 'todo' && (
          <div className="mt-4">
            <TaskList title="To do" goalId={goalId} done={false} />
          </div>
        )}
        {activeTab === 'done' && (
          <div className="mt-4">
            <TaskList title="Done" goalId={goalId} done={true} />
          </div>
        )}
      </div>

      <div className="hidden flex-col rounded-2xl border border-gray200 bg-white p-6 shadow-sm md:flex md:flex-row">
        <div className="flex-1 overflow-y-auto">
          <TaskList title="To do" goalId={goalId} done={false} />
        </div>

        <hr className="my-4 border-t border-dashed border-gray200 md:hidden" />

        <div className="mx-6 my-4 hidden translate-y-5 items-center justify-center md:flex">
          <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TaskList title="Done" goalId={goalId} done={true} />
        </div>
      </div>
    </section>
  );
}
