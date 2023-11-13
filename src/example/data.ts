import dayjs from 'dayjs';

import { genRandomStr } from './utils';

export type TagItem = { name: string; id: string };
export const TagList: TagItem[] = [
  {
    name: 'Blank Me 美妆A',
    id: 'A',
  },
  {
    name: 'Blank Me 美妆B',
    id: 'B',
  },
  {
    name: 'Blank Me 美妆C',
    id: 'C',
  },
  {
    name: 'Blank Me 美妆D',
    id: 'D',
  },
];
export const dataList = [
  {
    start: dayjs().subtract(2.5, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(3, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  {
    start: dayjs().subtract(1.5, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(3, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  {
    start: dayjs().subtract(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  {
    start: dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  {
    start: dayjs().subtract(5, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().subtract(3, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[1].id,
  },
  {
    start: dayjs()
      .add(1, 'day')
      .subtract(1, 'hour')
      .format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().add(1, 'day').add(2, 'hour').format('YYYY-MM-DD HH:mm:ss'),
    id: genRandomStr(),
    tag: TagList[0].id,
  },
];
