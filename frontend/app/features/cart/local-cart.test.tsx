import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CartProvider, AuthProvider } from "~/providers";
import CartRoute from "./cart-route";
import { MemoryRouter } from "react-router";

const CartRouteComponent = () => {
  return (
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <CartRoute />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};
test("CartList is empty", async () => {
  render(<CartRouteComponent />);

  const cartMessage = await screen.findByText("Your bag has no items");
  expect(cartMessage).toBeInTheDocument();
});
