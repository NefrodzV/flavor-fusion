import type React from "react";

export function Button({ children }: { children: React.ReactNode }) {
  return <button className="bg-purple-200">{children}</button>;
}
