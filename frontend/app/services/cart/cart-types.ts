import type { MenuItem } from "../menu/menu-types";

export interface CartItem {
  id?: number;
  menuItem: MenuItem;
  quantity: number;
}

export interface ICartService {
  getItems(): Promise<CartItem[]>;
  addItem(item: CartItem): Promise<void>;
  updateItem(item: CartItem, quantity: number): Promise<void>;
  removeItem(item: CartItem): Promise<void>;
}
