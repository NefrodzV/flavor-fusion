import { ApiError } from "~/errors/api-error";
import type { CartItem, ICartService } from "./cart-types";
import { env } from "~/env";
export class CartApiService implements ICartService {
  async getItems(): Promise<CartItem[]> {
    const res = await fetch(`${env.apiUrl}/api/cart`, {
      method: "GET",
      credentials: "include"
    });

    if (!res.ok)
      throw new ApiError(
        `Get items from api failed status: ${res.status}, ${res.statusText}`
      );

    const cartItems: CartItem[] = await res.json();
    return cartItems;
  }
  async addItem(item: CartItem): Promise<void> {
    const res = await fetch(`${env.apiUrl}/api/cart`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        menuItemId: item.menuItem.id,
        quantity: item.quantity
      })
    });

    if (!res.ok) {
      throw new ApiError(
        `Add item from api failed status: ${res.status}, ${res.statusText}`
      );
    }
  }

  async updateItem(item: CartItem, quantity: number): Promise<void> {
    const res = await fetch(
      `${env.apiUrl}/api/cart/items/${item.menuItem.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: quantity
        })
      }
    );

    if (!res.ok) {
      throw new ApiError(
        `Patch item from api failed status: ${res.status}, ${res.statusText}`
      );
    }
  }

  async removeItem(item: CartItem): Promise<void> {
    const res = await fetch(
      `${env.apiUrl}/api/cart/items/${item.menuItem.id}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    );

    if (!res.ok) {
      throw new ApiError(
        `Delete item from api failed status: ${res.status}, ${res.statusText}`
      );
    }
  }
}
