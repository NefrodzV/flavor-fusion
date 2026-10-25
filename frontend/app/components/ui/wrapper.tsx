import React from "react";

export function Wrapper({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}
