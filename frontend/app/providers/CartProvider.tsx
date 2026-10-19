import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useContext
} from "react";
import type { ReactNode } from "react";
import { CartService } from "~/services/cart/cart-service";
import { useAuth } from "./AuthProvider";
import type { CartItem } from "~/services";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  updateItem: (item: CartItem, quantity: number) => Promise<void>;
  removeItem: (item: CartItem) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const cartService = useMemo(() => new CartService(() => auth.isLoggedIn), []);

  useEffect(() => {
    async function loadCart() {
      const items = await cartService.getItems();
      setItems(items);
    }
    loadCart();
  }, [isLoggedIn]);

  async function addItem(item: CartItem) {
    await cartService.addItem(item);
    const updated = await cartService.getItems();
    setItems(updated);
  }

  async function updateItem(item: CartItem, quantity: number) {
    await cartService.updateItem(item, quantity);
    const updated = await cartService.getItems();
    setItems(updated);
  }

  async function removeItem(item: CartItem) {
    await cartService.removeItem(item);
    const updated = await cartService.getItems();
    setItems(updated);
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Use cart must be used inside a cart provider");
  return context;
}
