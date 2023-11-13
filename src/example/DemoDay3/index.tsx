import Calendar from '@zsy/calendar';
import { CalendarType } from '@zsy/calendar/api';
import { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';

import { BodyRender } from './BodyRender';
import { HeadRender } from './HeadRender';
import { dataLocalList } from './data';

/** 日视图 bodyRender */
export default function DemoDay3() {
  const [type, setType] = useState('day' as CalendarType);

  const bodyRender = useCallback((date?: Dayjs) => {
    return <BodyRender date={date} dataList={dataLocalList} />;
  }, []);

  const headRender = useCallback((date?: Dayjs) => {
    return <HeadRender dataList={dataLocalList} date={date} />;
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
        initDate={'2023-1-05'}
        onTypeChange={(type) => {
          setType(type);
        }}
        bodyRender={bodyRender}
        headRender={headRender}
        onSelect={(date, hour) => {
          console.log(`test:>onSelect`, date.format('YYYY-MM-DD HH:mm'));
        }}
        onPanelChange={(date) => {
          console.log(`test:>onPanelChange`, date);
        }}
      />
    </div>
  );
}
