import React from "react";

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`shadow-sm rounded-sm border-purple-100 border-1 ${className}`}
    >
      {children}
    </div>
  );
}
