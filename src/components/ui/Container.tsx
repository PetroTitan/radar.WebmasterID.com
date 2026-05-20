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
      className={`mx-auto w-full max-w-content px-6 md:px-10 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
