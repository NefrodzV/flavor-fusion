import React from "react";
import { CartList } from "./cart-list";
import type { CartItem } from "~/services";

export function CartSection({ items }: { items: CartItem[] }) {
  return (
    <section className="md:col-span-2">
      <CartList items={items} />
    </section>
  );
}
