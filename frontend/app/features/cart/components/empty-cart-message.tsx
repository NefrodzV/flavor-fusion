import React from "react";
import { XCircle } from "lucide-react";

export function EmptyCartMessage() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
      <XCircle className="w-12 h-12 mb-3 text-gray-400 stroke-[1.5]" />
      <p className="font-semibold text-lg text-gray-700">Your bag is empty</p>
      <p className="text-sm">Looks like you haven't added anything yet.</p>
    </div>
  );
}
