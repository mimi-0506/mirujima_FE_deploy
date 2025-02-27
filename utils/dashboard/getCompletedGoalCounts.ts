import { getGoalTodos } from './goalUtil';

import type { TodoType } from '@/types/todo.type';

export const getCompletedGoalCounts = (todos: TodoType[], year: number, month: number) => {
  // 해당 월에 완료된 todos 필터링
  const filteredTodos = todos.filter((todo) => {
    if (!todo.goal?.completionDate) return false;

    const completionDate = new Date(todo.goal.completionDate);
    return completionDate.getFullYear() === year && completionDate.getMonth() === month;
  });

  // 중복 제거된 goal 목록
  const goals = new Set(filteredTodos.map((todo) => todo.goal?.id));

  // 모든 todo가 완료된 goal 개수 계산
  const completedGoalCount = Array.from(goals).filter((goalId) => {
    const goal = getGoalTodos(todos, goalId);
    const hasTodos = goal.length > 0;
    const allTodosCompleted = goal.every((todo) => todo.done);
    return hasTodos && allTodosCompleted;
  }).length;

  return completedGoalCount;
};
