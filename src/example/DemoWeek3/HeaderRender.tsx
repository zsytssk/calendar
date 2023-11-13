import { CalendarApi, DataItem, FilledItem } from '@zsy/calendar/api';
import { WeekArr } from '@zsy/calendar/config/config';
import { useCrossDayData } from '@zsy/calendar/hooks/useDayData';
import { useWeekList } from '@zsy/calendar/hooks/useWeekList';
import { getMaxRowCrossDayNum } from '@zsy/calendar/utils/layoutWeekCrossDay';
import { getPercent } from '@zsy/calendar/utils/utils';
import { Tooltip } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useCallback, useMemo } from 'react';

import styles from './index.module.less';

type Props = {
  date?: Dayjs;
  dataList?: DataItem[];
  dataRender?: CalendarApi['dataRender'];
};

export function HeaderRender({ date, dataList = [], dataRender }: Props) {
  const showData = useCrossDayData('week', date, dataList) as FilledItem[];
  const crossDayData = useCrossDayData(
    'week',
    date,
    dataList,
    false,
  ) as FilledItem[];
  const weekList = useWeekList();

  const maxRowNum = useMemo(() => {
    return getMaxRowCrossDayNum(showData);
  }, [showData]);

  const getCossDayInDay = useCallback((date: Dayjs, list: FilledItem[]) => {
    return list?.filter((item) => {
      const ignore =
        date.startOf('day').isAfter(item.end) ||
        date.endOf('day').isBefore(item.start);

      return !ignore;
    });
  }, []);

  return (
    <div className={styles.headRender}>
      <div className="calHeadList">
        {weekList.map((item, index) => {
          const dayShowData = getCossDayInDay(item.date, showData);
          const crossData = getCossDayInDay(item.date, crossDayData);
          const hasMore = crossData?.length > dayShowData.length;
          return (
            <div key={index} className="calHeadItem">
              <div className="weekNum">{WeekArr[index]}</div>
              <div className="dayNum">{item.date.date()}</div>
              {hasMore ? (
                <Tooltip title={crossData.length}>
                  <div
                    className="more"
                    style={{
                      marginTop: maxRowNum * 24 + 5,
                    }}
                  >
                    asdasds
                  </div>
                </Tooltip>
              ) : null}
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
              {dataRender?.(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
