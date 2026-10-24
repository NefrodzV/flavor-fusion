import React, { useEffect, useState } from "react";
import { Header } from "./header";

export function MainLayout({
  children,
  css
}: {
  css?: string;
  children: React.ReactNode;
}) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 768px)");

    const handleMobileChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        return;
      }
      setMenuIsOpen(false);
    };

    mediaQuery.addEventListener("change", handleMobileChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header menuIsActive={menuIsOpen} setMenuIsActive={setMenuIsOpen} />
      <main className={`px-2 sm:px-4 py-2`}>{children}</main>
    </div>
  );
}
