`use client`;

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { SMALL_MAX } from '@/constant/screen';
import useResize from '@/hooks/useResize';

export default function Goals() {
  const [goals, setGoals] = useState<string[]>([
    '자바스크립트로 웹 서비스 만들기',
    '디자인 시스템 강의 듣기'
  ]);
  const [input, setInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input && inputRef.current) inputRef.current.focus();
  }, [input]);

  const { screenSize } = useResize();
  const [isSmall, setIsSmall] = useState<boolean>(true);

  useLayoutEffect(() => {
    if (screenSize <= SMALL_MAX) setIsSmall(true);
    else setIsSmall(false);
  }, [screenSize]);

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

  return (
    <div>
      <div className="flex justify-between">
        <div>목표</div>
        {isSmall && <button onClick={() => setInput(true)}>새 목표</button>}
      </div>
      <ul>
        {goals.map((goal) => {
          return (
            <li key={goal}>
              <Link href={'/'}>{goal}</Link>
            </li>
          );
        })}
      </ul>
      {!isSmall && <button onClick={() => setInput(true)}>새 목표</button>}
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
