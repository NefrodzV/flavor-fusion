import React from "react";
import { Trash, Plus, Minus } from "lucide-react";
import { Image } from "~/components/ui/image";
import type { CartItem } from "~/services";
export function CartItem({
  item,
  onUpdateItem,
  onRemoveItem
}: {
  item: CartItem;
  onUpdateItem(item: CartItem, value: number): void | Promise<void>;
  onRemoveItem(item: CartItem): void | Promise<void>;
}) {
  const decreaseIsDisabled = item.quantity <= 1;
  async function handleIncrement() {
    await onUpdateItem(item, item.quantity + 1);
  }

  async function handleDecrement() {
    if (item.quantity <= 1) return;
    await onUpdateItem(item, item.quantity - 1);
  }

  async function handleDelete() {
    await onRemoveItem(item);
  }

  return (
    <article
      data-testid={item.menuItem.slug}
      className="overflow-hidden p-2 sm:p-4 grid gap-4 grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] shadow-sm rounded-sm border-1 border-solid border-purple-100"
    >
      <Image
        css={"block h-24 sm:h-28 w-full rounded-sm object-cover"}
        src="/chicken-rice-plate-small.jpg"
      />
      <div className=" flex flex-col">
        <div className="flex justify-between gap-1">
          <div>
            <h3 className="text-base md:text-lg font-semibold ">
              {item.menuItem.name}
            </h3>
            <p className="text-sm text-gray-500">
              $ {(item.menuItem.price_cents / 100).toFixed(2)}
            </p>
          </div>
          <button
            data-testid={`${item.menuItem.slug}-delete`}
            onClick={handleDelete}
            className={`cursor-pointer block p-1 rounded-sm border-red-300 bg-red-100/50 border-solid border-1 w-min h-min active:scale-95`}
          >
            <Trash color="red" width={14} height={14} />
          </button>
        </div>

        <div className="text-sm  flex justify-between mbs-auto mbe-0">
          <div className="flex gap-1 ">
            <button
              aria-label="Decrease quantity"
              data-testid={`${item.menuItem.slug}-decrement`}
              onClick={handleDecrement}
              className={`cursor-pointer border-1 border-solid  p-1 rounded-sm items-center ${decreaseIsDisabled ? "border-gray-400 bg-gray-100" : "active:scale-95 border-purple-400 bg-purple-100/80 active:none"}`}
              disabled={decreaseIsDisabled}
            >
              <Minus width={14} height={14} />
            </button>
            <span
              className="text-base flex items-center"
              data-testid={`${item.menuItem.slug}-quantity`}
            >
              {item.quantity}
            </span>
            <button
              aria-label="Increase quantity"
              data-testid={`${item.menuItem.slug}-increment`}
              onClick={handleIncrement}
              className="cursor-pointer border-1 border-solid border-purple-400 p-1 bg-purple-100/80 rounded-sm items-center active:scale-95"
            >
              <Plus width={14} height={14} />
            </button>
          </div>
          <span className="text-base font-semibold">
            $ {((item.menuItem.price_cents * item.quantity) / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}
