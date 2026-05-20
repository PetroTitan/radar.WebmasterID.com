import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly as?: "div" | "section" | "header" | "footer" | "main" | "article";
}

export function Container({
  children,
  as: Tag = "div",
  className = "",
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
