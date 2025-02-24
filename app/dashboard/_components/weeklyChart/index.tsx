import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { readTodoList, readTodoProgress } from '@/apis/todo';
import { useCountUp } from '@/hooks/dashboard/useCountUp';
import { getWeeklyCompletionData } from '@/utils/dashboard/getWeeklyCompletionData';
import { calcTotalCompletionPercentage } from '@/utils/percentageUtils';

import Chart from './Chart';

import type { ChartDataType } from './Chart';

export default function WeeklyChart() {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  const { data } = useQuery({ queryKey: ['progress'], queryFn: readTodoProgress });

  const { data: todoData } = useQuery({
    queryKey: ['completedTodos'],
    queryFn: () => readTodoList({ filter: 'Done' }),
    retry: 0
  });

  const completionRate = calcTotalCompletionPercentage({
    todoCount: data?.todoCount,
    completionTodoCount: data?.completionTodoCount
  });

  const count = useCountUp(Number(completionRate), 2000);

  useEffect(() => {
    if (todoData) {
      setTimeout(() => {
        setChartData(getWeeklyCompletionData(todoData.todos));
      }, 300);
    }
  }, [todoData]);

  return (
    <div className="rounded-container">
      <h3 className="h3 mb-4">이번주 평균 달성률</h3>
      <h2 className="mb-6">
        오늘까지 <span className="text-main">{count}%</span> 달성했어요
      </h2>
      <Chart data={chartData} />
    </div>
  );
}
