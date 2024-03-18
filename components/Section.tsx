import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("flex justify-center w-full h-auto py-12", {
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
}

const Section = ({
  className,
  contentClassName,
  children,
  variant,
}: React.PropsWithChildren<SectionProps>) => {
  return (
    <section className={cn(sectionVariants({ variant, className }))}>
      <div
        className={cn(
          "max-w-[1280px] w-full m-auto text-center space-y-12 text-pretty text-2xl font-light leading-relaxed px-4 md:px-20",
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export { Section };
