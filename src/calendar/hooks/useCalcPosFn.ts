import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { OverlayDataItem } from '../api';

// 重叠的宽度
const overlayWidth = 10;
export function useCalcPosFn(boxRef: React.RefObject<HTMLDivElement>) {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (!boxRef?.current) {
      return;
    }
    const fn = () => setState((old) => old + 1);

    window.addEventListener('resize', fn);
    fn();
    return () => window.removeEventListener('resize', fn);
  }, [boxRef]);

  return useCallback(
    (date?: Dayjs, data?: OverlayDataItem) => {
      if (!boxRef?.current || !state || !date || !data) {
        return;
      }

      const bounds = boxRef?.current.getBoundingClientRect();
      const allSecond = 24 * 60 * 60;
      let startSecond = dayjs(data.start).diff(
        dayjs(date).startOf('day'),
        'seconds',
      );
      let endSecond = dayjs(data.end).diff(
        dayjs(date).startOf('day'),
        'seconds',
      );
      if (endSecond < 0 || startSecond > allSecond) {
        return;
      }
      if (startSecond < 0) {
        startSecond = 0;
      }
      if (endSecond > allSecond) {
        endSecond = allSecond;
      }
      const dayWidth = bounds.width;
      const itemWidth = (dayWidth - overlayWidth) / data.overlayNum;
      const width = itemWidth + overlayWidth;
      const left = data.overlayIndex * itemWidth;
      return {
        left: left,
        right: dayWidth - left - width,
        top: Math.ceil((bounds.height * startSecond) / allSecond),
        bottom: Math.ceil(
          bounds.height * ((allSecond - endSecond) / allSecond),
        ),
      };
    },
    [boxRef, state],
  );
}
