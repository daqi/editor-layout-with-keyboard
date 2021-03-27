import { useLayoutEffect, useState } from 'react';

type Size = { width?: number; height?: number };

export default function useSize(dom?: null | Element) {
  const [state, setState] = useState<Size>(() => {
    return {
      width: ((dom || {}) as HTMLElement).clientWidth,
      height: ((dom || {}) as HTMLElement).clientHeight,
    };
  });

  useLayoutEffect(() => {
    if (!dom) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(dom);
    return () => {
      resizeObserver.disconnect();
    };
  }, [dom]);

  return state;
}
