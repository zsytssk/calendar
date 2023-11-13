import { useLayoutEffect, useRef } from 'react';

/** 在触发click的过程中移动了鼠标*/
export function useUnMoveClick(
  boxRef: React.RefObject<HTMLDivElement>,
  fn: (e: MouseEvent) => void,
) {
  const fnRef = useRef<typeof fn>();

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useLayoutEffect(() => {
    if (!boxRef.current) {
      return;
    }
    const box = boxRef.current;
    let target: EventTarget | null;
    const mousedownFn = (e: MouseEvent) => {
      target = e.target;
    };
    const clickFn = (e: MouseEvent) => {
      if (target && target !== e.target) {
        return;
      }
      fnRef.current?.(e);
    };

    box.addEventListener('mousedown', mousedownFn);
    box.addEventListener('click', clickFn);
    return () => {
      box.removeEventListener('mousedown', mousedownFn);
      box.removeEventListener('click', clickFn);
    };
  }, [boxRef]);
}
