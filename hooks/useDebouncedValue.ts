"use client";

import { useEffect, useState } from "react";

/**
 * Delays propagating `value` until it has stopped changing for `delay` ms —
 * keeps the availability lookup off every keystroke.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
