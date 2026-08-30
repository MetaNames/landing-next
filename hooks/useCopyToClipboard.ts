"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RESET_DELAY = 2000;

/**
 * Copies text and flips `copied` for a couple of seconds so the caller can
 * swap its icon. Returns `false` when the clipboard API is unavailable
 * (insecure origin, older browser) so the UI can stay honest.
 */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(async (text: string) => {
    if (!navigator.clipboard) return false;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), RESET_DELAY);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { copied, copy };
}
