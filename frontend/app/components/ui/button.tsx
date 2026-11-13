import { isDisabled } from "@testing-library/user-event/dist/cjs/utils/index.js";
import type React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  css?: string;

  children: React.ReactNode;
}
export function Button({
  css,
  children,
  disabled = false,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${css} p-[.5rem] rounded-sm  font-bold  ${disabled ? "bg-gray-300 active:none text-black cursor-not-allowed" : "bg-purple-500 active:scale-95 text-white hover:bg-purple-400 cursor-pointer"} transition duration-300 `}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
