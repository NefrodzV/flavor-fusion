import type { CartItem, ICartService } from "./cart-types";
import { env } from "~/env";
export class CartApi implements ICartService {
  async getItems(): Promise<CartItem[]> {
    const res = await fetch(`${env.apiUrl}/api/cart`, {
      method: "GET",
      credentials: "include"
    });

    if (!res.ok)
      throw new Error(
        `Get items from api failed status: ${res.status}, ${res.statusText}`
      );

    const cartItems: CartItem[] = await res.json();
    return cartItems;
  }
  async addItem(item: CartItem): Promise<void> {
    const res = await fetch();
  }
}
