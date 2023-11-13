import dayjs, { Dayjs } from 'dayjs';

import { DataItem, FilledItem } from '../api';

/**
 * 周内跨天排列
 * @param firstDay 周的第一天
 * @param dataList 数据
 * @param maxRow 最大行数
 */
export function layoutWeekCrossDay(
  firstDay: Dayjs,
  dataList: DataItem[],
  maxRow = 2,
) {
  const newDataList = [...dataList].sort((a, b) =>
    dayjs(a.start).diff(b.start),
  );
  const diffDay = firstDay.unix();
  const filledArray: FilledItem[] = [];
  for (const item of newDataList) {
    let x = dayjs(item.start).startOf('day').diff(firstDay, 'day');
    let space = dayjs(item.end).endOf('day').diff(item.start, 'day') + 1;

    if (x < 0) {
      space = space + x;
      x = 0;
    }
    // 最大宽度不能超过一周
    if (space + x > 7) {
      space = 7 - x;
    }
    const yArr: number[] = [];
    for (let i = 0; i < space; i++) {
      const newX = x + i;
      const y = findMaxYInColumns(newX, filledArray);
      yArr.push(y);
    }
    let itemY = 0;
    if (yArr?.length) {
      itemY = Math.max(...yArr);
    }
    if (itemY >= maxRow) {
      continue;
    }
    filledArray.push({
      ...item,
      x,
      y: itemY,
      diffDay,
      space,
    });
  }

  return filledArray;
}

export function findMaxYInColumns(x: number, filledArray: FilledItem[]) {
  let y = 0;
  for (const item of filledArray) {
    if (x < item.x) {
      continue;
    }
    if (x - item.x >= item.space) {
      continue;
    }
    y = item.y + 1;
  }
  return y;
}

export function hasItemInGrid(
  pos: { x: number; y: number },
  filledArray: FilledItem[],
) {
  for (const item of filledArray) {
    if (pos.y !== item.y) {
      continue;
    }
    if (pos.x - item.x >= item.space) {
      continue;
    }
    return true;
  }
  return false;
}

export const getCellCrossDayNum = (index: number, showData: FilledItem[]) => {
  let y = 0;
  for (const item of showData) {
    if (index < item.x) {
      continue;
    }
    if (index - item.x >= item.space) {
      continue;
    }
    y = item.y + 1;
  }
  return y;
};

export const getMaxRowCrossDayNum = (showData: FilledItem[]) => {
  const yArr: number[] = [];
  for (let i = 0; i < 7; i++) {
    const y = findMaxYInColumns(i, showData);
    yArr.push(y);
  }
  return Math.max(...yArr);
};
