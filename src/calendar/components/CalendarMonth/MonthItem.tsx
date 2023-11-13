import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import React, { useCallback, useRef } from 'react';

import { DateInfo } from '../../api';
import { useCalendarStore } from '../../store/calendarStore';
import { calcClosetNum } from '../../utils/utils';

type Props = {
  data: DateInfo;
  crossDayNum: number;
};
export function MonthItem({ data, crossDayNum }: Props) {
  const { innerProps, curDate, moveNext, movePrev } = useCalendarStore();
  const itemRef = useRef<HTMLDivElement>(null);

  // const switchMonth = useCallback(
  //   (date: Dayjs) => {
  //     if (!curDate) {
  //       return;
  //     }
  //     const diffMonth = date
  //       ?.endOf('month')
  //       .diff(curDate.endOf('month'), 'month');

  //     if (diffMonth > 0) {
  //       moveNext();
  //     } else {
  //       movePrev();
  //     }
  //   },
  //   [curDate, moveNext, movePrev],
  // );

  const ItemRender = useCallback(
    (item: DateInfo, crossDayNum?: number) => {
      if (innerProps.dateFullCellRender) {
        return innerProps.dateFullCellRender(item.date, crossDayNum);
      }

      // 月视图中不在本月的不渲染数据
      // if (!innerProps.dateCellRender || item.grey) {
      if (!innerProps.dateCellRender) {
        return (
          <>
            <div className="calBodyItemNum">
              <span className="num">{item?.date.date()}</span>
            </div>
            <div className="calBodyItemCon"></div>
          </>
        );
      }
      return (
        <>
          <div className="calBodyItemNum">
            <span className="num">{item?.date.date()}</span>
          </div>
          <div className="calBodyItemCon">
            {innerProps.dateCellRender(item.date, crossDayNum)}
          </div>
        </>
      );
    },
    [innerProps],
  );

  return (
    <div
      ref={itemRef}
      className={classNames({
        calBodyItem: true,
        grey: data.grey,
        cur: data.cur,
      })}
      onClick={(e) => {
        // if (data.grey) {
        //   switchMonth(data.date);
        //   return;
        // }

        const closestNum = calcClosetNum(
          e.target as HTMLElement,
          itemRef.current as HTMLElement,
        );
        if (closestNum < 0 || closestNum > 2) {
          return;
        }
        innerProps.onSelect?.(data.date);
      }}
    >
      {ItemRender(data, crossDayNum)}
    </div>
  );
}
