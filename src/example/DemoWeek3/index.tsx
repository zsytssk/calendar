import Calendar from '@zsy/calendar';
import { CalendarType } from '@zsy/calendar/api';
import { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';

import { DataRender } from '../components/DataRender';
import { HeaderRender } from './HeaderRender';
import { dataLocalList } from './data';
import styles from './index.module.less';

/** 周视图 */
export default function DemoWeek3() {
  const [type, setType] = useState('week' as CalendarType);

  const headerRender = useCallback((date?: Dayjs) => {
    return (
      <HeaderRender
        date={date}
        dataList={dataLocalList}
        dataRender={(data) => {
          return <DataRender data={data} className="dataRender" />;
        }}
      />
    );
  }, []);

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
        headRender={headerRender}
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
