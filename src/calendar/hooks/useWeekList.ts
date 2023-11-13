import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { DateInfo } from '../api';
import { useCalendarStore } from '../store/calendarStore';

export function useWeekList() {
  const { curDate } = useCalendarStore();
  const [dateList, setDayList] = useState<DateInfo[]>([]);
  useEffect(() => {
    if (!curDate) {
      return;
    }
    const today = dayjs();
    const dateList: DateInfo[] = [];
    const start = curDate?.day(0);
    if (!start) {
      return;
    }
    for (let item = 0; item < 7; item++) {
      const dateItem = start.clone().add(item, 'day');
      dateList.push({
        date: dateItem,
        cur: dateItem.isSame(today, 'date'),
      });
    }
    setDayList(dateList);
  }, [curDate]);

  return dateList;
}
