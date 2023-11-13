import { DataItem } from '@zsy/calendar/api';
import dayjs from 'dayjs';
import React from 'react';

import styles from './index.module.less';

type Props = {
  data: DataItem;
};

export function NewDataRender({ data }: Props) {
  return (
    <div className={styles.newDataRender}>
      <div className="name">添加日程, </div>
      <div className="time">
        {dayjs(data.start).format('HH:mm')}~{dayjs(data.end).format('HH:mm')}
      </div>
    </div>
  );
}
