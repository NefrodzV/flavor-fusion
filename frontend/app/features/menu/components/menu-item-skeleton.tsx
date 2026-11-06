import React from "react";

export function MenuItemSkeleton() {
  return (
    <div className="bg-gray-200 animate-pulse rounded-sm">
      {/* Image placeholder */}
      <div className="aspect-3/2" />
      {/* Content placeholder */}
      <div className="flex items-center justify-between">
        <div className="h-18"></div>
        <div className="h-18"></div>
      </div>
    </div>
  );
}
