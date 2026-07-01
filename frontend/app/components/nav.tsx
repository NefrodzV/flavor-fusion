import React from "react";
import { Image } from "./image";
import type { LucideIcon } from "lucide-react";
export function Nav({
  children,
  css
}: {
  children: React.ReactNode;
  css: string;
}) {
  return <nav className={css}>{children}</nav>;
}

Nav.Item = function NavItem({
  css,
  text,
  icon: Icon,
  link
}: {
  css: string;
  text: string;
  icon?: LucideIcon;
  link: string;
}) {
  return (
    <a className={css} href={link}>
      {Icon && <Icon />}
      <span>{text}</span>
    </a>
  );
};
