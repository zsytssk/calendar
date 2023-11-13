import { DataItem } from '@zsy/calendar/api';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import styles from './index.module.less';

type Props = {
  className?: string;
  data: DataItem;
  onRangeChange?: (range: [Dayjs, Dayjs]) => void;
};
type Direction = 'top' | 'bottom';

export function DataRender({ className, data, onRangeChange }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const draTopRef = useRef<HTMLDivElement>(null);
  const draBottomRef = useRef<HTMLDivElement>(null);
  const onRangeChangeRef = useRef<typeof onRangeChange>();

  useLayoutEffect(() => {
    if (!boxRef.current) {
      return;
    }
    console.log(
      `test:>onItemRangeChange:>2`,
      dayjs(data.end).diff(data.start, 'second'),
    );
    boxRef.current.style.height = '';
    boxRef.current.style.top = '';
  }, [data]);

  const dragAble = useMemo(() => {
    return onRangeChange ? true : false;
  }, [onRangeChange]);

  useLayoutEffect(() => {
    onRangeChangeRef.current = onRangeChange;
  }, [onRangeChange]);

  useEffect(() => {
    if (
      !dragAble ||
      !boxRef.current ||
      !draBottomRef.current ||
      !draTopRef.current
    ) {
      return;
    }
    const topResizeDom = draTopRef.current;
    const bottomResizeDom = draBottomRef.current;
    let y = 0;
    let h = 0;
    let t = 0;
    const diffSecond = dayjs(data.end).diff(data.start, 'second');
    let direction: Direction = 'top';

    const mouseDownHandler = (e: MouseEvent) => {
      if (!boxRef.current) {
        return;
      }
      y = e.clientY;

      // Calculate the dimension of element
      const styles = window.getComputedStyle(boxRef.current);
      h = parseInt(styles.height, 10);
      t = parseInt(styles.top, 10);

      // Attach the listeners to `document`
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!boxRef.current) {
        return;
      }
      // How far the mouse has been moved
      const dy = e.clientY - y;
      if (direction === 'bottom') {
        // Adjust the dimension of element
        boxRef.current.style.height = `${h + dy}px`;
      } else {
        boxRef.current.style.height = `${h - dy}px`;
        boxRef.current.style.top = `${t + dy}px`;
      }
    };

    const mouseUpHandler = () => {
      if (!boxRef.current) {
        return;
      }
      const styles = window.getComputedStyle(boxRef.current);
      const top = parseInt(styles.top, 10);
      const height = parseInt(styles.height, 10);
      const topSecond = (top / h) * diffSecond;
      const heightSecond = (height / h) * diffSecond;
      const start = dayjs(data.start).add(topSecond, 'second');
      const end = start.add(heightSecond, 'second');
      onRangeChangeRef.current?.([start, end]);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    const bottomMousedownFn = (e: MouseEvent) => {
      direction = 'bottom';
      mouseDownHandler(e);
    };
    const topMousedownFn = (e: MouseEvent) => {
      direction = 'top';
      mouseDownHandler(e);
    };
    bottomResizeDom.addEventListener('mousedown', bottomMousedownFn);
    topResizeDom.addEventListener('mousedown', topMousedownFn);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      bottomResizeDom.removeEventListener('mousedown', bottomMousedownFn);
      topResizeDom.removeEventListener('mousedown', topMousedownFn);
    };
  }, [data, dragAble]);

  return (
    <div className={classNames(styles.dataRender, className)} ref={boxRef}>
      {dragAble ? (
        <>
          <div className="resizeTop" ref={draTopRef}></div>
          <div className="resizeBottom" ref={draBottomRef}></div>
        </>
      ) : null}

      <div className="name">{data.id}</div>
      <div className="time">
        {dayjs(data.start).format('HH:mm')}~{dayjs(data.end).format('HH:mm')}
      </div>
    </div>
  );
}
