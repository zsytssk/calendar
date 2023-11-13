import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { Size, useDaySizeStore } from '../store/daySizeStore';

type CalcFn = (size: Size) => Size;
/** 设置一天对应的宽高 */
export function useSetDaySize(
  boxRef: React.RefObject<HTMLDivElement>,
  calFn?: CalcFn,
) {
  const { setSize } = useDaySizeStore();
  const calFnRef = useRef<typeof calFn>();

  useLayoutEffect(() => {
    calFnRef.current = calFn;
  }, [calFn]);

  useEffect(() => {
    if (!boxRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      if (!boxRef.current) {
        return;
      }
      const bounds = boxRef?.current.getBoundingClientRect();
      let size: Size = { width: bounds.width, height: bounds.height };
      if (calFnRef.current) {
        size = calFnRef.current(size);
      }
      setSize({ ...size });
    });
    resizeObserver.observe(boxRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [boxRef, setSize]);

  // useEffect(() => {
  //   const fn = () => {
  //     if (!boxRef.current) {
  //       return;
  //     }

  //     const bounds = boxRef?.current.getBoundingClientRect();
  //     let size: Size = { width: bounds.width, height: bounds.height };
  //     if (calFnRef.current) {
  //       size = calFnRef.current(size);
  //     }
  //     setSize({ ...size });
  //   };

  //   window.addEventListener('resize', fn);
  //   const timeout = setTimeout(() => {
  //     fn();
  //   }, 300);
  //   return () => {
  //     clearTimeout(timeout);
  //     window.removeEventListener('resize', fn);
  //   };
  // }, [boxRef, setSize]);
}

/** 设置一天对应的宽高 */
export function useGetDaySize() {
  const { width, height } = useDaySizeStore();

  return useMemo(() => {
    return { width, height };
  }, [width, height]);
}
