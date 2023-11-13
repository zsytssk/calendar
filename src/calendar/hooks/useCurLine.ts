import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import { useCalendarStore } from '../store/calendarStore';
import { useGetDaySize } from './useDaySize';

export function useCurLine(
  boxRef: React.RefObject<HTMLDivElement>,
  type: 'day' | 'week',
) {
  const { curDate } = useCalendarStore();
  const size = useGetDaySize();
  const [curLinePos, setCurLinePos] = useState<{ top: number; left: number }>();

  const showCurLine = useMemo(() => {
    return dayjs().isSame(curDate, type);
  }, [curDate, type]);

  useEffect(() => {
    if (!showCurLine) {
      return;
    }
    let timeout: number;
    const fn = () => {
      if (!boxRef?.current) {
        return;
      }
      const now = dayjs();
      const allSecond = 24 * 60 * 60;
      const seconds = now.second();
      const newSecond = now.diff(now.clone().startOf('day'), 'seconds');
      const diffDay = now.day();
      const height = size.height || 0;
      const width = size.width || 0;

      setCurLinePos({
        top: Math.ceil((height * newSecond) / allSecond),
        left: Math.ceil(width * diffDay),
      });

      timeout = setTimeout(fn, (60 - seconds) * 1000) as unknown as number;
    };
    fn();
    return () => clearTimeout(timeout);
  }, [size, showCurLine]);

  return [showCurLine, curLinePos] as [boolean, typeof curLinePos];
}
