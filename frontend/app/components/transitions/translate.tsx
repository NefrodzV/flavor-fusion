import React, { useEffect, useState } from "react";

type TranslateState = "top" | "bottom" | "left" | "right";

interface TranslateProps {
  start: TranslateState;
  out: TranslateState;
  children: React.ReactNode;
  show: boolean;
}

const offsets: Record<TranslateState, string> = {
  left: "-translate-x-10 opacity-0",
  right: "translate-x-10 opacity-0",
  top: "-translate-y-10 opacity-0",
  bottom: "translate-y-10 opacity-0"
};
export function Translate({ start, out, show, children }: TranslateProps) {
  const [active, setActive] = useState(false);
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      const timer = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(timer);
    } else {
      setActive(false);
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!shouldRender) return null;

  const currentDirectionClass = active
    ? "translate-x-0 translate-y-0 opacity-100"
    : show
      ? offsets[start]
      : offsets[out];
  return (
    <div
      className={`transition-all duration-500 ease-out transform ${currentDirectionClass}}`}
    >
      {children}
    </div>
  );
}
