import React, { useRef, useEffect } from 'react';
import { EventPrevent } from 'src/utils';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type BlurPreventProps = { onClick?: (e: TouchEvent) => void; touchMovePrevent?: boolean };

const BlurPrevent: React.FC<DivProps & BlurPreventProps> = ({
  children,
  onClick,
  touchMovePrevent,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const startRef = useRef<boolean>(false);
  const moveRef = useRef<boolean>(false);

  const handleTouchStart = () => {
    moveRef.current = false;
    startRef.current = true;
  };

  useEffect(() => {
    if (!touchMovePrevent) return;

    const handler = (e: TouchEvent) => {
      EventPrevent(e);
    };
    const dom = ref.current!;

    dom.addEventListener('touchmove', handler, { passive: false });

    return () => {
      dom.removeEventListener('touchmove', handler);
    };
  }, [touchMovePrevent]);

  useEffect(() => {
    const handleTouchEnd = (e: TouchEvent) => {
      if (!startRef.current) return;
      startRef.current = false;

      if (moveRef.current) return;

      EventPrevent(e);
      if (onClick) onClick(e);
    };
    const dom = ref.current!;

    dom.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      dom.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onClick]);

  return (
    <div ref={ref} {...props} onTouchStart={handleTouchStart}>
      {children}
    </div>
  );
};

export default BlurPrevent;
