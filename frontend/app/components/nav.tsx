import React from "react";
import { Image } from "./image";
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
  icon,
  link
}: {
  css: string;
  text: string;
  icon?: string;
  link: string;
}) {
  return (
    <a className={css} href={link}>
      {icon ? <Image src={icon} /> : null}
      <span>{text}</span>
    </a>
  );
};
