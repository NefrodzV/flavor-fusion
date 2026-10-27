import React from "react";
import { CartList } from "./cart-list";
import type { CartItem } from "~/services";

interface CartSectionType {
  items: CartItem[];
  onUpdateItem: (item: CartItem, value: number) => void | Promise<void>;
  onRemoveItem: (item: CartItem) => void | Promise<void>;
}

export function CartSection({
  items,
  onUpdateItem,
  onRemoveItem
}: CartSectionType) {
  return (
    <section className="md:col-span-2">
      <CartList
        items={items}
        onUpdateItem={onUpdateItem}
        onRemoveItem={onRemoveItem}
      />
    </section>
  );
}
