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
    // The global reduced-motion rule collapses the fade to ~0ms, which turns
    // this into text that snaps to a new word every three seconds — worse for
    // someone who asked for less motion than the fade was. Hold on the first
    // record type instead, and pick the rotation back up if the preference
    // changes mid-session.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    function sync() {
      clearInterval(interval);
      clearTimeout(timeout);
      if (reduceMotion.matches) return;

      interval = setInterval(() => {
        setIsVisible(false);

        timeout = setTimeout(() => {
          setIndex((prev) => (prev + 1) % RECORD_TYPES.length);
          setIsVisible(true);
        }, ANIMATION.RECORD_FADE_DURATION);
      }, ANIMATION.RECORD_CHANGE_INTERVAL);
    }

    sync();
    reduceMotion.addEventListener("change", sync);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      reduceMotion.removeEventListener("change", sync);
    };
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
