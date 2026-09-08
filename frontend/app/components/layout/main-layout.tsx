import React from "react";
export function MainLayout({ children }: { children: React.ReactNode }) {
  return <main className="px-[10%] py-[5%]">{children}</main>;
}
