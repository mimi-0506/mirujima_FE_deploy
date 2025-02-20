import { useEffect, useState } from 'react';

import { useTodoCreateModalStore } from '@/provider/store-provider';

export default function useTodoCreateValidCheck() {
  const [allValid, setAllValid] = useState<boolean>(false);
  const { title, goal, priority } = useTodoCreateModalStore((state) => state);

  useEffect(() => {
    const isFormAllFilled = title !== '' && goal?.title !== '' && priority ? true : false;
    setAllValid(isFormAllFilled);
  }, [title, goal, priority]);

  return { allValid };
}
