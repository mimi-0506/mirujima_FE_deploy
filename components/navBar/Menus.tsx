`use client`;

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import AddIcon from '../../public/icon/add.svg';
import DashboardIcon from '../../public/icon/dashboard-gray.svg';
import FlagIcon from '../../public/icon/flag-black.svg';

export default function Menus() {
  const [goals, setGoals] = useState<string[]>([
    '자바스크립트로 웹 서비스 만들기',
    '디자인 시스템 강의 듣기',
    '자바스크립트로 웹 서비스 만들기',
    '디자인 시스템 강의 듣기',
    '자바스크립트로 웹 서비스 만들기',
    '디자인 시스템 강의 듣기',
    '자바스크립트로 웹 서비스 만들기',
    '디자인 시스템 강의 듣기',
    '자바스크립트로 웹 서비스 만들기',
    '디자인 시스템 강의 듣기'
  ]);

  const [input, setInput] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input && inputRef.current) inputRef.current.focus();
  }, [input]);

  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const nowGoal = inputRef.current.value;

      //목표 등록 로직 차후 추가
      if (nowGoal !== '') {
        setGoals((x) => [...x, nowGoal]);
        setInput(false);
        inputRef.current.value = '';
      }
    }
  };

  const NewGoalButton = () => {
    return (
      <button
        className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[8px] border-[1px] border-main text-main transition-all duration-300 ease-in-out"
        onClick={() => setInput(true)}
      >
        <AddIcon />새 목표
      </button>
    );
  };

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
        {/* {isSmallScreen && <NewGoalButton />} */}
      </div>
      <ul className="scrollbar-thin mb-10 mt-4 max-h-[272px] list-inside gap-2 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
        {goals.map((goal, index) => {
          return (
            <li key={index} className="p-2">
              <Link href={'/'}>• {goal}</Link>
            </li>
          );
        })}
      </ul>
      <NewGoalButton />
      {input && (
        <input
          ref={inputRef}
          type="text"
          placeholder="목표를 입력해 주세요"
          onKeyDown={handleInputEnter}
        />
      )}
    </div>
  );
}
