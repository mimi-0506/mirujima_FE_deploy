import { useEffect, useState } from 'react';

import { useTodoCreateModalStore } from '@/provider/store-provider';

export default function useTodoCreateValidCheck() {
  const [allValid, setAllValid] = useState<boolean>(false);
  const title = useTodoCreateModalStore((state) => state.title);
  const goal = useTodoCreateModalStore((state) => state.goal);
  const priority = useTodoCreateModalStore((state) => state.priority);

  useEffect(() => {
    const isFormAllFilled = title !== '' && goal?.title !== '' && priority ? true : false;
    setAllValid(isFormAllFilled);
  }, [title, goal, priority]);

  return { allValid };
}
