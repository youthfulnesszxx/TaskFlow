import { useState, useEffect, useCallback } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300
) {
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
      const newTimeout = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimeoutRef(newTimeout);
    },
    [callback, delay, timeoutRef]
  );

  return debouncedCallback;
}
