"use client";

import { useEffect, useState } from "react";

import { ANIMATION } from "@/lib/constants";

const RECORD_TYPES = [
  "wallet address",
  "social handles",
  "website URL",
  "bio",
  "avatar",
] as const;

type RecordType = (typeof RECORD_TYPES)[number];

export function RecordClasses() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % RECORD_TYPES.length);
        setIsVisible(true);
      }, ANIMATION.RECORD_FADE_DURATION);
    }, ANIMATION.RECORD_CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    /* Every option is laid over the same grid cell: the slot is as wide as the
       longest record type from the first frame, so the sentence never reflows
       mid-rotation and no magic min-width has to be kept in sync with the list. */
    <span className="inline-grid align-baseline text-primary-glow">
      {RECORD_TYPES.map((type, i) => (
        <span
          key={type}
          aria-hidden={i === index ? undefined : "true"}
          className={`col-start-1 row-start-1 whitespace-nowrap transition-opacity duration-300 ${
            i === index && isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {type}
        </span>
      ))}
    </span>
  );
}

export type { RecordType };
