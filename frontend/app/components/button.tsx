import type React from "react";

export function Button({css, children }: { css?: string children: React.ReactNode }) {
  return (
    <button className={`${css} p-[.5rem] bg-purple-500 rounded-sm hover:bg-purple-400 cursor-pointer text-white font-bold`}>
      {children}
    </button>
  );
}
