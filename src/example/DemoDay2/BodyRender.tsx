import { DataItem } from '@zsy/calendar/api';
import { useInDayData } from '@zsy/calendar/hooks/useDayData';
import { Dayjs } from 'dayjs';
import React, { useCallback } from 'react';

import { TagItem, TagList } from '../data';
import { Columns } from './Columns';
import styles from './index.module.less';

type Props = {
  dataList: DataItem[];
  date?: Dayjs;
};
export function BodyRender({ date, dataList }: Props) {
  const showData = useInDayData('day', date, dataList);

  const getTagData = useCallback(
    (tag: TagItem) => {
      return showData.filter((item) => (item as any).tag === tag.id);
    },
    [showData],
  );

  return (
    <div className={styles.bodyRender}>
      {TagList.map((tagItem) => {
        const items = getTagData(tagItem);
        return <Columns date={date} dataList={items} key={tagItem.id} />;
      })}
    </div>
  );
}
