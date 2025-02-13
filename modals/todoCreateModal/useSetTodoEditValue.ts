import { useLayoutEffect } from 'react';

import { useModalStore } from '@/provider/store-provider';

import type { createModalType } from '@/stores/modalStore';

export default function useSetTodoEditValue(todoId: string | null) {
  const { setTodoCreateModal } = useModalStore((state) => state);
  useLayoutEffect(() => {
    if (todoId) {
      //해당 todoid의 정보 가져오는 로직 추가
      const data: createModalType = {
        goal: {
          id: 1,
          title: '목표 제목 1'
        },
        noteId: 1,
        done: true,
        linkUrl: 'string',
        filePath: '/home/image/sample.jpg',
        title: '할일 제목',
        id: 1,
        userId: 1,
        createdAt: '2025-02-11T08:32:39.993Z',
        updatedAt: '2025-02-11T08:32:39.993Z',
        priority: 1
      };
      setTodoCreateModal(data);
    }
  }, []);
}
