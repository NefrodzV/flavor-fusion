import type React from "react";

export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-[.5rem] bg-purple-200 rounded-sm hover:bg-purple-400 cursor-pointer">
      {children}
    </button>
  );
}
