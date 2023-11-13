import { useCalendarStore } from '../store/calendarStore';

export function useCalendarInfo() {
  const { curDate, type } = useCalendarStore();
  return { curDate, type };
}
