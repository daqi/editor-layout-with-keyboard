import { useState, useEffect } from 'react';

function getValue() {
  return window.visualViewport
    ? {
        width: window.visualViewport.width,
        height: window.visualViewport.height,
      }
    : {
        width: window.innerWidth,
        height: window.innerHeight,
      };
}

export default function useVisualViewport() {
  const [viewport, setViewport] = useState(getValue());

  useEffect(() => {
    const handler = () => {
      if (!window.visualViewport) return;
      setViewport(getValue());
    };

    window.visualViewport.addEventListener('resize', handler);
    window.visualViewport.addEventListener('scroll', handler);

    return () => {
      window.visualViewport.removeEventListener('resize', handler);
      window.visualViewport.removeEventListener('scroll', handler);
    };
  }, []);

  return viewport;
}
