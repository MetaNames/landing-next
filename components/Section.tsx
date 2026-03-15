"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("flex justify-center w-full h-auto py-12 md:py-20", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface SectionProps extends VariantProps<typeof sectionVariants> {
  className?: string;
  contentClassName?: string;
  id?: string;
  delay?: number;
}

const Section = ({
  className,
  contentClassName,
  children,
  variant,
  id,
  delay = 0,
}: React.PropsWithChildren<SectionProps>) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(sectionVariants({ variant, className }))}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div
        className={cn(
          "max-w-[1280px] w-full m-auto text-center space-y-8 md:space-y-12 text-xl md:text-2xl font-light leading-relaxed px-4 md:px-8 lg:px-20",
          contentClassName
        )}
      >
        {children}
      </div>
    </motion.section>
  );
};

export { Section };
