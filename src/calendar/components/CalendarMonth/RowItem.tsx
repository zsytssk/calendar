import { Dayjs } from 'dayjs';
import React, { useMemo } from 'react';

import { DataItem, DateInfo, FilledItem } from '../../api';
import { useCrossDayData } from '../../hooks/useDayData';
import { getCellCrossDayNum } from '../../utils/layoutWeekCrossDay';
import { CrossDayBox } from './CrossDayBox';
import { MonthItem } from './MonthItem';

type Props = {
  dateRow: DateInfo[];
  curDate?: Dayjs;
  rowNum: number;
  dataList?: DataItem[];
};

export function RowItem({ dateRow, dataList, rowNum, curDate }: Props) {
  const date = useMemo(() => {
    if (!curDate) {
      return;
    }
    return curDate.add(rowNum * 7, 'day').startOf('week');
  }, [curDate, rowNum]);

  const showData = useCrossDayData('week', date, dataList) as FilledItem[];

  return (
    <div className="calBodyRow">
      <div className="calBodyRowList">
        {dateRow.map((item, index) => {
          const crossDayNum = getCellCrossDayNum(index, showData);
          return (
            <MonthItem data={item} key={index} crossDayNum={crossDayNum} />
          );
        })}
      </div>
      <CrossDayBox showData={showData} date={date} />
    </div>
  );
}
