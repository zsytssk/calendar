import dayjs from 'dayjs';

import { TagList, dataList } from '../data';
import { genRandomStr } from '../utils';

// export const dataLocalList = [
//   {
//     start: dayjs().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
//     end: dayjs().add(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
//     id: genRandomStr(),
//     tag: TagList[0].id,
//   },
//   ...dataList,
// ];
export const dataLocalList = [
  {
    start: '2023-01-05 11:56:23',
    end: '2023-01-06 00:00:00',
    id: genRandomStr(),
    tag: TagList[0].id,
  },
  ...dataList,
];
