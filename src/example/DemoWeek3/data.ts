import dayjs from 'dayjs';

import { TagList, dataList } from '../data';
import { genRandomStr } from '../utils';

export const dataLocalList = [
  {
    start: dayjs().add(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  {
    start: dayjs().add(-1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  {
    start: dayjs().subtract(0, 'day').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  {
    start: dayjs().subtract(0, 'day').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  ...dataList,
];
