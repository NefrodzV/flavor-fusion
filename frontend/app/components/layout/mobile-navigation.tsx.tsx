import React from "react";
import type { NavItemType } from "./main-navigation";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

export function MobileNavigation({
  items,
  isOpen
}: {
  items: NavItemType[];
  isOpen: boolean;
}) {
  const mobileNavStyle = `${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-[-100%] opacity-0 pointer-events-none"} z-10 md:hidden transition-all duration-300 p-[5%] absolute grid grid-cols-2 sm:grid-cols-3 top-[100%] left-0 right-0 bg-purple-200 gap-2`;

  return (
    <nav className={mobileNavStyle}>
      {items.map(({ link, icon: Icon, text }) => (
        <NavLink
          to={link}
          className="flex flex-col justify-center items-center min-h-[100px] capitalize font-semibold text-lg text-black hover:bg-purple-400 rounded-sm p-2 cursor-pointer border-black border"
        >
          <Icon /> {text}
        </NavLink>
      ))}
    </nav>
  );
}
