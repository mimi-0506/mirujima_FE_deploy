import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { readTodoList } from '@/apis/todo';
import { useCountUp } from '@/hooks/dashboard/useCountUp';
import { useInfoStore } from '@/provider/store-provider';
import { getWeeklyCompletionData } from '@/utils/dashboard/getWeeklyCompletionData';
import { calcTotalCompletionPercentage } from '@/utils/percentageUtils';

import Chart from './Chart';

import type { ChartDataType } from './Chart';
import type { TodoProgressType } from '@/types/todo.type';

export default function WeeklyChart() {
  const { userId } = useInfoStore((state) => state);
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [progressData, setProgressData] = useState(0);
  const count = useCountUp(Number(progressData), 2000);

  useEffect(() => {
    readTodoProgress();
  }, []);

  const readTodoProgress = async () => {
    const response = await apiWithClientToken.get<{ result: TodoProgressType }>('/todos/progress');
    const data = response.data.result;

    const completionRate = calcTotalCompletionPercentage({
      todoCount: data?.todoCount,
      completionTodoCount: data?.completionTodoCount
    });

    setProgressData(completionRate);
  };

  const { data: todoData } = useQuery({
    queryKey: ['allTodos', userId],
    queryFn: () => readTodoList({}),
    retry: 0
  });

  useEffect(() => {
    if (todoData) {
      //필터링 로직 추가 필요
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
