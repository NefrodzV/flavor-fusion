export interface CartItem {
  id?: number; // comes from the database if user is logged in
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface LocalCartItem {
  menuItemId: number;
  quantity: number;
}
