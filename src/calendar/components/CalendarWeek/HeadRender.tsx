import { Dayjs } from 'dayjs';
import React, { useMemo } from 'react';

import { DataItem, DateInfo, FilledItem } from '../../api';
import { WeekArr } from '../../config/config';
import { useCrossDayData } from '../../hooks/useDayData';
import { useCalendarStore } from '../../store/calendarStore';
import { getMaxRowCrossDayNum } from '../../utils/layoutWeekCrossDay';
import { getPercent } from '../../utils/utils';
import styles from './index.module.less';

type Props = {
  date?: Dayjs;
  dataList?: DataItem[];
  weekList: DateInfo[];
};
export function HeadRender({ date, dataList = [], weekList }: Props) {
  const { innerProps } = useCalendarStore();

  const showData = useCrossDayData('week', date, dataList) as FilledItem[];

  const maxRowNum = useMemo(() => {
    return getMaxRowCrossDayNum(showData);
  }, [showData]);

  return (
    <div className={styles.headRender}>
      <div className="calHeadList">
        {weekList.map((item, index) => {
          return (
            <div
              key={index}
              className="calHeadItem"
              style={{
                paddingBottom: maxRowNum * 25 + 10,
              }}
            >
              <div className="weekNum">{WeekArr[index]}</div>
              <div className="dayNum">{item.date.date()}</div>
            </div>
          );
        })}
      </div>
      <div className="crossDayBox" style={{ height: maxRowNum * 25 }}>
        {showData.map((item) => {
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
              {innerProps.dataRender?.(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
