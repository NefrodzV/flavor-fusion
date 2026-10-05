import React from "react";
import { Loader as LoaderIcon } from "lucide-react";

export function Loader({
  children,
  isLoading
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="relative bg-gray-100 w-full h-full">
      {isLoading ? (
        <LoaderIcon className="absolute animate-[spin_2s_linear_infinite] top-1/2 left-1/2" />
      ) : (
        children
      )}
    </div>
  );
}
