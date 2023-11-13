import dayjs from 'dayjs';
import create from 'zustand';

import { CalendarApi, CalendarType } from '../api';

type State = {
  innerProps: Omit<CalendarApi, 'type'>;
  setProps: (props: State['innerProps']) => void;
  type?: CalendarType;
  curDate?: dayjs.Dayjs;
  init: (type: CalendarType, date?: string) => void;
  setType: (type: CalendarType) => void;
  movePrev: () => void;
  moveNext: () => void;
  setCur: (date: dayjs.Dayjs) => void;
  reset: () => void;
};

export const useCalendarStore = create<State>((set, get) => ({
  type: undefined,
  curDate: undefined,
  innerProps: {},
  init(type: CalendarType, date?: string) {
    const { setType } = get();
    setType(type);
    if (type === 'month') {
      set({
        curDate: dayjs(date).startOf('month'),
      });
      return;
    }
    if (type === 'week') {
      set({
        curDate: dayjs(date).startOf('week'),
      });
      return;
    }
    if (type === 'day') {
      set({
        curDate: dayjs(date),
      });
      return;
    }
  },
  setProps(innerProps: State['innerProps']) {
    set({ innerProps });
  },
  setType(type: CalendarType) {
    set({ type });
  },
  setCur(date: dayjs.Dayjs) {
    const { type } = get();
    if (type === 'day') {
      set({ curDate: date?.startOf('day') });
    } else if (type === 'week') {
      set({ curDate: date });
    } else if (type === 'month') {
      set({ curDate: date?.startOf('month') });
    }
  },
  movePrev() {
    const { type, curDate } = get();
    if (type === 'month') {
      set({ curDate: curDate?.subtract(1, 'month') });
      return;
    }
    if (type === 'week') {
      set({ curDate: curDate?.subtract(1, 'week') });
      return;
    }
    if (type === 'day') {
      set({ curDate: curDate?.subtract(1, 'day') });
      return;
    }
  },
  moveNext() {
    const { type, curDate } = get();
    if (type === 'month') {
      set({ curDate: curDate?.add(1, 'month') });
      return;
    }
    if (type === 'week') {
      set({ curDate: curDate?.add(1, 'week') });
      return;
    }
    if (type === 'day') {
      set({ curDate: curDate?.add(1, 'day') });
      return;
    }
  },
  reset() {
    set({
      innerProps: {},
      curDate: undefined,
      type: undefined,
    });
  },
}));
