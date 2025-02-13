'use client';
import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useInfoStore } from '@/stores/infoStore';
import Button from '../_components/Button';
import TaskList from '../_components/TaskList';
import { useGetGoalDetail } from '@/hooks/useGetGoalDetail';

interface Todo {
  goal: {
    id: number;
    title: string;
    completionDate: string | null;
  };
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  priority: number;
}

export default function GoalDetailPage() {
  const router = useRouter();
  const { restoreUser } = useInfoStore();

  // 🔥 `goalId` 대신 `id` 사용
  const params = useParams();
  const goalId = Array.isArray(params.id) ? params.id[0] : params.id;
  console.log('🔥 goalId:', goalId); // ✅ 7 출력됨

  const { data, isLoading, isError, error } = useGetGoalDetail(goalId);

  useEffect(() => {
    restoreUser();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) {
    console.error(error);
    return <div>데이터 로딩 에러가 발생했습니다.</div>;
  }

  const todos: Todo[] = data?.result?.todos ?? [];
  const goalTitle: string = data?.result?.title ?? '목표 제목이 없어요';

  const toDoTasks: string[] = todos.filter((todo) => !todo.done).map((todo) => todo.title);
  const doneTasks: string[] = todos.filter((todo) => todo.done).map((todo) => todo.title);

  return (
    <main className="flex h-screen justify-center overflow-y-scroll bg-gray100 px-4 py-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <section className="flex w-full min-w-[262px] max-w-[1284px] flex-col gap-6 md:pt-4">
        <h2 className="flex h-[28px] w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/icon/todo-list-black.svg"
              alt="목표 아이콘"
              height={24}
              width={24}
              className="h-[24px] w-[24px]"
            />
            {goalTitle}
          </div>
        </h2>

        <Button onClick={() => router.push('/noteList')}>노트 모아보기</Button>

        <div className="flex rounded-[16px] border border-gray200 bg-white p-6 shadow-sm">
          <TaskList title="To do" tasks={toDoTasks} />

          <div className="mx-6 flex translate-y-5 items-center justify-center">
            <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
          </div>

          <TaskList title="Done" tasks={doneTasks} />
        </div>
      </section>
    </main>
  );
}
