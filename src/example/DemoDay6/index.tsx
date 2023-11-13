import Calendar, { useGetDaySize } from '@zsy/calendar';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { CalendarType, DataItem } from '../../calendar/api';
import { genRandomStr } from '../utils';
import { DataRender } from './DataRender';
import { NewDataRender } from './NewDataRender';
import styles from './index.module.less';

const dataList = [
  {
    start: dayjs()
      .startOf('hour')
      .subtract(2, 'hour')
      .format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs()
      .startOf('hour')
      .subtract(1, 'hour')
      .subtract(15, 'minute')
      .format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
  },
  {
    start: dayjs()
      .startOf('hour')
      .subtract(1, 'hour')
      .format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs()
      .startOf('hour')
      .add(15, 'minute')
      .format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
  },
  {
    start: dayjs().startOf('hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs()
      .startOf('hour')
      .add(1, 'hour')
      .add(15, 'minute')
      .format('YYYY-MM-DD HH:mm:ss'),
    id: '8vyvtsi5zek',
  },
  {
    start: dayjs().startOf('hour').add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs()
      .startOf('hour')
      .add(2, 'hour')
      .add(15, 'minute')
      .format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
  },
  {
    start: dayjs().startOf('hour').add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs()
      .startOf('hour')
      .add(3, 'hour')
      .add(15, 'minute')
      .format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
  },
];

export type NewDataItem = DataItem & {
  type: string;
};
/** 日视图 点击创建 */
export default function DemoDay6() {
  const [type, setType] = useState('day' as CalendarType);
  const [localDataList, setLocalDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    setLocalDataList(dataList);
  }, []);

  const onCreateItem = useCallback((date: Dayjs) => {
    const minute = date.minute();
    let start: Dayjs;
    if (minute > 30) {
      start = date.startOf('minute').add(30 - minute, 'minute');
    } else {
      start = date.startOf('minute').add(-minute, 'minute');
    }
    const end = start.clone().add(30, 'minute');
    const newDate = {
      start: start.format('YYYY-MM-DD HH:mm:ss'),
      end: end.format('YYYY-MM-DD HH:mm:ss'),
      id: genRandomStr(),
      type: 'new',
    };
    console.log(`test:>onCreateItem`, date, newDate);
    setLocalDataList((old) => [newDate, ...old]);
  }, []);

  const onItemRangeChange = useCallback(
    (item: DataItem, newRange: [Dayjs, Dayjs]) => {
      const newList = localDataList.filter(
        (localItem) => localItem.id !== item.id,
      );
      setLocalDataList([
        ...newList,
        {
          ...item,
          start: newRange[0].format('YYYY-MM-DD HH:mm:ss'),
          end: newRange[1].format('YYYY-MM-DD HH:mm:ss'),
        },
      ]);
    },
    [localDataList],
  );

  return (
    <div
      className="wrap"
      style={{
        margin: '30px auto',
        width: 1136,
        height: 676,
        padding: 8,
        border: '1px solid red',
      }}
    >
      <Calendar
        className={styles.calendar}
        type={type}
        dataList={[...localDataList]}
        dataRender={(data) => {
          console.log(`test:>dataRender`, data);
          if ((data as NewDataItem).type === 'new') {
            return <NewDataRender data={data} />;
          }

          return (
            <DataRender
              data={data}
              onRangeChange={(newRange) => {
                onItemRangeChange(data, newRange);
              }}
            />
          );
        }}
        onSelect={onCreateItem}
        onTypeChange={(type) => {
          setType(type);
        }}
        onPanelChange={(date) => {
          console.log(`test:>onPanelChange`, date);
        }}
      />
    </div>
  );
}
