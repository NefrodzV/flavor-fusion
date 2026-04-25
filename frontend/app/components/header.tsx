import React from "react";
export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="px-[5%] bg-purple-200 min-h-[50px] flex items-center justify-between">
      {children}
    </header>
  );
}
