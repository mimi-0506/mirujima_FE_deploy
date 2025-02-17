'use client';
import { useRef } from 'react';

import useSetNewGoalInput from './useNewGoalInput';
import AddIcon from '../../../public/icon/add.svg';

export default function NewGoalButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { input, setInput, handleInputEnter } = useSetNewGoalInput(inputRef);

  return (
    <>
      <button
        className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[8px] border-[1px] border-main text-main transition-all duration-300 ease-in-out"
        onClick={() => setInput(true)}
      >
        <AddIcon />새 목표
      </button>
      {input && (
        <input
          ref={inputRef}
          type="text"
          placeholder="목표를 입력해 주세요"
          onKeyDown={handleInputEnter}
        />
      )}
    </>
  );
}
