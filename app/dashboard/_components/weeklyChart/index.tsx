'use client';

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/components/loading/LoadingSpinner';
import { useCountUp } from '@/hooks/dashboard/useCountUp';
import { useAllTodos } from '@/hooks/todo/useAllTodos';
import { useInfoStore } from '@/provider/store-provider';
import { getWeeklyCompletionData } from '@/utils/dashboard/getWeeklyCompletionData';
import { calcTotalCompletionPercentage } from '@/utils/percentageUtils';

import Chart from './Chart';

import type { ChartDataType } from './Chart';
import { readTodoProgress } from '@/apis/clientActions/todo';

export default function WeeklyChart() {
  const userId = useInfoStore((state) => state.userId);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [progressData, setProgressData] = useState(0);
  const count = useCountUp(progressData, 2000);

  const fetchAllTodoProgress = async () => {
    const data = await readTodoProgress();

    const completionRate = calcTotalCompletionPercentage({
      todoCount: data?.todoCount,
      completionTodoCount: data?.completionTodoCount
    });

    setProgressData(completionRate);
  };

  const { todoData, isLoading } = useAllTodos(Number(userId));

  useEffect(() => {
    if (todoData) {
      const timeoutId = setTimeout(() => {
        setChartData(getWeeklyCompletionData(todoData));
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [todoData]);

  useEffect(() => {
    fetchAllTodoProgress();
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
