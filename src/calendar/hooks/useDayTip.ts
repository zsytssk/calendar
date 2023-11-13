import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { CalendarType } from '../api';
import { WeekArr } from '../config/config';

export function useDayTip(type?: CalendarType, date?: Dayjs) {
  return useMemo(() => {
    if (type !== 'day') {
      return;
    }

    const diffDay = date?.startOf('day').diff(dayjs().startOf('day'), 'day');
    if (diffDay === -2) {
      return '前天';
    }
    if (diffDay === -1) {
      return '昨天';
    }
    if (diffDay === 0) {
      return '今天';
    }
    if (diffDay === 1) {
      return '明天';
    }
    if (diffDay === 2) {
      return '后天';
    }
    return WeekArr[date?.day() || 0];
  }, [date, type]);
}
