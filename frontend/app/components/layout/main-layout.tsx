import React from "react";
export function MainLayout({
  children,
  css
}: {
  css?: string;
  children: React.ReactNode;
}) {
  return <main className={`${css} px-2 sm:px-4 `}>{children}</main>;
}
