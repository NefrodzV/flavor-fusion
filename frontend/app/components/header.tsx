import React from "react";
export function Header({
  children,
  css
}: {
  children: React.ReactNode;
  css: string;
}) {
  return (
    <header
      className={`${css} px-[5%] bg-purple-200 min-h-[50px] flex items-center justify-between`}
    >
      {children}
    </header>
  );
}
