'use client';

import React from 'react';

import KebabMenu from '@/components/kebab/KebabMenu';

interface Props {
  goalId: number;
}

export default function EditGoal({ goalId }: Props) {
  const onEdit = () => {};
  const onDelete = () => {};
  return (
    <>
      <KebabMenu
        size={24}
        onEdit={onEdit}
        onDelete={onDelete}
        editText="목표 수정"
        deleteText="목표 삭제"
      />
    </>
  );
}
