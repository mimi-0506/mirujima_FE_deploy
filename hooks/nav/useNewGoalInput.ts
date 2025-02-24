import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

import useSetNewGoal from './useSetNewGoal';

export default function useSetNewGoalInput(inputRef: RefObject<HTMLInputElement | null>) {
  const [input, setInput] = useState<boolean>(false);

  const { mutateAsync } = useSetNewGoal();
  useEffect(() => {
    if (inputRef.current) {
      if (input) inputRef.current.focus();
      else inputRef.current.value = '';
    }
  }, [input]);

  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const nowGoal = inputRef.current.value;

      if (nowGoal !== '') await mutateAsync(nowGoal);
      setInput(false);
    }
  };

  return { input, setInput, handleInputEnter };
}
