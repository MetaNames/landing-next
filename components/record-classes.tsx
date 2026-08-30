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
    <span className="glass-panel inline-block rounded-lg px-3 py-1 mx-1 min-w-[11rem] text-center align-middle text-primary-glow">
      <span
        className={`transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {RECORD_TYPES[index]}
      </span>
    </span>
  );
}

export type { RecordType };
