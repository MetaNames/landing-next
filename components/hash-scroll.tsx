"use client";

import { useEffect } from "react";

/**
 * Deep links like /#pricing land at the top of the page: the browser resolves
 * the hash before the lazy panels below the fold mount, so the target sits at
 * the wrong offset (or doesn't exist yet). Re-run the jump once after mount.
 */
export function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    let frame = 0;
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
