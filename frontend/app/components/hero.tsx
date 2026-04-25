import type React from "react";
export function Hero({
  children,
  css,
}: {
  css: string;
  children: React.ReactNode;
}) {
  return <div className={css}>{children}</div>;
}

Hero.Content = function HeroContent({
  children,
  css,
}: {
  css: string;
  children: React.ReactNode;
}) {
  return <div className={css}>{children}</div>;
};
