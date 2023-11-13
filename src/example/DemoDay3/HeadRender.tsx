import { DataItem } from '@zsy/calendar/api';
import { useCrossDayData } from '@zsy/calendar/hooks/useDayData';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback } from 'react';

import { TagItem, TagList } from '../data';
import styles from './index.module.less';

type Props = {
  date?: Dayjs;
  dataList: DataItem[];
};
export function HeadRender({ date, dataList }: Props) {
  const showData = useCrossDayData('day', date, dataList, false);

  const getTagData = useCallback(
    (tag: TagItem) => {
      return showData.filter((item) => (item as any).tag === tag.id);
    },
    [showData],
  );

  return (
    <div className={styles.headRender}>
      {TagList.map((tagItem) => {
        const items = getTagData(tagItem);
        return (
          <div className="item" key={tagItem.id}>
            <div className="band">
              <div className="tag">{tagItem.id}</div>
              {tagItem.name}
            </div>
            {items?.length > 0 ? (
              <div className="dataList">
                {items.map((item) => {
                  return (
                    <div className="dataItem" key={item.id}>
                      <div className="name">sdfsd</div>
                      <div className="itemRight">
                        {dayjs(item.start).format('YYYY-MM-DD HH:mm')}~
                        {dayjs(item.end).format('YYYY-MM-DD HH:mm')}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
