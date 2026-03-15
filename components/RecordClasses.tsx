"use client";

import { useEffect, useState, useMemo } from "react";
import { ANIMATION } from "@/lib/constants";

const RECORD_TYPES = [
  "wallet address",
  "social handles",
  "website URL",
  "bio",
  "avatar",
] as const;

type RecordType = (typeof RECORD_TYPES)[number];

const RecordClasses = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const currentRecord = useMemo(() => RECORD_TYPES[index], [index]);

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
    <span
      className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 text-sm font-bold rounded-md mx-1 inline-block min-w-[110px] text-center"
    >
      <span
        className={`transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {currentRecord}
      </span>
    </span>
  );
};

export { RecordClasses };
export type { RecordType };
