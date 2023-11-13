import Calendar from '@zsy/calendar';
import { CalendarType } from '@zsy/calendar/api';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { DataRender } from '../components/DataRender';
import { dataList } from '../data';
import styles from './index.module.less';

/** 周视图 */
export default function DemoWeek1() {
  const [type, setType] = useState('week' as CalendarType);

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
        onTypeChange={(type) => {
          setType(type);
        }}
        onPanelChange={(date) => {
          console.log(`test:>onPanelChange`, date);
        }}
        onSelect={(date) => {
          console.log(`test:>onSelect`, date.format('YYYY-MM-DD HH:mm'));
        }}
      />
    </div>
  );
}
