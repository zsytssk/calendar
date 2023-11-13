import React, { useRef } from 'react';

import { DateInfo, OverlayDataItem } from '../../api';
import { useUnMoveClick } from '../../hooks';
import { useCalcPosFn } from '../../hooks/useCalcPosFn';
import { useCalendarStore } from '../../store/calendarStore';
import { calcEventPosPercent } from '../../utils/utils';

type Props = {
  dateItem: DateInfo;
  dataList: OverlayDataItem[];
};
export function Columns({ dateItem, dataList }: Props) {
  const { innerProps } = useCalendarStore();
  const columnsRef = useRef<HTMLDivElement>(null);
  const calcPos = useCalcPosFn(columnsRef);

  useUnMoveClick(columnsRef, (e) => {
    if (e.target !== columnsRef.current) {
      return;
    }
    const percent = calcEventPosPercent(e);
    const minute = Math.ceil(24 * 60 * percent);
    innerProps.onSelect?.(
      dateItem.date.clone().startOf('day').add(minute, 'minute'),
    );
  });
  return (
    <div
      ref={columnsRef}
      className="calDataZoneItem"
      // onClick={(e) => {
      //   if (e.target !== columnsRef.current) {
      //     return;
      //   }
      //   const percent = calcEventPosPercent(e);
      //   const minute = Math.ceil(24 * 60 * percent);
      //   innerProps.onSelect?.(
      //     dateItem.date.clone().startOf('day').add(minute, 'minute'),
      //   );
      // }}
    >
      {dataList?.map((dataItem) => {
        const pos = calcPos(dateItem.date, dataItem);

        return (
          <div
            className="dateItem"
            key={dataItem.id}
            style={{
              inset: `${pos?.top}px ${pos?.right}px ${pos?.bottom}px ${pos?.left}px`,
            }}
          >
            {innerProps?.dataRender?.(dataItem)}
          </div>
        );
      })}
    </div>
  );
}
