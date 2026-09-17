import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}: ButtonLinkProps) {
  const classes = `button-link button-link--${variant} ${className}`;

  if (href?.startsWith("/") && !props.target) {
    return (
      <Link className={classes} to={href}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
}
