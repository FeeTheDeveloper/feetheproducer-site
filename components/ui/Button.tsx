import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "gold" | "red" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-widerx transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold-gradient text-ink shadow-gold hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
  red: "bg-red-gradient text-white shadow-ember hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
  outline:
    "border border-gold/60 bg-transparent text-gold hover:bg-gold/10 hover:border-gold",
  ghost:
    "bg-white/5 text-bone hover:bg-white/10 border border-white/10 backdrop-blur"
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm md:text-base"
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "gold", size = "md", className, children } = props;
  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    ...rest
  } = props;
  void _variant;
  void _size;
  void _className;
  void _children;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
