import type { CartItem, ICartService } from "./cart-types";

export class LocalCartService implements ICartService {
  private STORAGE_KEY = "flavor_fusion_cart";
  constructor() {}

  getItems(): Promise<CartItem[]> {
    try {
      const items: CartItem[] = JSON.parse(
        localStorage.getItem(this.STORAGE_KEY) || "[]"
      );
      return Promise.resolve(items);
    } catch (error) {
      console.error(
        "Failed to parse local storage cart, resetting to empty.",
        error
      );
      return Promise.resolve([]);
    }
  }

  async addItem(item: CartItem): Promise<void> {
    const items = await this.getItems();
    const foundIndex = items.findIndex(
      (i) => i.menuItem.slug === item.menuItem.slug
    );

    let updateItems: CartItem[];

    if (foundIndex > -1) {
      updateItems = items.map((cartItem, index) =>
        index === foundIndex
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    } else {
      updateItems = [...items, item];
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updateItems));
  }

  async removeItem(item: CartItem): Promise<void> {
    const items = await this.getItems();
    items.filter((i) => i.menuItem.slug !== item.menuItem.slug);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  // TODO: Update this function
  async updateItem(item: CartItem, quantity: number): Promise<void> {}

  async clear(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
