import React from "react";
import type { ReactNode } from "react";
import { createContext, useMemo } from "react";
import { CartService } from "~/services/cart/cart-service";
import { useAuth } from "./AuthProvider";
const CartContext = createContext();

export function CartProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  const cartService = useMemo(() => new CartService(() => auth.isLoggedIn), []);

  return <CartContext.Provider value={}>{children}</CartContext.Provider>;
}
