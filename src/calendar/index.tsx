import classNames from 'classnames';
import React, { useEffect, useLayoutEffect, useMemo } from 'react';

import { CalendarApi } from './api';
import { CalendarDay } from './components/CalendarDay';
import { CalendarMonth } from './components/CalendarMonth';
import { CalendarWeek } from './components/CalendarWeek';
import { Header } from './components/Header';
import styles from './index.module.less';
import { useCalendarStore } from './store/calendarStore';

export * from './hooks';
export * from './api';
export * from './utils';
export * from './config/config';

export default function Calendar(props: CalendarApi) {
  const { curDate, innerProps, init, reset, setProps } = useCalendarStore();

  const type = useMemo(() => {
    return props.type;
  }, [props.type]);

  const initDate = useMemo(() => {
    return props.initDate;
  }, [props.initDate]);

  const otherProps = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...otherProps } = props;
    return otherProps;
  }, [props]);

  const onPanelChange = useMemo(() => {
    return innerProps?.onPanelChange;
  }, [innerProps?.onPanelChange]);

  useLayoutEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (!curDate || !onPanelChange) {
      return;
    }
    onPanelChange?.(curDate);
  }, [curDate, onPanelChange]);

  useEffect(() => {
    init(type, initDate);
  }, [type, initDate, init]);

  useEffect(() => {
    setProps(otherProps);
  }, [setProps, otherProps]);

  const CalendarBox = useMemo(() => {
    if (type === 'week') {
      return <CalendarWeek />;
    }
    if (type === 'day') {
      return <CalendarDay />;
    }
    return <CalendarMonth />;
  }, [type]);

  return (
    <div className={classNames(styles.calendar, innerProps.className)}>
      <Header />
      {CalendarBox}
    </div>
  );
}
