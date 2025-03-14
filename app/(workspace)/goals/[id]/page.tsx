'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import KebabForGoal from '@/components/kebab/KebabForGoal';
import TaskList from '@/components/TaskList/TaskList';
import { useUpdateGoalTitle } from '@/hooks/goalsDetail/useChangeGoalTitle';
import { useDeleteGoal } from '@/hooks/goalsDetail/useDeleteGoal';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import Loading from '@/modals/loadingOverlay/Loading';
import { useModalStore, useTodoCreateModalStore } from '@/provider/store-provider';
import PlusIcon from '@/public/icon/plus-border-none.svg';
import SpinIcon from '@/public/icon/spin.svg';
import GoalIcon from '@/public/icon/todo-list-black.svg';
import Button from '../_components/Button';
import useIsLargeScreen from '@/hooks/nav/useIsLargeScreen';

export default function GoalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const goalIdParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const initialGoalId = goalIdParam ? parseInt(goalIdParam, 10) : null;
  const { isLargeScreen } = useIsLargeScreen();

  const fixedGoalId = useState(initialGoalId)[0];

  const { data: goalData, isLoading, isError } = useGetGoalDetail(fixedGoalId as number);

  const goalTitle = goalData?.result?.title ?? '목표 제목이 없어요';
  const { mutate: updateGoalTitle } = useUpdateGoalTitle();
  const { mutate: deleteGoalMutate } = useDeleteGoal();

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    setIsEditing(false);
  }, []);

  const [editedTitle, setEditedTitle] = useState(goalTitle);
  const [activeTab, setActiveTab] = useState<'todo' | 'done'>('todo');
  const [isNavigating, setIsNavigating] = useState(false);

  const [isPending, startTransition] = useTransition();

  const setGoalDeleteModalOpen = useModalStore((state) => state.setGoalDeleteModalOpen);
  const setGoalEditModalOpen = useModalStore((state) => state.setGoalEditModalOpen);
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const setCreatedTodoState = useTodoCreateModalStore((state) => state.setCreatedTodoState);

  useEffect(() => {
    setEditedTitle(goalTitle);
  }, [goalTitle]);

  const handleEditConfirm = useCallback(
    (newTitle: string) => {
      if (!fixedGoalId) return;

      const trimmedTitle = newTitle.trim();
      if (trimmedTitle === '') {
        setEditedTitle(goalTitle);
        return;
      }

      const previousTitle = editedTitle;
      setEditedTitle(trimmedTitle);
      setGoalEditModalOpen(false);

      updateGoalTitle(
        { goalId: fixedGoalId, title: trimmedTitle },
        {
          onSuccess: () => {
            console.log('제목 수정 성공!');
          },
          onError: () => {
            setEditedTitle(previousTitle);
            alert('제목 수정에 실패했습니다. 다시 시도해주세요.');
          }
        }
      );
    },
    [fixedGoalId, editedTitle, updateGoalTitle, setGoalEditModalOpen, goalTitle]
  );

  const handleEditCancel = useCallback(() => {
    setGoalEditModalOpen(false);
  }, [setGoalEditModalOpen]);

  const handleEdit = useCallback(() => {
    setGoalEditModalOpen(true, {
      onConfirm: handleEditConfirm,
      onCancel: handleEditCancel,
      initialValue: editedTitle
    });
  }, [editedTitle, handleEditConfirm, handleEditCancel, setGoalEditModalOpen]);

  const handleDeleteConfirm = useCallback(() => {
    if (!fixedGoalId) return;
    deleteGoalMutate(fixedGoalId, {
      onSuccess: () => {
        setGoalDeleteModalOpen(false);
        router.push('/dashboard');
      }
    });
  }, [fixedGoalId, deleteGoalMutate, router, setGoalDeleteModalOpen]);

  const handleDeleteCancel = useCallback(() => {
    setGoalDeleteModalOpen(false);
  }, [setGoalDeleteModalOpen]);

  const handleDelete = useCallback(() => {
    setGoalDeleteModalOpen(true, {
      onConfirm: handleDeleteConfirm,
      onCancel: handleDeleteCancel
    });
  }, [handleDeleteConfirm, handleDeleteCancel, setGoalDeleteModalOpen]);

  const handleTabChange = useCallback((tab: 'todo' | 'done') => {
    setActiveTab(tab);
  }, []);

  const handleNoteListClick = useCallback(() => {
    if (!fixedGoalId) return;
    setIsNavigating(true);
    startTransition(() => {
      router.push(`/noteList/${fixedGoalId}`);
      setIsNavigating(false);
    });
  }, [fixedGoalId, router, startTransition]);

  const handleAddTodo = useCallback(() => {
    if (fixedGoalId) setCreatedTodoState({ goal: { id: fixedGoalId } });
    setIsTodoCreateModalOpen(true);
  }, [fixedGoalId, setCreatedTodoState, setIsTodoCreateModalOpen]);

  if (!fixedGoalId) return <div>유효하지 않은 목표입니다.</div>;
  if (isLoading || isNavigating || isPending)
    return (
      <div>
        <Loading />
      </div>
    );

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
              autoFocus
              className="w-full truncate border-b border-gray200 text-lg font-bold outline-none"
            />
          ) : (
            <span className="block w-full truncate text-lg font-bold">
              {isError ? '목표 정보를 불러오지 못했습니다' : editedTitle}
            </span>
          )}
        </div>
        <KebabForGoal
          className="flex-shrink-0"
          size={24}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </h2>
      <Button onClick={handleNoteListClick}>
        {isNavigating || isPending ? <SpinIcon /> : '노트 모아보기'}
      </Button>
      <div className="flex min-h-[70vh] flex-col rounded-2xl border border-gray200 bg-white shadow-sm desktop:flex-row desktop:rounded-2xl desktop:p-6">
        <div className="flex rounded-t-lg desktop:hidden">
          <div className="flex h-[52px] w-full items-center rounded-lg border-b border-gray200 border-transparent px-4">
            <button
              className={`relative min-w-[71px] py-4 text-center text-body1 ${
                activeTab === 'todo' ? 'font-medium text-black' : 'text-Gray500'
              }`}
              onClick={() => handleTabChange('todo')}
            >
              To do
              {activeTab === 'todo' && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-main"></div>
              )}
            </button>
            <button
              className={`relative min-w-[80px] py-4 text-center text-body1 ${
                activeTab === 'done' ? 'font-medium text-black' : 'text-Gray500'
              }`}
              onClick={() => handleTabChange('done')}
            >
              Done
              {activeTab === 'done' && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-main"></div>
              )}
            </button>
            <div className="flex-grow"></div>
            {activeTab === 'todo' && (
              <button onClick={handleAddTodo} className="flex items-center text-main">
                <PlusIcon /> 할일 추가
              </button>
            )}
          </div>
        </div>
        <div
          className={`flex-1 p-4 desktop:p-0 ${
            activeTab === 'todo' ? 'block' : 'hidden desktop:block'
          }`}
        >
          {isLargeScreen && (
            <h2 className="z-5 top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
              To do
            </h2>
          )}
          <TaskList goalId={fixedGoalId} done={false} fixedGoalId={fixedGoalId} />
        </div>
        <div className="mx-6 my-4 hidden translate-y-5 items-center justify-center desktop:flex">
          <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
        </div>
        <div
          className={`flex-1 p-4 desktop:p-0 ${
            activeTab === 'done' ? 'block' : 'hidden desktop:block'
          }`}
        >
          {isLargeScreen && (
            <h2 className="z-5 top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
              Done
            </h2>
          )}
          <TaskList goalId={fixedGoalId} done={true} fixedGoalId={fixedGoalId} />
        </div>
      </div>
      {(isLoading || isNavigating || isPending) && <Loading />}
    </section>
  );
}
