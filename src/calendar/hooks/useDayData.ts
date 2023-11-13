import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { CalendarType, DataItem } from '../api';
import { layoutWeekCrossDay } from '../utils/layoutWeekCrossDay';

export function useInDayData(
  type: CalendarType,
  date?: Dayjs,
  dataList: DataItem[] = [],
) {
  return useMemo(() => {
    if (!date || !dataList?.length) {
      return [];
    }
    const list = dataList
      ?.filter((item) => {
        let ignore =
          date.startOf(type).isAfter(item.end) ||
          date.endOf(type).isBefore(item.start);

        if (ignore) {
          return false;
        }
        ignore = dayjs(item.end).endOf('day').diff(item.start, 'day') >= 1;

        return !ignore;
      })
      .sort((a, b) => {
        const aNum = a.isCreate ? 1 : 0;
        const bNum = b.isCreate ? 1 : 0;
        return bNum - aNum;
      });
    return list;
  }, [date, dataList, type]);
}

export function useContainDayData(
  type: CalendarType,
  date?: Dayjs,
  dataList: DataItem[] = [],
) {
  return useMemo(() => {
    if (!date || !dataList?.length) {
      return [];
    }
    const list = dataList?.filter((item) => {
      const ignore =
        date.startOf(type).isAfter(item.end) ||
        date.endOf(type).isBefore(item.start);

      return !ignore;
    });
    return list;
  }, [date, dataList, type]);
}

export function useCrossDayData(
  type: CalendarType,
  date?: Dayjs,
  dataList: DataItem[] = [],
  layout = true,
) {
  return useMemo(() => {
    if (!date || !dataList?.length) {
      return [];
    }
    const list = dataList?.filter((item) => {
      let ignore =
        date.startOf(type).isAfter(item.end) ||
        date.endOf(type).isBefore(item.start);

      if (ignore) {
        return false;
      }
      // 跨天的不在下面展示
      ignore = dayjs(item.end).endOf('day').diff(item.start, 'day') < 1;

      return !ignore;
    });
    if (!layout) {
      return list;
    }
    return layoutWeekCrossDay(date, list);
  }, [date, dataList, type, layout]);
}
