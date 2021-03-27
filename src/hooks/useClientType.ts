import { useMemo } from 'react';

export default function useClientType() {
  const clientType = useMemo(() => {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return { iOS: true };
    }
    if (/(Android)/i.test(navigator.userAgent)) {
      return { Android: true };
    }
    return { PC: true };
  }, []);
  return clientType;
}
