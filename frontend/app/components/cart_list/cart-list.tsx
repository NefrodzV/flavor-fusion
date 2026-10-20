import React from "react";
import type { CartItem as CartItemType } from "~/services";
import { CartItem } from "./cart-item";
export function CartList({ items }: { items: CartItemType[] }) {
  return (
    <section className="w-full flex flex-col gap-3 md:col-span-2">
      {items.map((item) => (
        <CartItem item={item} />
      ))}
    </section>
  );
}
