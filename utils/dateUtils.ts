import { WEEK_DAYS } from '@/constant/date';

export const getUpcomingDates = (days: number) => {
  const today = new Date();
  const upcomingDates = [];

  for (let i = 0; i < days; i++) {
    const nextDay = new Date();

    nextDay.setDate(today.getDate() + i);

    upcomingDates.push({
      date: nextDay.getDate(),
      day: WEEK_DAYS[nextDay.getDay()]
    });
  }

  return upcomingDates;
};
