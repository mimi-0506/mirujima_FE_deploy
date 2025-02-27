import { useState } from 'react';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  subMonths
} from 'date-fns';

export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDayOfMonth = startOfMonth(currentDate);
  const endDayOfMonth = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDayOfMonth, end: endDayOfMonth });
  const firstDayOfWeek = getDay(startDayOfMonth);

  const handleClickPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleClickNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return {
    currentDate,
    days,
    firstDayOfWeek,
    handleClickPrevMonth,
    handleClickNextMonth
  };
}
