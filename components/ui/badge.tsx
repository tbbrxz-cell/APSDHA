import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "outline" | "muted";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-army-light/50 bg-army/40 text-gold-light",
  gold: "border-gold/30 bg-gold/15 text-gold",
  outline: "border-white/15 bg-transparent text-white/80",
  muted: "border-white/10 bg-white/5 text-white/60",
};

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
