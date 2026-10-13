import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};
export function Button({
  href,
  external,
  variant = "gold",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  const classes = cn(
    "button",
    `button-${variant}`,
    `button-${size}`,
    className,
  );
  if (href)
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
