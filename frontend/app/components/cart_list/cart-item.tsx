import React from "react";
import { Trash, Plus, Minus } from "lucide-react";
import { Image } from "../image";
import type { CartItem } from "~/services";
export function CartItem({ item }: { item: CartItem }) {
  return (
    <article className="overflow-hidden p-2 sm:p-4 grid gap-4 grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] shadow-sm rounded-sm border-1 border-solid border-purple-100">
      <Image
        css={"block h-24 sm:h-28 w-full rounded-sm object-cover"}
        src="/chicken-rice-plate-small.jpg"
      />
      <div className=" flex flex-col">
        <div className="flex justify-between gap-1">
          <div className="">
            <h3 className="text-base md:text-lg font-semibold ">{item.name}</h3>
            <p className="text-sm text-gray-500">
              $ {(item.price / 100).toFixed(2)}
            </p>
          </div>
          <button className="cursor-pointer block p-1 rounded-sm border-red-300 bg-red-100/50 border-solid border-1 w-min h-min">
            <Trash color="red" width={14} height={14} />
          </button>
        </div>

        <div className="text-sm  flex justify-between mbs-auto mbe-0">
          <div className="flex gap-1 ">
            <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
              <Minus width={14} height={14} />
            </button>
            <span className="text-base flex items-center">{item.quantity}</span>
            <button className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center">
              <Plus width={14} height={14} />
            </button>
          </div>
          <span className="text-base font-semibold">
            $ {((item.price * item.quantity) / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}
