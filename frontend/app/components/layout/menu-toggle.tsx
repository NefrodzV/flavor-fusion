import React from "react";

export function MenuToggle({
  menuIsActive,
  onClick,
  css
}: {
  menuIsActive: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  css: string;
}) {
  return (
    <button
      aria-label="Toggle navigation menu"
      aria-expanded={menuIsActive}
      aria-controls="hamburger-menu"
      onClick={() => onClick((prev) => !prev)}
      className={`${css} relative h-[30px] w-[35px] border-none bg-transparent p-0 cursor-pointer`}
    >
      <div
        className={`pointer-events-none absolute ${menuIsActive ? "top-1/2 rotate-45" : "top-0"} h-[4px] w-full rounded bg-black transition-all duration-500 ease-[cubic-bezier(0.8,0.5,0.2,1.4)]`}
      ></div>
      <div
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 h-[4px] ${menuIsActive ? "-translate-x-1/2 opacity-0" : ""} w-full rounded bg-black transition-all duration-500 ease-[cubic-bezier(0.8,0.5,0.2,1.4)]`}
      ></div>
      <div
        className={`pointer-events-none absolute ${menuIsActive ? "top-1/2 -rotate-45" : "bottom-0"} h-[4px] w-full rounded bg-black transition-all duration-500 ease-[cubic-bezier(0.8,0.5,0.2,1.4)]`}
      ></div>
    </button>
  );
}
