import { DataItem } from '@zsy/calendar/api';
import { useCalcPosFn } from '@zsy/calendar/hooks/useCalcPosFn';
import { genOverlayList } from '@zsy/calendar/utils/genOverlayList';
import { Dayjs } from 'dayjs';
import React, { useEffect, useMemo, useRef } from 'react';

import { DataRender } from '../components/DataRender';

type Props = {
  dataList: DataItem[];
  date?: Dayjs;
};
export function Columns({ dataList, date }: Props) {
  const columnRef = useRef<HTMLDivElement>(null);
  const overlayDataList = useMemo(() => {
    if (!dataList?.length) {
      return [];
    }
    return genOverlayList(date, dataList);
  }, [date, dataList]);
  const calcPos = useCalcPosFn(columnRef);

  return (
    <div className="bodyItem" ref={columnRef}>
      {overlayDataList.map((item) => {
        const pos = calcPos(date, item);
        return (
          <div
            key={item.id}
            className="activityItem"
            style={{
              inset: `${pos?.top}px ${pos?.right}px ${pos?.bottom}px ${pos?.left}px`,
            }}
          >
            <DataRender data={item} />
          </div>
        );
      })}
    </div>
  );
}
