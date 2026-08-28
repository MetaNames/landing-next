import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full py-16 sm:py-20 relative", {
  variants: {
    variant: {
      // The page sits on one dark ground; sections separate by a hairline rule
      // and a barely-there surface tint rather than by flipping colour schemes.
      default: "border-t border-border/60",
      muted: "border-t border-border/60 bg-card/40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SectionProps extends VariantProps<typeof sectionVariants> {
  className?: string;
  contentClassName?: string;
  id?: string;
  title?: string;
  eyebrow?: string;
}

export function Section({
  className,
  contentClassName,
  children,
  variant,
  id,
  title,
  eyebrow,
}: React.PropsWithChildren<SectionProps>) {
  return (
    <section
      id={id}
      className={cn(sectionVariants({ variant, className }))}
      aria-labelledby={title && id ? `${id}-title` : undefined}
    >
      <div
        className={cn(
          "container mx-auto px-4 flex flex-col items-center gap-6 text-center",
          contentClassName,
        )}
      >
        {eyebrow && (
          <span className="glass-panel rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
            {eyebrow}
          </span>
        )}
        {title && (
          <h2
            id={id ? `${id}-title` : undefined}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-balance"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
