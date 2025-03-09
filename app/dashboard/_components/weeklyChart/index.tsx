'use client';

import { useEffect, useState } from 'react';

import { apiWithClientToken } from '@/apis/clientActions';
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { useCountUp } from '@/hooks/dashboard/useCountUp';
import { useAllTodos } from '@/hooks/todo/useAllTodos';
import { useInfoStore } from '@/provider/store-provider';
import { getWeeklyCompletionData } from '@/utils/dashboard/getWeeklyCompletionData';
import { calcTotalCompletionPercentage } from '@/utils/percentageUtils';

import Chart from './Chart';

import type { ChartDataType } from './Chart';
import type { TodoProgressType } from '@/types/todo.type';

export default function WeeklyChart() {
  const userId = useInfoStore((state) => state.userId);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [progressData, setProgressData] = useState(0);
  const count = useCountUp(Number(progressData), 2000);

  const readTodoProgress = async () => {
    const response = await apiWithClientToken.get<{ result: TodoProgressType }>('/todos/progress');
    const data = response.data.result;

    const completionRate = calcTotalCompletionPercentage({
      todoCount: data?.todoCount,
      completionTodoCount: data?.completionTodoCount
    });

    setProgressData(completionRate);
  };

  const { todoData, isLoading } = useAllTodos(Number(userId));

  useEffect(() => {
    if (todoData) {
      setTimeout(() => {
        setChartData(getWeeklyCompletionData(todoData));
      }, 300);
    }

    readTodoProgress();
  }, [todoData]);

  return (
    <div className="rounded-container flex flex-col">
      <h4 className="mb-4">이번주 평균 달성률</h4>
      <h3 className="mb-6 text-head3 desktop:text-head2">
        오늘까지 <span className="text-main">{count}%</span> 달성했어요
      </h3>
      {isLoading ? <LoadingSpinner size={40} /> : <Chart data={chartData} />}
    </div>
  );
}
