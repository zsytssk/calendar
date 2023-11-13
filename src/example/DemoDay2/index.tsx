import Calendar from '@zsy/calendar';
import { CalendarType } from '@zsy/calendar/api';
import { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';

import { dataList } from '../data';
import { BodyRender } from './BodyRender';
import { HeadRender } from './HeadRender';

/** 日视图 bodyRender */
export default function DemoDay2() {
  const [type, setType] = useState('day' as CalendarType);

  const bodyRender = useCallback((date?: Dayjs) => {
    return <BodyRender date={date} dataList={dataList} />;
  }, []);

  const headRender = useCallback(() => {
    return <HeadRender />;
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
