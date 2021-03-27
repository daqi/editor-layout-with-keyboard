import React, { useRef, useEffect } from 'react';
import { EventPrevent } from 'src/utils';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const TouchMovePrevent: React.FC<DivProps> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: TouchEvent) => {
      EventPrevent(e);
    };
    const dom = ref.current!;

    dom.addEventListener('touchmove', handler, { passive: false });

    return () => {
      dom.removeEventListener('touchmove', handler);
    };
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export default TouchMovePrevent;
