import React from "react";
import { MenuItemSkeleton } from "./menu-item-skeleton";

export function MenuGridSkeleton() {
  const array = Array.from({ length: 8 });
  return (
    <div className="flex flex-col gap-8">
      <div className="h-16 bg-gray-200 animate-pulse"></div>

      <div className="relative h-full w-full grid grid-cols-1 grid-rows-none gap-8 md:grid-cols-2">
        {array.map((el) => (
          <MenuItemSkeleton />
        ))}
      </div>
    </div>
  );
}
