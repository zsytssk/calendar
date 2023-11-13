import dayjs, { Dayjs } from 'dayjs';

import { DataItem, OverlayDataItem } from '../api';

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

  const map = new Map<string, string[]>();
  for (let i = 0; i < newDataList.length - 1; i++) {
    const item = newDataList[i];
    const overlayItems: DataItem[] = [];
    for (let j = i + 1; j < newDataList.length; j++) {
      const difItem = newDataList[j];
      const isAfter = dayjs(difItem.start).isAfter(difItem.end);
      /** 排除明显不重叠的item */
      if (isAfter) {
        continue;
      }

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
      overlayItems.push(difItem);
    }
    if (!overlayItems.length) {
      continue;
    }
    map.set(
      item.id,
      overlayItems.map((item) => item.id),
    );
  }

  //   console.log(`test:>overlayList:>1`, map);
  for (const item of newDataList) {
    const toStartList = getMaxListToStart(item.id, map);
    let toEndList = getMaxListToEnd(item.id, map);
    if (toStartList.length && toEndList?.length) {
      toEndList = toEndList.slice(1, toEndList.length);
    }
    const overlayItemList = [...toStartList, ...toEndList];
    // console.log(`test:>overlayList:>2:>`, item.id, toStartList, toEndList);
    if (overlayItemList.length) {
      result.push({
        ...item,
        overlayNum: overlayItemList.length,
        overlayIndex: overlayItemList.findIndex((itemId) => item.id === itemId),
      });
    } else {
      result.push({ ...item, overlayNum: 1, overlayIndex: 0 });
    }
  }
  //   console.log(`test:>overlayList:>3:>`, result);

  return result;
}

export function getMaxListToStart(
  sourceId: string,
  map: Map<string, string[]>,
) {
  const arr: string[][] = [];
  for (const [itemId, itemList] of map) {
    if (itemList.indexOf(sourceId) !== -1) {
      const spreadList = getMaxListToStart(itemId, map);
      if (spreadList?.length) {
        arr.push([...spreadList, sourceId]);
      } else {
        arr.push([itemId, sourceId]);
      }
    }
  }
  return arr.sort((a, b) => b.length - a.length)[0] || [];
}

export function getMaxListToEnd(sourceId: string, map: Map<string, string[]>) {
  const arr: string[][] = [];
  const sourceArray = map.get(sourceId);
  if (!sourceArray) {
    return [];
  }
  for (const item of sourceArray) {
    const spreadList = getMaxListToEnd(item, map);
    if (spreadList?.length) {
      arr.push([sourceId, ...spreadList]);
    } else {
      arr.push([sourceId, item]);
    }
  }
  if (arr?.length === 1) {
    return arr[0];
  }
  return arr.sort((a, b) => b.length - a.length)[0];
}
