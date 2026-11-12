import React from "react";

export function MainContainer({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={`px-2 sm:px-4 py-2 ${className}`}>{children}</main>;
}
