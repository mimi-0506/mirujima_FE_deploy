'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GoalIcon from '@/public/icon/todo-list-black.svg';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useInfoStore } from '@/provider/store-provider';
import GoalDeleteConfirmModal from '@/components/modal/GoalDeleteConfirmModal';
import Button from '../_components/Button';
import TaskList from '../_components/TaskList';
import KebabForGoal from '@/components/kebab/KebabForGoal';

export default function GoalDetailPage() {
  const router = useRouter();
  const { restoreUser } = useInfoStore((state) => state);
  const params = useParams();
  const goalIdParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const goalId = goalIdParam ? parseInt(goalIdParam, 10) : null;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    console.log('수정하기 버튼 클릭됨');
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirm = () => {
    console.log('삭제 확인: 모달에서 삭제 실행');
    setIsDeleteModalOpen(false);
  };

  const handleCancel = () => {
    console.log('삭제 취소: 모달 닫힘');
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);
  const goalIdString = goalId ? goalId.toString() : '';
  const {
    data: goalData,
    isLoading: isGoalDetailLoading,
    isError: isGoalDetailError
  } = useGetGoalDetail(goalIdString);

  if (!goalId) {
    return <div>유효하지 않은 목표입니다.</div>;
  }

  if (isGoalDetailLoading) {
    return <div>로딩 중...</div>;
  }

  if (isGoalDetailError || !goalData) {
    return <div>목표 정보를 불러오는데 실패했습니다.</div>;
  }

  const goalTitle: string = goalData?.result?.title ?? '목표 제목이 없어요';

  return (
    // <main className="flex h-screen justify-center bg-gray100 px-4 py-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
    <section className="flex min-h-[262px] w-full max-w-[1284px] flex-col gap-6 md:pt-4">
      <h2 className="flex h-[28px] w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GoalIcon />
          {goalTitle}
        </div>
        <KebabForGoal size={24} onEdit={handleEdit} onDelete={handleDelete} />{' '}
        {isDeleteModalOpen && (
          <GoalDeleteConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />
        )}
      </h2>

      <Button onClick={() => router.push(`/noteList/${goalId}`)}>노트 모아보기</Button>

      <div className="flex rounded-[16px] border border-gray200 bg-white p-6 shadow-sm">
        <div className="h-[260px] flex-1 overflow-y-auto">
          <TaskList title="To do" goalId={goalId} done={false} />
        </div>

        <div className="mx-6 flex translate-y-5 items-center justify-center">
          <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
        </div>

        <div className="h-[260px] flex-1 overflow-y-auto">
          <TaskList title="Done" goalId={goalId} done={true} />
        </div>
      </div>
    </section>
    // </main>
  );
}
