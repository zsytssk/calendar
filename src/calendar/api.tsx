import dayjs, { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

export type OverlayDataItem = {
  /** 重合数目 */
  overlayNum: number;
  /** 重合中的排序 */
  overlayIndex: number;
} & DataItem;

export type FilledItem = DataItem & {
  x: number;
  y: number;
  space: number;
  /** 跨天对比的日期 */
  diffDay: number;
};

export type DataItem = {
  start: string;
  end: string;
  id: string;
  isCreate?: boolean;
};
export type CalendarType = 'day' | 'week' | 'month';
export type DateInfo = {
  date: dayjs.Dayjs;
  grey?: boolean;
  cur: boolean;
};

export type BodyItemPos = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
export type CalcPosFn = (
  curDate?: Dayjs,
  data?: OverlayDataItem,
) => BodyItemPos | undefined;

export type CalendarApi = {
  type: CalendarType;
  initDate?: string;
  className?: string;
  bodyClassName?: string;
  dataList?: DataItem[];
  dataRender?: (data: DataItem) => ReactNode;
  headRender?: (date?: Dayjs) => ReactNode;
  bodyRender?: (date?: Dayjs) => ReactNode;
  onTypeChange?: (type: CalendarType) => void;
  onPanelChange?: (date: dayjs.Dayjs) => void;
  /**
   * @param crossDayNum 当前日的跨天个数
   */
  dateCellRender?: (date: dayjs.Dayjs, crossDayNum?: number) => ReactNode;
  dateFullCellRender?: (date: dayjs.Dayjs, crossDayNum?: number) => ReactNode;
  onSelect?: (date: dayjs.Dayjs, hour?: string) => void;
};
