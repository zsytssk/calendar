import Calendar from '@zsy/calendar';
import { CalendarType } from '@zsy/calendar/api';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { dataLocalList } from './data';
import styles from './index.module.less';

/** 周视图 */
export default function DemoMonth2() {
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
        className={styles.demoMonth2}
        type={type}
        dataList={[...dataLocalList]}
        dataRender={(data) => {
          return (
            <div className="dataRender">
              <div className="name">{data.id}</div>
              <div className="time">
                {dayjs(data.start).format('YYYY-MM-DD HH:mm')}~
                {dayjs(data.end).format('YYYY-MM-DD HH:mm')}
              </div>
            </div>
          );
        }}
        onTypeChange={(type) => {
          setType(type);
        }}
        onPanelChange={(date) => {
          console.log(`test:>onPanelChange`, date.format('YYYY-MM-DD'));
        }}
        onSelect={(date) => {
          console.log(`test:>onSelect`, date);
        }}
        // crossDayNum 是这一天中跨天item的个数
        dateCellRender={(date, crossDayNum = 0) => {
          console.log(`test:>dateCellRender`, date);
          return (
            <div
              style={{
                marginTop: crossDayNum * 24,
              }}
            >
              C:{date.date()}
            </div>
          );
        }}
        // dateFullCellRender={(date) => {
        //     console.log(`test:>dateFullCellRender`, date);
        //     return <div>FC:{date.date()}</div>;
        // }}
      />
    </div>
  );
}
