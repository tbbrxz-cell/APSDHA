import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "gold" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-army text-white shadow-soft hover:bg-army-light focus-visible:ring-gold/50",
  outline:
    "border border-white/10 bg-transparent text-white/90 hover:border-gold/30 hover:bg-white/5 hover:text-gold focus-visible:ring-gold/50",
  ghost:
    "bg-transparent text-white/80 hover:bg-white/5 hover:text-white focus-visible:ring-gold/50",
  gold:
    "bg-gold text-charcoal shadow-soft hover:bg-gold-light focus-visible:ring-gold/50",
  destructive:
    "bg-red-600/90 text-white hover:bg-red-600 focus-visible:ring-red-400/50",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 rounded-lg px-3 text-xs",
  lg: "h-12 rounded-xl px-6 text-base",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium btn-interactive",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "gold" && "hover:shadow-glow-gold-sm",
          variant === "default" && "hover:shadow-glow-gold-sm",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
