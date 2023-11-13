import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useRef } from 'react';

import { useCurLine } from '../../hooks/useCurLine';
import { useInDayData } from '../../hooks/useDayData';
import { useSetDaySize } from '../../hooks/useDaySize';
import { useScrollToCurTime } from '../../hooks/useScrollToCurTime';
import { useWeekList } from '../../hooks/useWeekList';
import { useCalendarStore } from '../../store/calendarStore';
import { genOverlayList } from '../../utils/genOverlayList';
import { formatHour, needHideHourFn } from '../../utils/utils';
import { Columns } from './Columns';
import { HeadRender } from './HeadRender';
import styles from './index.module.less';

const HourArr = Array(24).fill('');
export function CalendarWeek() {
  const { curDate, innerProps } = useCalendarStore();
  const weekList = useWeekList();
  const calDataZoneRef = useRef<HTMLDivElement>(null);
  const [showCurLine, curLinePos] = useCurLine(calDataZoneRef, 'week');
  const calBodyRef = useRef<HTMLDivElement>(null);

  useSetDaySize(calDataZoneRef, (size) => {
    return {
      width: (size.width || 0) / 7,
      height: size.height,
    };
  });

  const showData = useInDayData('week', curDate, innerProps.dataList);
  useScrollToCurTime(calBodyRef, curLinePos);

  return (
    <div className={classNames(styles.calendarWeek, innerProps.bodyClassName)}>
      <div className="calHead">
        <div className="calHeadTime">
          <div className="label">时间</div>
        </div>
        <div className="calHeadBox">
          {innerProps.headRender ? (
            innerProps.headRender(curDate)
          ) : (
            <HeadRender
              date={curDate}
              dataList={innerProps.dataList}
              weekList={weekList}
            />
          )}
        </div>
      </div>
      <div className="calBody" ref={calBodyRef}>
        <div className="bgBox">
          <div className="hourBox">
            {HourArr.map((_, index) => {
              const needHideHour = needHideHourFn(index, true);
              return (
                <div key={index} className="calBodyRow">
                  <div className="calBodyTime">
                    {index > 0 ? (
                      <div className="label">
                        {needHideHour ? null : formatHour(index)}
                      </div>
                    ) : null}
                  </div>
                  {weekList.map((item, index) => {
                    return <div key={index} className="calBodyItem" />;
                  })}
                </div>
              );
            })}
          </div>
          <div className="calDataZoneBox">
            <div className="calDataZone" ref={calDataZoneRef}>
              {weekList?.map((dateItem, index) => {
                const dataList = genOverlayList(dateItem.date, showData);
                return (
                  <Columns
                    key={index}
                    dateItem={dateItem}
                    dataList={dataList}
                  />
                );
              })}
            </div>
            {showCurLine ? (
              <div
                className="curTimeLine"
                style={{
                  top: `${curLinePos?.top}px`,
                }}
              >
                <div className="time" style={{ left: `${curLinePos?.left}px` }}>
                  <span className="txt">{dayjs().format('HH:mm')}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
