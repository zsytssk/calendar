import Calendar from '@zsy/calendar';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';

import { CalendarType } from '../../calendar/api';
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
export default function DemoDay1() {
  const [type, setType] = useState('day' as CalendarType);

  const onPanelChange = (date: Dayjs) => {
    console.log(`test:>onPanelChange:>1`, date.format('YYYY-MM-DD'));
  };

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
        dataList={[...dataList]}
        dataRender={(data) => {
          return <DataRender data={data} />;
        }}
        onSelect={(date) => {
          console.log(`test:>onSelect`, date.format('YYYY-MM-DD HH:mm'));
        }}
        onTypeChange={(type) => {
          console.log(`test:>onTypeChange`, type);
          setType(type);
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
}
