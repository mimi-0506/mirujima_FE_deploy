import { useLayoutEffect } from 'react';

import Link from 'next/link';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import GoalList from './GoalList';
import DashboardIcon from '../../../public/icon/dashboard-gray.svg';
import NoteListIcon from '../../../public/icon/nav-note-list.svg';
import TodoListIcon from '../../../public/icon/nav-todo-list.svg';

export default function Menus() {
  const { userId, setInfo } = useInfoStore((state) => state);

  useLayoutEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfo = async () => {
    const { data } = await apiWithClientToken.get('/user');

    setInfo({
      userId: data.id,
      email: data.email,
      name: data.username,
      profileImage: data.profileImagePath
    });
  };

  return (
    <div className="mt-8">
      <div className="box-border flex h-12 items-center gap-2 rounded-[8px] bg-white px-[21px] py-[17px] text-gray350">
        <Link href="/dashboard" className="flex gap-2">
          <DashboardIcon width="24" height="24" />
          대시보드
        </Link>
      </div>

      <div className="flex flex-col gap-[17px] px-[21px] py-[17px] text-gray400">
        <Link href="/todoList" className="flex items-center gap-[6px]">
          <TodoListIcon /> <p>할 일 모아보기</p>
        </Link>
        <Link href="/noteList" className="flex items-center gap-[6px]">
          <NoteListIcon /> <p>노트 모아보기</p>
        </Link>
      </div>

      <GoalList />
    </div>
  );
}
