import { DatePicker, Tooltip } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';

import { CalendarType } from '../../api';
import { useDayTip } from '../../hooks/useDayTip';
import { useTriggerTip } from '../../hooks/useTriggerTip';
import { useCalendarStore } from '../../store/calendarStore';
import { IconArrowDown } from '../Icons/IconArrowDown';
import { IconArrowLeft } from '../Icons/IconArrowLeft';
import { IconArrowRight } from '../Icons/IconArrowRight';
import styles from './index.module.less';

export function Header() {
  const { type, curDate, setCur, moveNext, movePrev, setType, innerProps } =
    useCalendarStore();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const isBefore = useMemo(() => {
    const now = dayjs();
    return curDate?.isBefore(now, type);
  }, [type, curDate]);

  const localTypeChange = useCallback(
    (type: CalendarType) => {
      if (innerProps.onTypeChange) {
        return innerProps.onTypeChange(type);
      }
      setType(type);
    },
    [innerProps, setType],
  );

  const dayTip = useDayTip(type, curDate);
  const triggerTip = useTriggerTip(type);

  const curTitle = useMemo(() => {
    if (type === 'day') {
      return curDate?.format(`YYYY 年 MM 月 DD 日`);
    }
    return curDate?.format(`YYYY 年 MM 月`);
  }, [curDate, type]);

  return (
    <div className={styles.calHeader}>
      <div className="outLeft">
        <div className="innerNavBox">
          <div
            className="innerLeft"
            onClick={(e) => {
              e.preventDefault();
              setCur(dayjs());
            }}
          >
            今天
          </div>
          <div className="separate"></div>
          <div className="innerRight">
            <Tooltip title={triggerTip[0]}>
              <div
                className="innerNavPrev"
                onClick={(e) => {
                  e.preventDefault();
                  movePrev();
                }}
              >
                <IconArrowLeft />
              </div>
            </Tooltip>
            <Tooltip title={triggerTip[1]}>
              <div
                className="innerNavNext"
                onClick={(e) => {
                  e.preventDefault();
                  moveNext();
                }}
              >
                <IconArrowRight />
              </div>
            </Tooltip>
          </div>
        </div>
        <div
          className={classNames({
            innerTimeBox: true,
            isBefore,
            active: datePickerOpen,
          })}
          onClick={() => {
            setDatePickerOpen(true);
          }}
        >
          <div className="innerTime">{curTitle}</div>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <DatePicker
            picker={type === 'day' ? undefined : type}
            value={dayjs(curDate?.format('YYYY-MM-DD'))}
            className={'datePicker'}
            open={datePickerOpen}
            onChange={(date) => {
              setCur(dayjs(date?.valueOf()));
            }}
            onOpenChange={setDatePickerOpen}
          />
          <IconArrowDown />
          {dayTip ? <div className="innerToday">{dayTip}</div> : null}
        </div>
      </div>

      <div className="outRight">
        <div className="innerTypeBox">
          <div
            className={classNames({
              innerTypeItem: true,
              active: type === 'day',
            })}
            onClick={() => {
              localTypeChange('day');
            }}
          >
            日
          </div>
          <div
            className={classNames({
              innerTypeItem: true,
              active: type === 'week',
            })}
            onClick={() => {
              localTypeChange('week');
            }}
          >
            周
          </div>
          <div
            className={classNames({
              innerTypeItem: true,
              active: type === 'month',
            })}
            onClick={() => {
              localTypeChange('month');
            }}
          >
            月
          </div>
        </div>
      </div>
    </div>
  );
}
