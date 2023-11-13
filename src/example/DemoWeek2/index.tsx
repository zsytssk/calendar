import Calendar from '@zsy/calendar';
import { CalendarType } from '@zsy/calendar/api';
import React, { useState } from 'react';

import { DataRender } from '../components/DataRender';
import { dataLocalList } from './data';
import styles from './index.module.less';

/** 周视图 */
export default function DemoWeek2() {
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
        type={type}
        className={styles.calendar}
        dataList={[...dataLocalList]}
        dataRender={(data) => {
          return <DataRender data={data} className="dataRender" />;
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
