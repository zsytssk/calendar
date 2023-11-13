import dayjs from 'dayjs';

export function formatHour(num: number) {
  if (num < 10) {
    return `0${num}:00`;
  }
  return `${num}:00`;
}

export function getPercent(num?: number) {
  if (!num) {
    return 0;
  }

  return Number((num * 100).toFixed(2));
}

export function needHideHourFn(hour: number, isWeek = false) {
  if (isWeek && dayjs().day() !== 0) {
    return false;
  }
  const hourDayjs = dayjs().hour(hour).startOf('hour');
  const diffMinutes = Math.abs(dayjs().diff(hourDayjs, 'minute'));
  return diffMinutes < 10;
}

export function calcEventPosPercent(
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
) {
  const bounds = (e.target as HTMLDivElement).getBoundingClientRect();
  // const x = Math.ceil(e.clientX - bounds.left);
  const y = Math.ceil(e.clientY - bounds.top);
  const percent = y / bounds.height;
  return percent;
}

export function calcClosetNum(
  childNode: HTMLElement,
  parentNode: HTMLElement,
  num = 0,
): number {
  if (childNode === parentNode) {
    return num;
  }
  if (!childNode?.parentNode) {
    return -1;
  }
  return calcClosetNum(
    childNode?.parentNode as HTMLElement,
    parentNode,
    num + 1,
  );
}
