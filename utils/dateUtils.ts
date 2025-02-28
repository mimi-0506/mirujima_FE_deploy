import { WEEK_DAYS } from '@/constant/date';

export const getUpcomingDates = (days: number) => {
  const today = new Date();
  const upcomingDates = [];

  for (let i = 0; i < days; i++) {
    const nextDay = new Date();

    nextDay.setDate(today.getDate() + i);

    upcomingDates.push({
      date: nextDay.getDate(),
      day: WEEK_DAYS[(nextDay.getDay() + 6) % 7]
    });
  }

  return upcomingDates;
};

export const getFormattedTime = () => {
  const now = new Date();

  // 연도 4자리
  const year = now.getFullYear();

  // 월(2자리)
  const month = (now.getMonth() + 1).toString().padStart(2, '0');

  // 일(2자리)
  const day = now.getDate().toString().padStart(2, '0');

  // 시간(2자리)
  const hours = now.getHours().toString().padStart(2, '0');

  // 분(2자리)
  const minutes = now.getMinutes().toString().padStart(2, '0');

  // 초(2자리)
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // 최종 포맷
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

/**
 * ISO 형식의 날짜 문자열을 점(.)으로 구분된 날짜 형식으로 변환합니다.
 * 예: "2025-02-26T14:30:00" -> "2025.02.26"
 * @param val ISO 형식의 날짜 문자열
 * @returns 점으로 구분된 날짜 문자열, 오류 발생 시 빈 문자열('') 반환
 */
export const dateFormatWithDots = (val: string) => {
  try {
    const [date, time] = val.split('T');
    const dotFormat = date.replaceAll('-', '.');

    return dotFormat;
  } catch (error) {
    return '';
  }
};
