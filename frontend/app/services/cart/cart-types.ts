import type { MenuItem } from "../menu/menu-types";

export interface CartItem {
  id?: number;
  menuItem: MenuItem;
  quantity: number;
}

export interface ICartService {
  getItems(): Promise<CartItem[]>;
  addItem(item: CartItem): Promise<void>;
  updateItem(quantity: number, id: number | string): Promise<CartItem>;
  removeItem(id: number | string): Promise<CartItem>;
  clear(): void;
}
