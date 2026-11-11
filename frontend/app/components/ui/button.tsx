import type React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  css?: string;
  children: React.ReactNode;
}
export function Button({ css, children, onClick, ...props }: ButtonProps) {
  return (
    <button
      className={`${css} p-[.5rem] bg-purple-500 rounded-sm hover:bg-purple-400 cursor-pointer text-white font-bold active:scale-95`}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
