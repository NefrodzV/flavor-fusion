import React from "react";
export function MainLayout({
  children,
  css
}: {
  css?: string;
  children: React.ReactNode;
}) {
  return <main className={`${css} px-[10%] py-[5%]`}>{children}</main>;
}
