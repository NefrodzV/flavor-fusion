import React from "react";

export function Container({
  className,
  children
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}
