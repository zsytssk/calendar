import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

import { DateInfo } from '../../api';
import { WeekArr } from '../../config/config';
import { useSetDaySize } from '../../hooks';
import { useCalendarStore } from '../../store/calendarStore';
import { RowItem } from './RowItem';
import styles from './index.module.less';

export function CalendarMonth() {
  const { curDate, innerProps } = useCalendarStore();
  const [dateList, setDayList] = useState<DateInfo[][]>([]);
  const calBodyRef = useRef<HTMLDivElement>(null);

  useSetDaySize(calBodyRef, (size) => {
    return {
      width: (size.width || 0) / 7,
      height: (size.height || 0) / 5,
    };
  });

  useEffect(() => {
    const today = dayjs();
    const monthNum = curDate?.month();
    const dateList: DateInfo[][] = [];
    const start = curDate?.day(0);
    if (!start) {
      return;
    }
    for (let row = 0; row < 5; row++) {
      const rowItem: DateInfo[] = [];
      for (let item = 0; item < 7; item++) {
        const dateItem = start.clone().add(item + row * 7, 'day');
        rowItem.push({
          date: dateItem,
          grey: dateItem?.month() !== monthNum,
          cur: dateItem.isSame(today, 'date'),
        });
      }
      dateList.push(rowItem);
    }
    setDayList(dateList);
  }, [curDate]);

  return (
    <div className={classNames(styles.calendarMonth, innerProps.bodyClassName)}>
      <div className="calHead">
        {WeekArr.map((item) => {
          return (
            <div key={item} className="calHeadItem">
              {item}
            </div>
          );
        })}
      </div>
      <div className="calBody" ref={calBodyRef}>
        {dateList.map((dateRow, index) => {
          return (
            <RowItem
              dateRow={dateRow}
              key={index}
              curDate={curDate}
              rowNum={index}
              dataList={innerProps.dataList}
            />
          );
        })}
      </div>
    </div>
  );
}
