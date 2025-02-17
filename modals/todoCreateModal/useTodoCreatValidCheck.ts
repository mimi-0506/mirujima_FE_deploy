import { useEffect, useState } from 'react';

import { useModalStore } from '@/provider/store-provider';

export default function useTodoCreateValidCheck() {
  const [allValid, setAllValid] = useState<boolean>(false);
  const { todoCreateModal } = useModalStore((state) => state);

  useEffect(() => {
    const isFormAllFilled =
      todoCreateModal.title !== '' && todoCreateModal.goal.title !== '' && todoCreateModal.priority
        ? true
        : false;
    setAllValid(isFormAllFilled);
  }, [todoCreateModal]);

  return { allValid };
}
