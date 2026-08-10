import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "line";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "dark", external, className = "" }: ButtonProps) {
  const props = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <Link className={`button button-${variant} ${className}`} href={href} {...props}>
      <span>{children}</span><span aria-hidden="true">↗</span>
    </Link>
  );
}

