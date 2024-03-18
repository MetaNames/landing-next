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
  const [recordClass, setRecordClass] = useState(recordClasses[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setRecordClass(
          recordClasses[Math.floor(Math.random() * recordClasses.length)]
        );
        setIsVisible(true);
      }, 500); // Adjust this timeout based on your desired fade duration
    }, 5000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`bg-white text-primary p-2 text-sm font-bold rounded-md mx-2`}
    >
      <span
        className={`transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {recordClass}
      </span>
    </span>
  );
};

export { RecordClasses };
