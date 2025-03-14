'use client';

import React from 'react';

import useGoalActions from '@/hooks/goal/useGoalActions';
import KebabMenu from '@/components/kebab/KebabMenu';
import { GoalType } from '@/types/goal.types';

interface Props {
  goalId: GoalType['id'];
  goalTitle: GoalType['title'];
}

export default function EditGoal({ goalId, goalTitle }: Props) {
  const { handleEdit, handleDelete } = useGoalActions(goalId, goalTitle);

  return <KebabMenu size={24} onEdit={handleEdit} onDelete={handleDelete} />;
}
