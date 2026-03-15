"use client";
import { useEffect, useState } from "react";

const recordClasses = [
  "wallet address",
  "social handles",
  "website URL",
  "bio",
  "avatar",
];

const RecordClasses = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % recordClasses.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 text-sm font-bold rounded-md mx-1 inline-block min-w-[100px] text-center"
    >
      <span
        className={`transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {recordClasses[index]}
      </span>
    </span>
  );
};

export { RecordClasses };
