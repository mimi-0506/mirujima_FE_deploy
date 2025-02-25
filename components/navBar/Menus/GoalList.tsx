import { useEffect, useRef, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import useScrollUpdate from '@/hooks/nav/useScrollUpdate';
import useGetGoalList from '@/hooks/useGetGoalList';
import { useModalStore } from '@/provider/store-provider';
import LoadingIcon from '@/public/icon/spin.svg';

import AddIcon from '../../../public/icon/add.svg';
import FlagIcon from '../../../public/icon/flag-black.svg';

export default function GoalList() {
  const { setIsGoalCreateModalOpen, setIsLoading } = useModalStore((state) => state);
  const { data: goals, isFetching, isLoading } = useGetGoalList();
  const goalListRef = useRef<HTMLUListElement | null>(null);

  useScrollUpdate(goalListRef, goals);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  const handleLinkClick = (href: string) => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      <div className="mt-6 box-border flex h-12 items-center gap-2 rounded-[8px] bg-Cgray px-[21px] py-[17px] text-gray500">
        <div className="flex gap-2">
          <FlagIcon />
          목표
        </div>
      </div>
      <ul
        ref={goalListRef}
        className="scrollbar-thin relative mb-10 mt-4 max-h-[200px] min-h-[100px] list-inside gap-2 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1"
      >
        {isFetching || isLoading ? (
          <LoadingIcon className="aspect-auto w-[100px]" />
        ) : (
          goals.map((goal: any) => {
            return (
              <li key={goal.id} className="p-2">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleLinkClick(`/goals/${goal.id}`);
                  }}
                >
                  • {goal.title}
                </div>
              </li>
            );
          })
        )}
      </ul>

      <button
        className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[8px] border-[1px] border-main text-main transition-all duration-300 ease-in-out"
        onClick={() => setIsGoalCreateModalOpen(true)}
      >
        <AddIcon />새 목표
      </button>
    </>
  );
}
