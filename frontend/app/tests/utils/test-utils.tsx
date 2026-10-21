import React from "react";
import { AuthProvider } from "~/providers/AuthProvider";
import { CartProvider } from "~/providers/CartProvider";

export const AllTheProviders = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};
