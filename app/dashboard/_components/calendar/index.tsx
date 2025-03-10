'use client';

import { format } from 'date-fns';

import { WEEK_DAYS } from '@/constant/date';
import useCalendar from '@/hooks/dashboard/useCalendar';
import { useAllTodos } from '@/hooks/todo/useAllTodos';
import { useInfoStore } from '@/provider/store-provider';
import ArrowLeft from '@/public/icon/arrow-left-calendar.svg';
import ArrowRight from '@/public/icon/arrow-right-calendar.svg';
import { getBgColorForGoal } from '@/utils/dashboard/getBgColorForGoal';
import { getCompletedGoalCounts } from '@/utils/dashboard/getCompletedGoalCounts';
import { getGoalIdByTodo } from '@/utils/dashboard/goalUtil';
import { calcGoalCompletionPercentage } from '@/utils/percentageUtils';

import Label from './Label';
import { labelColors } from '@/constant/colors';
import { LabelType } from '@/types/color.type';

export default function Calendar() {
  const userId = useInfoStore((state) => state.userId);
  const { todoData } = useAllTodos(Number(userId));
  const { currentDate, days, firstDayOfWeek, handleClickPrevMonth, handleClickNextMonth } =
    useCalendar();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const completedGoalCount = getCompletedGoalCounts(todoData, currentYear, currentMonth);

  return (
    <div className="rounded-container relative">
      <h4 className="mb-4">이번달 평균 달성률</h4>
      <h3 className="mb-6 text-head3 desktop:text-head2">
        {currentDate.getMonth() + 1}월에는 100%에{' '}
        <span className="text-main">{completedGoalCount}번</span>
        도달했어요!
      </h3>

      <div className="absolute top-1/2 w-full -translate-y-1/2 md:right-5 md:top-6 md:w-5">
        <div className="absolute -left-8 md:left-0 md:right-0">
          <button
            onClick={handleClickPrevMonth}
            className="rounded-lg border bg-white p-3 md:border-none md:p-0"
          >
            <ArrowLeft width="6" className="stroke-black md:stroke-main" />
          </button>
        </div>
        <div className="absolute right-4 md:right-0">
          <button
            onClick={handleClickNextMonth}
            className="rounded-lg border bg-white p-3 md:border-none md:p-0"
          >
            <ArrowRight width="6" className="stroke-black md:stroke-main" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="grid">
          <div className="grid grid-cols-7">
            {WEEK_DAYS.map((day) => {
              return (
                <div key={day} className="mb-3 text-center">
                  {day}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const formattedDay = format(day, 'yyyy-MM-dd');
              const bgColor = getBgColorForGoal(
                todoData,
                formattedDay,
                getGoalIdByTodo,
                calcGoalCompletionPercentage
              );

              return (
                <div
                  key={i}
                  className={
                    'flex-center relative z-10 mx-1 mb-2 w-full text-body2 desktop:text-body1'
                  }
                  style={i === 0 ? { gridColumnStart: firstDayOfWeek } : {}}
                >
                  <span
                    className={`${bgColor} flex-center relative -z-10 h-8 w-8 rounded-full text-center desktop:h-12 desktop:w-12`}
                  >
                    {format(day, 'd')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ul className="mt-4 flex items-center gap-3">
        {Object.keys(labelColors).map((label) => (
          <Label key={label} label={label as LabelType} />
        ))}
      </ul>
    </div>
  );
}
