import React from "react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

export interface NavItemType {
  link: string;
  icon: LucideIcon;
  text: string;
}
export function MainNavigation({ items }: { items: NavItemType[] }) {
  return (
    <nav className="hidden md:flex gap-1">
      {items.map(({ link, icon: Icon, text }) => (
        <NavLink
          key={text}
          to={link}
          className="whitespace-nowrap flex gap-1 items-center capitalize font-semibold text-lg text-black hover:bg-purple-400 rounded-sm p-1 cursor-pointer"
        >
          <Icon /> {text}
        </NavLink>
      ))}
    </nav>
  );
}
