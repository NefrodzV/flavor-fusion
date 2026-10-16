import { CartApiService } from "./cart-api";
import type { CartItem, ICartService } from "./cart-types";
import { LocalCartService } from "./local-cart";

export class CartService implements ICartService {
  constructor(
    private authStateProvider: () => boolean,
    private localCartService: ICartService = new LocalCartService(),
    private apiCartService: ICartService = new CartApiService()
  ) {}
  getItems(): Promise<CartItem[]> {
    return this.authStateProvider()
      ? this.apiCartService.getItems()
      : this.localCartService.getItems();
  }

  addItem(item: CartItem): Promise<void> {
    return this.authStateProvider()
      ? this.apiCartService.addItem(item)
      : this.localCartService.addItem(item);
  }
  updateItem(item: CartItem, quantity: number): Promise<void> {
    return this.authStateProvider()
      ? this.apiCartService.updateItem(item, quantity)
      : this.localCartService.updateItem(item, quantity);
  }
  removeItem(item: CartItem): Promise<void> {
    return this.authStateProvider()
      ? this.apiCartService.removeItem(item)
      : this.localCartService.removeItem(item);
  }
}
