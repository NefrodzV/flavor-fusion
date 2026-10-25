import React from "react";
const fontSizes = {
  large: "text-xl sm:text-3xl",
  medium: "text-lg sm:text-2xl",
  normal: "text-base sm:text-lg"
} as const;

export function Heading({
  as: Element,
  children,
  fontSize,
  className
}: {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  children: React.ReactNode;
  fontSize: keyof typeof fontSizes;
  className: string;
}) {
  return (
    <Element className={`${fontSizes[fontSize]} ${className}`}>
      {children}
    </Element>
  );
}
