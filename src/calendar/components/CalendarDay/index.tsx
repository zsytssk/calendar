import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { CalcPosFn, OverlayDataItem } from '../../api';
import { useCalcPosFn } from '../../hooks/useCalcPosFn';
import { useCurLine } from '../../hooks/useCurLine';
import { useSetDaySize } from '../../hooks/useDaySize';
import { useScrollToCurTime } from '../../hooks/useScrollToCurTime';
import { useUnMoveClick } from '../../hooks/useUnMoveClick';
import { useCalendarStore } from '../../store/calendarStore';
import { genOverlayList } from '../../utils/genOverlayList';
import {
  calcEventPosPercent,
  formatHour,
  needHideHourFn,
} from '../../utils/utils';
import styles from './index.module.less';

const HourArr = Array(24).fill('');
export function CalendarDay() {
  const [dataList, setDataList] = useState<OverlayDataItem[]>();
  const calDataZoneBoxRef = useRef<HTMLDivElement>(null);
  const calDataZoneRef = useRef<HTMLDivElement>(null);
  const { curDate, innerProps } = useCalendarStore();
  const [showCurLine, curLinePos] = useCurLine(calDataZoneBoxRef, 'day');
  const calcPos: CalcPosFn = useCalcPosFn(calDataZoneBoxRef);
  const calBodyRef = useRef<HTMLDivElement>(null);
  useSetDaySize(calDataZoneBoxRef);

  useUnMoveClick(calDataZoneRef, (e) => {
    if (!curDate || e.target !== calDataZoneRef.current) {
      return;
    }

    const percent = calcEventPosPercent(e);
    const minute = Math.ceil(24 * 60 * percent);
    innerProps.onSelect?.(
      curDate?.clone().startOf('day').add(minute, 'minute'),
    );
  });

  useLayoutEffect(() => {
    const dataList = genOverlayList(curDate, innerProps?.dataList);
    setDataList(dataList);
  }, [curDate, innerProps]);
  useScrollToCurTime(calBodyRef, curLinePos);

  return (
    <div className={classNames(styles.calendarDay, innerProps.bodyClassName)}>
      <div className="calHead">
        <div className="calHeadTime">
          <div className="label">时间</div>
        </div>
        <div className="calHeadExpand">
          {innerProps.headRender ? innerProps.headRender(curDate) : null}
        </div>
      </div>
      <div className="calBody" ref={calBodyRef}>
        <div className="bgBox">
          <div className="hourBox">
            {HourArr.map((_, index) => {
              const needHideHour = needHideHourFn(index);
              return (
                <div key={index} className="calBodyRow">
                  <div className="calBodyTime">
                    {index > 0 ? (
                      <div className="label">
                        {needHideHour ? null : formatHour(index)}
                      </div>
                    ) : null}
                  </div>
                  <div className="calBodyExpand"></div>
                </div>
              );
            })}
          </div>
          <div className="calDataZoneBox" ref={calDataZoneBoxRef}>
            {/* 自定义内容render */}
            {innerProps?.bodyRender ? (
              innerProps?.bodyRender(curDate)
            ) : (
              // 正常渲染dataList
              <div
                className="calDataZone"
                ref={calDataZoneRef}
                // onClick={(e) => {
                //   if (!curDate || e.target !== calDataZoneRef.current) {
                //     return;
                //   }
                //   const percent = calcEventPosPercent(e);
                //   const minute = Math.ceil(24 * 60 * percent);
                //   innerProps.onSelect?.(
                //     curDate?.clone().startOf('day').add(minute, 'minute'),
                //   );
                // }}
              >
                {dataList?.map((item) => {
                  const pos = calcPos(curDate, item);
                  if (!pos) {
                    return null;
                  }
                  return (
                    <div
                      className="calDataZoneItem"
                      key={item.id}
                      style={{
                        inset: `${pos?.top}px ${pos?.right}px ${pos?.bottom}px ${pos?.left}px`,
                      }}
                    >
                      {innerProps.dataRender?.(item)}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 当前时间的显示 */}
            {showCurLine ? (
              <div
                className="curTimeLine"
                style={{
                  top: `${curLinePos?.top}px`,
                }}
              >
                <div className="time">
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
