import dayjs, { Dayjs } from 'dayjs';

import { DataItem, OverlayDataItem } from '../api';

// 蔡华烽思路
export function genOverlayList(date?: Dayjs, dataList?: DataItem[]) {
  if (!dataList?.length || !date) {
    return [];
  }
  const result: OverlayDataItem[] = [];
  const newDataList = dataList
    .filter((item) => {
      const ignore =
        date.startOf('day')?.isAfter(item.end) ||
        date.endOf('day')?.isBefore(item.start);

      return !ignore;
    })
    .sort((a, b) => dayjs(a.start).diff(b.start));

  for (let i = 0; i < newDataList.length - 1; i++) {
    const item = newDataList[i];
    const rawOverlayItems: DataItem[] = [];
    /** 记录重叠的位置 */
    let next = -1;
    for (let j = i; j < newDataList.length - 1; j++) {
      const difItem = newDataList[j];

      const diffBetween = dayjs(difItem.end).diff(item.start, 'second');
      if (diffBetween <= 0) {
        continue;
      }
      const spaceSum =
        dayjs(item.end).diff(item.start, 'second') +
        dayjs(difItem.end).diff(difItem.start, 'second');

      if (diffBetween >= spaceSum) {
        continue;
      }
      rawOverlayItems.push(difItem);
      next = j;
    }
    if (!rawOverlayItems.length) {
      continue;
    }
    if (next !== -1) {
      i = next;
    }
    console.log(`test:>overlayList:>item`, rawOverlayItems);
    const overlayItems: OverlayDataItem[] = rawOverlayItems.map(
      (item, index) => {
        return {
          ...item,
          overlayNum: rawOverlayItems.length,
          overlayIndex: index,
        };
      },
    );

    result.push(...overlayItems);
  }

  console.log(`test:>overlayList:>end`, result);

  return result;
}
