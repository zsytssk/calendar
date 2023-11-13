import { useCalcPosFn, useGetDaySize } from '@zsy/calendar';
import { DataItem } from '@zsy/calendar/api';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { NumberSize, Resizable, ResizeDirection } from 're-resizable';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './index.module.less';

type Props = {
  className?: string;
  data: DataItem;
  onRangeChange?: (range: [Dayjs, Dayjs]) => void;
};

export function DataRender({ className, data, onRangeChange }: Props) {
  const onRangeChangeRef = useRef<typeof onRangeChange>();
  const [top, setTop] = useState(0);
  const size = useGetDaySize();

  const quarterHeight = useMemo(() => {
    return (size.height || 0) / (24 * 4);
  }, [size]);

  const [localData, setLocalData] = useState<DataItem>();

  useLayoutEffect(() => {
    onRangeChangeRef.current = onRangeChange;
  }, [onRangeChange]);

  useLayoutEffect(() => {
    setTop(0);
    setLocalData(data);
  }, [data]);

  const flag = useRef<string>();
  const onResize = useCallback(
    (
      e: MouseEvent | TouchEvent,
      direction: ResizeDirection,
      ref: HTMLElement,
      d: NumberSize,
    ) => {
      const newFlag = `${direction}:${d.height}`;
      if (newFlag === flag.current) {
        return;
      }
      flag.current = newFlag;

      if (direction === 'top') {
        setTop(d.height);
        if (!data) {
          return undefined;
        }
        const minutes = -(15 * d.height) / quarterHeight;
        setLocalData({
          ...data,
          start: dayjs(data?.start)
            .add(minutes, 'minute')
            .format('YYYY-MM-DD HH:mm'),
        });
        return;
      }

      if (!data) {
        return undefined;
      }

      const minutes = (15 * d.height) / quarterHeight;
      setLocalData({
        ...data,
        end: dayjs(data?.end).add(minutes, 'minute').format('YYYY-MM-DD HH:mm'),
      });
      return;
    },
    [quarterHeight, data],
  );

  const onResizeStop = useCallback(() => {
    onRangeChangeRef.current?.([
      dayjs(localData?.start),
      dayjs(localData?.end),
    ]);
  }, [localData]);

  return (
    <Resizable
      className={styles.resizeAble}
      style={{ top: -top, bottom: 0 }}
      boundsByDirection={true}
      grid={[0, quarterHeight]}
      onResize={onResize}
      enable={{ bottom: true, top: true }}
      onResizeStop={onResizeStop}
    >
      <div className={classNames(styles.dataRender, className)}>
        <div className="name">{data.id}</div>
        <div className="time">
          {dayjs(localData?.start).format('HH:mm')}~
          {dayjs(localData?.end).format('HH:mm')}
        </div>
      </div>
    </Resizable>
  );
}
