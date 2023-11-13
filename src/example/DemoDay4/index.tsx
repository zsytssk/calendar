import Calendar from '@zsy/calendar';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { CalendarType, DataItem } from '../../calendar/api';
import { DataRender } from '../components/DataRender';
import { genRandomStr } from '../utils';
import styles from './index.module.less';

const dataList = [
  {
    start: dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
  },
  {
    start: dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
  },
];
/** 日视图 bodyRender */
export default function DemoDay4() {
  const [type, setType] = useState('day' as CalendarType);
  const [localDataList, setLocalDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    setLocalDataList(dataList);
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
          return (
            <DataRender
              data={data}
              onRangeChange={(newRange) => {
                console.log(`test:>`);
                onItemRangeChange(data, newRange);
              }}
            />
          );
        }}
        onSelect={(date) => {
          console.log(`test:>onSelect`, date.format('YYYY-MM-DD HH:mm'));
        }}
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
