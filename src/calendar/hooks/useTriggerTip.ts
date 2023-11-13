import { useMemo } from 'react';

import { CalendarType } from '../api';

export function useTriggerTip(type?: CalendarType) {
  return useMemo(() => {
    if (type === 'day') {
      return ['往前一天', '往后一天'];
    }
    if (type === 'week') {
      return ['上周', '下周'];
    }
    return ['上个月', '下个月'];
  }, [type]);
}
