import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]",
        secondary: "bg-white text-primary hover:bg-white/90 hover:shadow-lg hover:shadow-white/30 hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    icon?: React.ReactNode;
    component?: React.ElementType;
  } & Partial<LinkProps>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      component,
      asChild = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = props?.href ? Link : asChild ? Slot : component || "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          icon && "gap-3"
        )}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
