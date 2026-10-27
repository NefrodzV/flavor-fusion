import React from "react";
import type { CartItem as CartItemType } from "~/services";
import { CartItem } from "./cart-item";
interface CartListType {
  items: CartItemType[];
  onUpdateItem(item: CartItemType, value: number): void | Promise<void>;
  onRemoveItem(item: CartItemType): void | Promise<void>;
}
export function CartList({ items, onUpdateItem, onRemoveItem }: CartListType) {
  return (
    <div className="w-full flex flex-col gap-3">
      {items.map((item) => (
        <CartItem
          item={item}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
}
