import { useEffect, useLayoutEffect } from 'react';

import Link from 'next/link';

import { apiWithClientToken } from '@/api/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import NewGoalButton from './NewGoalButton';
import useGetGoalList from './useGetGoalList';
import DashboardIcon from '../../../public/icon/dashboard-gray.svg';
import FlagIcon from '../../../public/icon/flag-black.svg';

export default function Menus() {
  const { id, setInfo } = useInfoStore((state) => state);
  const { ref, data, isLoading, isFetchingNextPage } = useGetGoalList();

  useLayoutEffect(() => {
    console.log('id', id);
    if (!id) getInfo();
  }, [id]);

  const getInfo = async () => {
    const { data } = await apiWithClientToken.get('/user');

    setInfo({ id: data.id, email: data.email, name: data.userName });
  };

  useEffect(() => {
    console.log('data', data, data?.pages.length);
  }, [data]);

  return (
    <div className="mt-8">
      <div className="box-border flex h-12 items-center gap-2 rounded-[8px] bg-white px-[21px] py-[17px] text-gray350">
        <Link href="/dashboard" className="flex gap-2">
          <DashboardIcon />
          대시보드
        </Link>
      </div>

      <div className="box-border flex h-12 items-center gap-2 rounded-[8px] bg-Cgray px-[21px] py-[17px] text-gray500">
        <div className="flex gap-2">
          <FlagIcon />
          목표
        </div>
      </div>
      <ul className="scrollbar-thin relative mb-10 mt-4 max-h-[272px] min-h-[100px] list-inside gap-2 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
        {data?.pages.map((page: any) => {
          return page.data.map((goal: any, index: number) => {
            return (
              <li key={goal.id} className="p-2">
                <Link href={'/'}>• {goal.title}</Link>
              </li>
            );
          });
        })}

        {isLoading || isFetchingNextPage
          ? 'Loading...'
          : data?.pages[0].data.length > 7 && ( //현재 크기에 7개부터 스크롤 생김. 임의의 숫자..
              <div ref={ref} className="relative bottom-0 h-[1px] w-full border border-black" />
            )}
      </ul>
      <NewGoalButton />
    </div>
  );
}
