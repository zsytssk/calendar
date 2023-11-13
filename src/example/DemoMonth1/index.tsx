import Calendar from '@zsy/calendar';
import { CalendarType } from '@zsy/calendar/api';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const dataList = [
  {
    start: dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: '2022-12-15 10:40:06',
  },
];
/** 周视图 */
export default function DemoMonth1() {
  const [type, setType] = useState('month' as CalendarType);

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
        dataList={[...dataList]}
        dataRender={(data) => {
          console.log(`test:>data:>1`, data);
          return (
            <div>
              <div className="time">
                {dayjs(data.start).format('HH:mm')}~
                {dayjs(data.end).format('HH:mm')}
              </div>
            </div>
          );
        }}
        onTypeChange={(type) => {
          setType(type);
        }}
        onPanelChange={(date) => {
          console.log(`test:>onPanelChange`, date);
        }}
        onSelect={(date) => {
          console.log(`test:>onSelect`, date);
        }}
        dateCellRender={(date, crossDayNum) => {
          console.log(`test:>dateCellRender`, crossDayNum, date);
          return <div>C:{date.date()}</div>;
        }}
        // dateFullCellRender={(date) => {
        //   console.log(`test:>dateFullCellRender`, date);
        //   return <div>FC:{date.date()}</div>;
        // }}
      />
    </div>
  );
}
