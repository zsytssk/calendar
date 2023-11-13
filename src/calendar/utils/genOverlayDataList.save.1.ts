import dayjs, { Dayjs } from 'dayjs';

import { DataItem, OverlayDataItem } from '../api';

// 默认版本
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

  for (const item of newDataList) {
    const overlayItems: DataItem[] = [];
    for (const difItem of newDataList) {
      if (difItem === item) {
        overlayItems.push(difItem);
        continue;
      }
      const diffBetween = dayjs(item.end).diff(difItem.start, 'second');
      if (diffBetween < 0) {
        continue;
      }
      const spaceSum =
        dayjs(item.end).diff(item.start, 'second') +
        dayjs(difItem.end).diff(difItem.start, 'second');

      if (diffBetween === 0 || diffBetween >= spaceSum) {
        continue;
      }
      overlayItems.push(difItem);
    }

    if (overlayItems.length) {
      const overlayNum = overlayItems.length;
      const overlayIndex = overlayItems.findIndex(
        (overlayItem) => overlayItem === item,
      );
      result.push({ ...item, overlayNum, overlayIndex });
    } else {
      result.push({ ...item, overlayNum: 0, overlayIndex: 0 });
    }
  }
  // console.log(`test:>overlayList:>1`, result);
  return result;
}
