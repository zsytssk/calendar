import { Dayjs } from 'dayjs';
import React from 'react';

import { FilledItem } from '../../api';
import { useCalendarStore } from '../../store/calendarStore';
import { getPercent } from '../../utils/utils';

type Props = {
  date?: Dayjs;
  showData?: FilledItem[];
};
export function CrossDayBox({ showData }: Props) {
  const { innerProps } = useCalendarStore();

  return (
    <div className={'crossDayBox'}>
      {showData?.map((item) => {
        return (
          <div
            key={item.id}
            className="crossDayItem"
            style={{
              top: item.y * 25,
              left: getPercent(item?.x / 7) + '%',
              right: getPercent((7 - (item?.x + item.space)) / 7) + '%',
            }}
          >
            {innerProps?.dataRender?.(item)}
          </div>
        );
      })}
    </div>
  );
}
