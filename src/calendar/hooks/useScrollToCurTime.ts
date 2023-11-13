import { useEffect, useRef } from 'react';

export function useScrollToCurTime(
  bodyRef: React.RefObject<HTMLDivElement>,
  curLinePos?: {
    top: number;
    left: number;
  },
) {
  const scrollFlagRef = useRef(false);

  useEffect(() => {
    if (!bodyRef.current || !curLinePos?.top || scrollFlagRef.current) {
      return;
    }
    scrollFlagRef.current = true;
    const bounds = bodyRef.current.getBoundingClientRect();
    const top = curLinePos.top - bounds.height / 2;
    bodyRef.current?.scrollTo({
      top: top,
    });
  }, [curLinePos, bodyRef]);
}
